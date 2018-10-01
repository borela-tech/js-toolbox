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

import type LoadedTemplate from './LoadedTemplate'

import {
  appendChild,
  createNode,
  getNodeByTagName,
  minifiedHtmlString,
  prettifiedHtmlString,
} from './parse5-utils'

import {
  execModule,
  findCompanionModule,
  findTemplateModule,
  getCompanionChunks,
} from './utils'

import debug from 'debug'
import CommonJsRequireDependency from 'webpack/lib/dependencies/CommonJsRequireDependency'
import OPTIONS_SCHEMA from './options-schema'
import validateOptions from 'schema-utils'
import prettyFormat from 'pretty-format'
import {parse as parseHtml} from 'parse5'
import {parse as parsePath} from 'path'
import {PrefetchPlugin} from 'webpack'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

/**
 * Actual Webpack plugin that generates an HTML from a template, loads requests
 * inside it and add the script bundles to the head and body.
 */
export default class HtmlPlugin {
  /**
   * Save dependencies’ timestamps after each build. In this case, dependencies
   * means files directly referred in the template itself. Externals and head
   * scripts added by the plugin are NOT take into consideration.
   */
  _previousContextTimestamps = new Map
  _previousFileTimestamps = new Map

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
   * Date that faciliates locating the template.
   */
  _template:LoadedTemplate = {
    base: null,
    directory: null,
    fullPath: null,
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
    let {base, directory} = this._template

    // Load the template through the loaders, unless a JS file require it, the
    // result won’t be included in any bundle.
    new PrefetchPlugin(directory, base)
      .apply(compiler)

    // Emit the final HTML.
    compiler.hooks.emit.tapAsync(
      PLUGIN_NAME,
      this._tapEmit.bind(this),
    )
  }

  _contextChanged(contextDependencies, contextTimestamps) {
    // The amount of context dependencies changed.
    if (this._previousContextTimestamps.length !== contextTimestamps.length)
      return true

    // Check each context dependency.
    for (let context of contextDependencies) {
      let oldTimestamp = this._previousContextTimestamps.get(context) || 0
      let newTimestamp = contextTimestamps.get(context) || 1

      if (newTimestamp > oldTimestamp)
        return true
    }

    return false
  }

  _filesChanged(fileDependencies, fileTimestamps) {
    // The amount of file dependencies changed.
    if (this._previousFileTimestamps.length !== fileTimestamps.length)
      return true

    // Check each file dependency.
    for (let file of fileDependencies) {
      let oldTimestamp = this._previousFileTimestamps.get(file) || 0
      let newTimestamp = fileTimestamps.get(file) || 1

      if (newTimestamp > oldTimestamp)
        return true
    }

    return false
  }

  _mustCompile({
    contextDependencies,
    contextTimestamps,
    fileDependencies,
    fileTimestamps,
  }) {
    return this._filesChanged(fileDependencies, fileTimestamps)
      || this._contextChanged(contextDependencies, contextTimestamps)
  }

  /**
   * Emit the final HTML file.
   */
  async _tapEmit(compilation, done) {
    const TEMPLATE_PATH = this._template.fullPath
    const TEMPLATE_MODULE = findTemplateModule(
      compilation.modules,
      this._template,
    )

    let {
      contextDependencies,
      fileDependencies,
    } = TEMPLATE_MODULE.buildInfo

    let {
      contextTimestamps,
      fileTimestamps,
    } = compilation

    // Check if the file and context dependencies changed.
    const MUST_COMPILE = this._mustCompile({
      contextDependencies,
      contextTimestamps,
      fileDependencies,
      fileTimestamps,
    })

    // Save the current timestamps for the next compilation.
    this._previousContextTimestamps = contextTimestamps
    this._previousFileTimestamps = fileTimestamps

    if (!MUST_COMPILE) {
      log(`Skipping compilation for: ${prettyFormat(TEMPLATE_PATH)}`)
      done()
      return
    }

    log(`Compiling: ${prettyFormat(TEMPLATE_PATH)}`)

    const TEMPLATE_SOURCE = execModule(
      TEMPLATE_MODULE
        .originalSource()
        .source()
    )

    log(`Parsing template: ${prettyFormat(TEMPLATE_PATH)}`)

    let tree = parseHtml(TEMPLATE_SOURCE)

    log(`Template parsed: ${prettyFormat(TEMPLATE_PATH)}`)

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

      log(`Script appended to the “head”: ${prettyFormat({
        template: TEMPLATE_PATH,
        script,
      })}`)
    }

    // Add the chunk scripts to the end of the body.
    const CHUNKS = getCompanionChunks(
      compilation.chunks,
      this._template,
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

    // Associate the template to a module that has the same name to trigger the
    // hot reload when the template is changed too.
    const COMPANION_MODULE = findCompanionModule(
      compilation.chunks,
      this._template,
    )

    COMPANION_MODULE.dependencies.push(new CommonJsRequireDependency(
      this._template.fullPath,
    ))

    done()
  }
}
