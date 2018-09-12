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

import debug from 'debug'
import validateOptions from 'schema-utils'
import {dirname, resolve} from 'path'
import {existsSync, readFileSync} from 'fs'
import {getSettings} from '../../../settings'
import {html as beautifyHtml} from 'js-beautify'
import {minify as minifyHtml} from 'html-minifier'
import {parse, serialize} from 'parse5'
import {PrefetchPlugin} from 'webpack'

let log = debug('bb:config:webpack:plugin:html')

let {minify = false} = getSettings()
const PLUGIN_NAME = 'SPA HTML Plugin'

/**
 * This schema is used to validate the plugin’s options, right now, all it does
 * is requiring the template property.
 */
const OPTIONS_SCHEMA = {
  additionalProperties: false,
  type: 'object',
  properties: {
    template: {
      type: 'string',
    },
  },
  required: ['template'],
}

/**
 * Extract an attribute’s value from the node; Returns undefined if the
 * attribute is not found.
 */
function getAttributeValue(node, attributeName) {
  for (let attribute of node.attrs)
    if (attribute.name === attributeName)
      return attribute.value
  return undefined
}

/**
 * Recursively walks the parsed tree. It should work in 99.9% of the cases but
 * it needs to be replaced with a non recursive version.
 */
function* walk(node) {
  yield node

  if (!node.childNodes)
    return

  for (let child of node.childNodes)
    yield* walk(child)
}


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
    compiler.hooks.beforeRun.tapAsync(PLUGIN_NAME, this.tapBeforeRun.bind(this))
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.tapEmit.bind(this))

    // Load the template and the assets.
    const SOURCE = readFileSync(this.options.template, 'utf8')
    this.tree = parse(SOURCE)
  }

  /**
   * Include referenced assets in the bundle.
   */
  fetchAssets(compiler) {
    const URL = /^(https?:)?\/\//

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

      const TEMPLATE_DIR = dirname(this.options.template)
      new PrefetchPlugin(TEMPLATE_DIR, assetPath)
        .apply(compiler)
    }
  }

  /**
   * Returns the current DOM’s HTML as a beautified or minified string.
   */
  getDomHtml() {
    // Modified HTML.
    let serialized = serialize(this.tree)

    // We pass the serialized HTML from JSDOM through the minifier to remove any
    // unnecessary whitespace that could affect the beautifier. When we are
    // actually trying to minify, comments will be removed too. Options can be
    // found in:
    //
    //     https://github.com/kangax/html-minifier
    //
    const MINIFIER_OPTIONS = {
      caseSensitive: false,
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      conservativeCollapse: false,
      decodeEntities: true,
      html5: true,
      includeAutoGeneratedTags: false,
      keepClosingSlash: false,
      preserveLineBreaks: false,
      preventAttributesEscaping: true,
      processConditionalComments: false,
      quoteCharacter: '"',
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeEmptyElements: false,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true,
    }

    if (minify) {
      // Minify.
      serialized = minifyHtml(serialized, {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        ...MINIFIER_OPTIONS,
      })
    } else {
      // Beautify.
      serialized = minifyHtml(serialized, MINIFIER_OPTIONS)
      serialized = beautifyHtml(serialized, {
        indent_char: ' ',
        indent_inner_html: true,
        indent_size: 2,
        sep: '\n',
        unformatted: ['code', 'pre', 'em', 'strong', 'span'],
      })
    }

    return serialized
  }

  async tapBeforeRun(compiler, done) {
    this.fetchAssets(compiler)
    done()
  }

  async tapEmit(compilation, done) {
    // TODO: Inject the JS bundles.

    // Add the template to the dependencies to trigger a rebuild on change in
    // watch mode.
    compilation.fileDependencies.add(this.options.template)

    // Emit the final HTML.
    let source = this.getDomHtml()
    compilation.assets['index.html'] = {
      source: () => source,
      size: () => source.length,
    }

    done()
  }
}
