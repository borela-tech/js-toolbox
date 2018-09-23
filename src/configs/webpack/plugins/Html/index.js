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
 * Execute the code and returns the exported result.
 */
function execModule(code) {
  let script = new Script(code)
  let exports = {}
  let sandbox = {
    module: {exports},
    exports,
  }
  script.runInNewContext(sandbox)
  return sandbox.module.exports
}

/**
 * Get the resulting module from the target template.
 */
function findProcessedTemplate(compilation, templatePath) {
  log(`Finding processed template: “${templatePath}”.`)

  for (const MODULE of compilation.modules) {
    if (MODULE.resource === templatePath) {
      log(`Template found: “${templatePath}”.`)
      return MODULE
    }
  }

  new Error(`Result from template not found: “${templatePath}”.`)
}

/**
 * Get the chunk that has the same name as the template and the other chunks
 * it depends on.
 */
function * getCompanionChunks(chunks, templateName) {
  let mainChunk
  for (let chunk of chunks) {
    if (chunk.id === templateName) {
      mainChunk = chunk
      break
    }
  }

  if (!mainChunk) {
    log(`Companion chunk NOT found for “${templateName}”.`)
    return
  } else
    log(`Companion chunk found for “${templateName}”.`)

  if (mainChunk.getNumberOfGroups() > 1) {
    log(`Companion chunk for “${templateName}” is inside multiple groups.`)
    return
  }

  // The companion chunk must be on its own group, with that in mind, we are
  // getting the first group from the groups set.
  const GROUP = mainChunk.groupsIterable.values()
    .next()
    .value

  // Yield chunks inside the group.
  yield * GROUP.chunks
}

/**
 * Actual Webpack plugin that generates an HTML from a template, loads requests
 * inside it and add the script bundles.
 */
export default class HtmlPlugin {
  /**
   * Stuff that needs to be added to the “head” tag.
   */
  _head = {
    // An array containing the path to the scripts that needs to be added.
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
    // File name with the extension.
    base: null,
    // Path to the directory that contains the template.
    directory: null,
    // Full path to the template.
    fullPath: null,
    // File name without extension.
    name: null,
  }

  constructor(options) {
    validateOptions(OPTIONS_SCHEMA, options, PLUGIN_NAME)

    let {base, dir} = parsePath(options.templatePath)
    // Remove the “.bb.something” extension.
    const EXT = /\.bb\.\w+$/
    let name = base.replace(EXT, '')

    this._head.appendScripts = options?.head?.appendScripts || []
    this._minify = options.minify
    this._template = {
      ...this._template,
      directory: dir,
      fullPath: options.templatePath,
      base,
      name,
    }
  }

  /**
   * Webpack will call this method to allow the plugin to hook to the
   * compiler’s events.
   */
  apply(compiler) {
    // Pass the template through a loader.
    let {directory, base} = this._template
    new PrefetchPlugin(directory, base)
      .apply(compiler)

    // Emit the final HTML.
    compiler.hooks.emit.tapAsync(
      PLUGIN_NAME,
      this._tapEmit.bind(this),
    )
  }

  /**
   * Emit the final HTML file.
   */
  async _tapEmit(compilation, done) {
    const TEMPLATE_MODULE = findProcessedTemplate(
      compilation,
      this._template.fullPath,
    )

    const TEMPLATE_SOURCE = execModule(
      TEMPLATE_MODULE
        .originalSource()
        .source()
    )

    log('Parsing template result.')

    let tree = parseHtml(TEMPLATE_SOURCE)

    log('Template is ready.')

    const HEAD = getNodeByTagName(tree, 'head')
    const BODY = getNodeByTagName(tree, 'body')

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
    const CHUNKS = getCompanionChunks(
      compilation.chunks,
      this._template.name,
    )

    for (let chunk of CHUNKS) {
      appendChild(BODY, createNode({
        tagName: 'script',
        attrs: [{
          name: 'src',
          value: `${chunk.id}.js?${chunk.hash}`,
        }],
      }))
    }

    // Emit the final HTML.
    const NAME = `${this._template.name}.html`
    const FINAL_HTML = this._minify
      ? minifiedHtmlString(tree)
      : prettifiedHtmlString(tree)

    compilation.assets[NAME] = {
      source: () => FINAL_HTML,
      size: () => FINAL_HTML.length,
    }

    done()
  }
}
