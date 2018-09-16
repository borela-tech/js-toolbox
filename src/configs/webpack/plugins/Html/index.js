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

import debug from 'debug'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import validateOptions from 'schema-utils'
import {dirname} from 'path'
import {parse} from 'parse5'
import {PrefetchPlugin} from 'webpack'
import {readFileSync} from 'fs'
import {Script} from 'vm'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

/**
 * Execute the asset’s generated source and return the result.
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
 * bundles and and loads any local assets referenced in the code.
 */
export default class SpaHtml {
  /**
   * We use a child compiler to process the assets requested by the template.
   */
  _childCompiler = null

  /**
   * Options passed to the plugin.
   */
  _options = null

  /**
   * Parsed tree of the template.
   */
  _tree = null

  constructor(options) {
    this._options = options
    validateOptions(OPTIONS_SCHEMA, this._options, PLUGIN_NAME)

    log('Loading template.')
    const SOURCE = readFileSync(this._options.template, 'utf8')
    log('Parsing template.')
    this._tree = parse(SOURCE)
    log('Template ready.')
  }

  /**
   * Webpack will call this method to allow the plugin to hook to the
   * compiler’s events.
   */
  apply(compiler) {
    log('Setting main compiler hooks.')

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
   * Return the extracted the asset paths from the tree.
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

  async _tapEmit(compilation, done) {
    let body = getNodeByTagName(this._tree, 'body')
    body.childNodes ??= []

    log('Injecting chunks to template.')

    for (let chunk of compilation.chunks.reverse()) {
      body.childNodes.push(createNode({
        tagName: 'script',
        attrs: [{
          name: 'src',
          value: `${chunk.id}.js`,
        }],
      }))
    }

    log('Adding template to dependencies.')

    // Add the template to the dependencies to trigger a rebuild on change in
    // watch mode.
    compilation.fileDependencies.add(this._options.template)

    log('Emitting final HTML.')

    // Emit the final HTML.
    const FINAL_HTML = this._getHtmlString()
    compilation.assets['index.html'] = {
      source: () => FINAL_HTML,
      size: () => FINAL_HTML.length,
    }

    done()
  }

  /**
   * The assets were processed in the child compiler, this method will update
   * the asset paths in the template with the result.
   */
  async _tapChildAfterCompile(compilation, done) {
    if (compilation.modules < 1) {
      log('No assets requested in the template.')
      return
    }

    log('Indexing loaded assets by raw request.')

    // Index assets by raw request.
    let byRawRequest = new Map
    for (let asset of compilation.modules)
      byRawRequest.set(asset.rawRequest, asset)

    log('Updating asset paths in template.')

    // Update asset paths.
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
   * Set up the child compiler to process the assets.
   */
  async _tapMake(compilation, done) {
    log('Preparing the child compiler.')

    this._childCompiler = compilation.createChildCompiler(PLUGIN_NAME)

    // Add the assets requested in the template to the child compiler.
    log('Adding asssets to child compiler.')

    const TEMPLATE_DIR = dirname(this._options.template)

    for (let {path} of this._extractAssetPaths()) {
      new PrefetchPlugin(TEMPLATE_DIR, path)
        .apply(this._childCompiler)

      log(`Asset added: ${path}`)
    }

    log('Setting child compiler hooks.')

    // This hook will be used to update the asset paths in the template with
    // the result from the child compilation.
    this._childCompiler.hooks.afterCompile.tapAsync(
      PLUGIN_NAME,
      this._tapChildAfterCompile.bind(this),
    )

    log('Running child compiler.')

    // Finnally, run the child compiler to process the assets.
    this._childCompiler.runAsChild(done)
  }
}
