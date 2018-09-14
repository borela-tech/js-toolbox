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
  getAttributeValue,
  minifiedHtmlString,
  prettifiedHtmlString,
  walk,
} from './parse5-util'

import debug from 'debug'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import validateOptions from 'schema-utils'
import {dirname, resolve} from 'path'
import {parse} from 'parse5'
import {PrefetchPlugin} from 'webpack'
import {readFileSync} from 'fs'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'HTML Plugin'

/**
 * Actual Webpack plugin that generates an HTML from a template, add the script
 * bundles and and loads any local assets referenced in the code.
 */
export default class SpaHtml {
  /**
   * Options passed to the plugin.
   */
  options = null

  /**
   * Parsed tree of the template.
   */
  tree = null

  constructor(options) {
    this.options = options
    validateOptions(OPTIONS_SCHEMA, this.options, PLUGIN_NAME)
  }

  /**
   * Webpack will call this method to allow the plugin to hook to the
   * compiler’s events.
   */
  apply(compiler) {
    let {hooks} = compiler
    hooks.afterCompile.tapAsync(PLUGIN_NAME, this.tapAfterCompile.bind(this))
    hooks.beforeRun.tapAsync(PLUGIN_NAME, this.tapBeforeRun.bind(this))
  }

  /**
   * Return the extracted the asset paths from the tree.
   */
  * extractAssetPaths() {
    log('Extracting asset paths...')

    const URL = /^(https?:)?\/\//
    const TEMPLATE_DIR = dirname(this.options.template)

    for (let node of walk(this.tree)) {
      let {tagName} = node
      if (!tagName)
        continue

      let assetPath
      switch (tagName) {
        case 'link':
          assetPath = getAttributeValue(node, 'href')
          break
        case 'img':
          assetPath = getAttributeValue(node, 'src')
          break
      }

      // Ignore empty paths and URLs.
      if (!assetPath || URL.test(assetPath))
        continue

      const RESULT = {
        context: TEMPLATE_DIR,
        path: assetPath,
      }

      log(`Asset found: ${prettyFormat(RESULT)}`)
      yield RESULT
    }

    log('Done extracting assets.')
  }

  /**
   * Returns the current tree as a beautified or minified HTML string.
   */
  getHtmlString() {
    let {minify} = this.options
    if (minify)
      return minifiedHtmlString(this.tree)
    return prettifiedHtmlString(this.tree)
  }

  async tapAfterCompile(compilation, done) {
    // TODO: Inject the JS bundles.

    // Add the template to the dependencies to trigger a rebuild on change in
    // watch mode.
    compilation.fileDependencies.add(this.options.template)

    // Emit the final HTML.
    const FINAL_HTML = this.getHtmlString()
    compilation.assets['index.html'] = {
      source: () => FINAL_HTML,
      size: () => FINAL_HTML.length,
    }

    done()
  }

  async tapBeforeRun(compiler, done) {
    log('Loading template...')
    const SOURCE = readFileSync(this.options.template, 'utf8')
    log('Parsing template...')
    this.tree = parse(SOURCE)
    log('Done loading and parsing template.')

    // Add assets to the compilation.
    for (let {context, path} of this.extractAssetPaths()) {
      new PrefetchPlugin(context, path)
        .apply(compiler)
    }

    done()
  }
}
