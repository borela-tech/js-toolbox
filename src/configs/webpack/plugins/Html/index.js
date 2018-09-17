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
  createNode,
  getNodeByTagName,
  getResourceRequest,
  minifiedHtmlString,
  prettifiedHtmlString,
  setResourceRequest,
  walk,
} from './parse5-util'

import {
  dirname,
  parse as parsePath,
} from 'path'

import debug from 'debug'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import validateOptions from 'schema-utils'
import {parse} from 'parse5'
import {PrefetchPlugin} from 'webpack'
import {readFileSync} from 'fs'
import {Script} from 'vm'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

/**
 * Each linked asset processed by the “url-loader” will generate a module that
 * returns a path or a data URL, we will use this helper to execute that code
 * and get the final value back.
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
 * Actual Webpack plugin that generates an HTML from a template, add the script
 * bundles and loads any local linked assets referenced.
 */
export default class SpaHtml {
  /**
   * We use a child compiler to process the linked assets requested by the
   * template, this makes it easier to filter the “compilation.modules” as it
   * will only contain the modules we requested.
   */
  _childCompiler = null

  /**
   * Options passed to the plugin.
   */
  _options = null

  /**
   * Parse5 tree of the template.
   */
  _tree = null

  constructor(options) {
    this._options = options
    validateOptions(OPTIONS_SCHEMA, this._options, PLUGIN_NAME)
  }

  /**
   * Webpack will call this method to allow the plugin to hook to the
   * compiler’s events.
   */
  apply(compiler) {
    log('Setting target compiler hooks.')

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
   * Return the extracted linked asset paths from the tree.
   */
  * _extractAssetPaths() {
    const URL = /^((https?:)?\/\/|data:)/

    for (let node of walk(this._tree)) {
      let assetPath = getResourceRequest(node)

      // Ignore empty paths, URLs and data URLs.
      if (!assetPath || URL.test(assetPath))
        continue

      yield {path: assetPath, node}
    }
  }

  /**
   * Returns the current tree as a beautified or minified HTML string.
   */
  _getHtmlString() {
    let {minify} = this._options
    if (minify)
      return minifiedHtmlString(this._tree)
    return prettifiedHtmlString(this._tree)
  }

  /**
   * Emit the final HTML file.
   */
  async _tapEmit(compilation, done) {
    let body = getNodeByTagName(this._tree, 'body')
    body.childNodes ??= []

    log('Finding associated chunk.')

    let associatedChunk = null
    let {name: templateName} = parsePath(this._options.template)

    for (let chunk of compilation.chunks) {
      if (chunk.id == templateName) {
        associatedChunk = chunk
        break
      }
    }

    if (associatedChunk) {
      log('Injecting chunks to the template.')

      for (let group of associatedChunk._groups) {
        for (let chunk of group.chunks) {
          body.childNodes.push(createNode({
            tagName: 'script',
            attrs: [{
              name: 'src',
              value: `${chunk.id}.js?${chunk.hash}`,
            }],
          }))
        }
      }
    } else
      log('No associated chunk found.')

    log('Adding template to dependencies.')

    compilation.fileDependencies.add(this._options.template)

    log('Emitting final HTML.')

    const FINAL_HTML = this._getHtmlString()
    compilation.assets['index.html'] = {
      source: () => FINAL_HTML,
      size: () => FINAL_HTML.length,
    }

    done()
  }

  /**
   * The linked assets were processed in the child compiler, this method will
   * update their paths in the template.
   */
  async _tapChildAfterCompile(compilation, done) {
    if (compilation.modules < 1) {
      log('No local linked assets found in the template.')
      done()
      return
    }

    log('Indexing loaded assets by raw request.')

    let byRawRequest = new Map
    for (let asset of compilation.modules)
      byRawRequest.set(asset.rawRequest, asset)

    log('Updating asset paths in template.')

    for (let {node, path} of this._extractAssetPaths()) {
      if (!byRawRequest.has(path))
        continue

      const ASSET = byRawRequest.get(path)
      const SOURCE = ASSET.originalSource().source()
      const NEW_REQUEST = execAssetModule(SOURCE)
      setResourceRequest(node, NEW_REQUEST)

      log(`Changed: ${prettyFormat({from: path, to: NEW_REQUEST})}`)
    }

    done()
  }

  /**
   * Set up the template and the child compiler to process the assets.
   */
  async _tapMake(compilation, done) {
    log('Loading template.')

    const SOURCE = readFileSync(this._options.template, 'utf8')

    log('Parsing template.')

    this._tree = parse(SOURCE)

    log('Template is ready.')
    log('Preparing the child compiler.')

    this._childCompiler = compilation.createChildCompiler(PLUGIN_NAME)

    log('Adding asssets to child compiler.')

    const TEMPLATE_DIR = dirname(this._options.template)
    for (let {path} of this._extractAssetPaths()) {
      new PrefetchPlugin(TEMPLATE_DIR, path)
        .apply(this._childCompiler)

      log(`Linked asset added: ${path}`)
    }

    log('Setting child compiler hooks.')

    this._childCompiler.hooks.afterCompile.tapAsync(
      PLUGIN_NAME,
      this._tapChildAfterCompile.bind(this),
    )

    log('Running child compiler.')

    this._childCompiler.runAsChild(done)
  }
}
