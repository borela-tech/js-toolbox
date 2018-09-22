// Licensed under the Apache License, Version 2.0 (the “License”); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import {
  appendChild,
  createNode,
  getNodeByTagName,
  getResourceRequest,
  minifiedHtmlString,
  prettifiedHtmlString,
  setResourceRequest,
  walk,
} from './parse5-utils'

import debug from 'debug'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import validateOptions from 'schema-utils'
import {parse as parsePath} from 'path'
import {parse as parseHtml} from 'parse5'
import {PrefetchPlugin} from 'webpack'
import {readFileSync} from 'fs'
import {Script} from 'vm'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

/**
 * Each asset processed by the “url-loader” will generate a module that returns
 * a path or a data URL, we will use this helper to execute that code and get
 * the final value back.
 */
function execAssetModule(code, path) {
  let script = new Script(code)
  let exports = {}
  let sandbox = {
    __webpack_public_path__: '',
    module: {exports},
    exports,
  }
  script.runInNewContext(sandbox)
  return sandbox.module.exports
}

/**
 * Actual Webpack plugin that generates an HTML from a template, loads requests
 * inside it and add the script bundles.
 */
export default class HtmlPlugin {
  /**
   * We use a child compiler to process the assets requested by the template,
   * this makes it easier to filter the “compilation.modules” as it will only
   * contain the modules we requested.
   */
  _childCompiler = null

  /**
   * Stuff that needs to be added to the “head” tag.
   */
  _head = {
    appendScripts: [],
  }

  /**
   * Minify the final HTML.
   */
  _minify = false

  /**
   * Template location and path.
   */
  _template = {
    // Path to the directory that contains the template.
    directory: null,
    // Full path to the template.
    fullPath: null,
    // File name.
    name: null,
    // Parse5 tree of the template.
    tree: null,
  }

  constructor(options) {
    validateOptions(OPTIONS_SCHEMA, options, PLUGIN_NAME)

    let {base, dir} = parsePath(options.templatePath)

    this._head.appendScripts = options?.head?.appendScripts || []
    this._minify = options.minify
    this._template = {
      ...this._template,
      directory: dir,
      fullPath: options.templatePath,
      name: base,
    }
  }

  /**
   * Webpack will call this method to allow the plugin to hook to the
   * compiler’s events.
   */
  apply(compiler) {
    compiler.hooks.make.tapAsync(
      PLUGIN_NAME,
      this._tapMake.bind(this),
    )

    compiler.hooks.emit.tapAsync(
      PLUGIN_NAME,
      this._tapEmit.bind(this),
    )
  }

  /**
   * Returns the requests and node that generated it.
   */
  * _getAssetRequests() {
    const URL = /^((\w*:)?\/\/|data:)/

    for (let node of walk(this._template.tree)) {
      let request = getResourceRequest(node)

      // Ignore empty requests, URLs and data URLs.
      if (!request || URL.test(request))
        continue

      yield {request, node}
    }
  }

  /**
   * Get the chunk that has the same name as the template and the other chunks
   * it depends on.
   */
  * _getCompanionChunks(chunks) {
    const NAME = this._template.name

    for (let chunk of chunks) {
      if (chunk.id === NAME) {
        if (chunk.getNumberOfGroups() > 1) {
          log(`Companion chunk for “${NAME}” is inside multiple groups.`)
          return
        }

        log(`Companion chunk found for “${NAME}”.`)

        // The companion chunk must be on its own group, we that in mind, we are
        // getting just 1 group from the groups set.
        const GROUP = chunk.groupsIterable.values()
          .next()
          .value

        // Yield chunks inside the group.
        yield * GROUP.chunks
        return
      }
    }

    log(`Companion chunk NOT found for “${NAME}”.`)
  }

  /**
   * Returns the current tree as a beautified or minified HTML string.
   */
  _getHtmlString() {
    if (this._minify)
      return minifiedHtmlString(this._template.tree)
    return prettifiedHtmlString(this._template.tree)
  }

  /**
   * Emit the final HTML file.
   */
  async _tapEmit(compilation, done) {
    const HEAD = getNodeByTagName(this._template.tree, 'head')
    const BODY = getNodeByTagName(this._template.tree, 'body')

    // Add external scripts from CDN.
    for (let script of this._head.appendScripts) {
      appendChild(HEAD, createNode({
        tagName: 'script',
        attrs: [{
          name: 'crossorigin',
          value: 'anonymous',
        }, {
          name: 'src',
          value: script,
        }],
      }))

      log(`Script appended to the “head”: ${script}`)
    }

    // Add the chunk scripts to the end of the body.
    for (let chunk of this._getCompanionChunks(compilation.chunks)) {
      appendChild(BODY, createNode({
        tagName: 'script',
        attrs: [{
          name: 'src',
          value: `${chunk.id}.js?${chunk.hash}`,
        }],
      }))
    }

    const FINAL_HTML = this._getHtmlString()
    compilation.assets[this._template.name] = {
      source: () => FINAL_HTML,
      size: () => FINAL_HTML.length,
    }

    compilation.fileDependencies.add(this._template.fullPath)
    done()
  }

  /**
   * The requested assets were processed in the child compiler, this method
   * will replace the request with the asset path/data URL in the template.
   */
  async _tapChildAfterCompile(compilation, done) {
    // No modules generated so we will leave the template requests untouched.
    if (compilation.modules < 1) {
      done()
      return
    }

    // Index the modules generated in the child compiler by raw request.
    let byRawRequest = new Map
    for (let asset of compilation.modules)
      byRawRequest.set(asset.rawRequest, asset)

    // Replace the template requests with the result from modules generated in
    // the child compiler.
    for (let {node, request} of this._getAssetRequests()) {
      if (!byRawRequest.has(request))
        continue

      const ASSET = byRawRequest.get(request)
      const SOURCE = ASSET.originalSource().source()
      const NEW_REQUEST = execAssetModule(SOURCE)
      setResourceRequest(node, NEW_REQUEST)

      log(`Changed: ${prettyFormat({from: request, to: NEW_REQUEST})}`)
    }

    done()
  }

  /**
   * Set up the template and the child compiler to process the assets.
   */
  async _tapMake(compilation, done) {
    this._childCompiler = compilation.createChildCompiler(PLUGIN_NAME)
    this._childCompiler.hooks.afterCompile.tapAsync(
      PLUGIN_NAME,
      this._tapChildAfterCompile.bind(this),
    )

    log('Loading template.')
    const SOURCE = readFileSync(this._template.fullPath, 'utf8')
    log('Parsing template.')
    this._template.tree = parseHtml(SOURCE)
    log('Template is ready.')

    // The template was parsed and now we can walk through the tree and extract
    // requests from “img” and “link” tags.
    for (let {request} of this._getAssetRequests()) {
      // We set the context to be the template’s directory to allow relative
      // paths to work in a intuitive manner.
      new PrefetchPlugin(this._template.directory, request)
        .apply(this._childCompiler)

      log(`Request added: ${request}`)
    }

    this._childCompiler.runAsChild(done)
  }
}
