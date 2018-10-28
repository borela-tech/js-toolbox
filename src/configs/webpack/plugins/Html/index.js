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

import type Template from './Template'

import {
  appendChild,
  createTagNode,
  getNodeByTagName,
  minifiedHtmlString,
  prettifiedHtmlString,
} from './parse5-utils'

import {
  dependenciesChanged,
  execModule,
  findTemplateModule,
  getCompanionChunks,
} from './utils'

import {
  join,
  parse as parsePath,
  relative,
} from 'path'

import {
  mkdirSync,
  writeFileSync,
} from 'fs'

import debug from 'debug'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import validateOptions from 'schema-utils'
import {getProjectDir} from '../../../../paths'
import {parse as parseHtml} from 'parse5'
import {PrefetchPlugin} from 'webpack'
import {RawSource} from 'webpack-sources'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

/**
 * Actual Webpack plugin that generates an HTML from a template, loads requests
 * inside it and add the script bundles to the head and body.
 */
export default class HtmlPlugin {
  _alwaysWriteToDisk = false
  _minify = false

  /**
   * Stuff that needs to be added to the “head” tag.
   */
  _head = {
    // An array containing the path to the scripts that needs to be added.
    appendScripts: [],
  }

  /**
   * Save dependencies’ timestamps after each build. In this case, dependencies
   * means files directly referred in the template itself. Externals and head
   * scripts added by the plugin are NOT take into consideration.
   */
  _previousContextTimestamps = new Map
  _previousFileTimestamps = new Map

  /**
   * Date that faciliates locating the template.
   */
  _template:Template = {
    base: null,
    directory: null,
    fullPath: null,
    name: null,
  }

  constructor(options) {
    validateOptions(OPTIONS_SCHEMA, options, PLUGIN_NAME)

    let {base, dir, name} = parsePath(options.templatePath)
    let {
      alwaysWriteToDisk,
      head: {appendScripts = []},
      hot,
      minify,
      templatePath,
    } = options

    this._alwaysWriteToDisk = alwaysWriteToDisk || true
    this._head.appendScripts = appendScripts
    this._hot = hot
    this._minify = minify
    this._template = {
      ...this._template,
      directory: dir,
      fullPath: templatePath,
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
      contextTimestamps: newContextTimestamps,
      fileTimestamps: newFileTimestamps,
    } = compilation

    const FILES_CHANGED = dependenciesChanged(
      fileDependencies,
      newFileTimestamps,
      this._previousFileTimestamps,
    )

    const CONTEXT_CHANGED = dependenciesChanged(
      contextDependencies,
      newContextTimestamps,
      this._previousContextTimestamps,
    )

    if (!FILES_CHANGED && !CONTEXT_CHANGED) {
      log(`Skipping compilation for: ${prettyFormat(TEMPLATE_PATH)}`)
      done()
      return
    }

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
      appendChild(HEAD, createTagNode({
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

    const CHUNKS = getCompanionChunks(
      compilation.chunks,
      this._template,
    )

    // Add companion chunks to the end of the body.
    for (let chunk of CHUNKS) {
      appendChild(BODY, createTagNode({
        tagName: 'script',
        attrs: [{
          name: 'src',
          value: `${chunk.id}.js?${chunk.hash}`,
        }],
      }))
    }

    log(`Emitting final HTML: ${prettyFormat(TEMPLATE_PATH)}`)

    let {name} = this._template
    const SOURCE = this._minify
      ? minifiedHtmlString(tree)
      : prettifiedHtmlString(tree)

    compilation.assets[`${name}.html`] = new RawSource(SOURCE)

    if (this._alwaysWriteToDisk) {
      log(`Writting HTML to disk: ${prettyFormat(TEMPLATE_PATH)}`)

      const PROJECT_DIR = join(getProjectDir(), 'src')
      const PROJECT_OUTPUT_DIR = compilation.options.output.path

      const TEMPLATE_RELATIVE_PATH = relative(PROJECT_DIR, TEMPLATE_PATH)
      const TEMPLATE_RELATIVE_DIR = join(TEMPLATE_RELATIVE_PATH, '..')

      const HTML_OUTPUT_DIR = join(PROJECT_OUTPUT_DIR, TEMPLATE_RELATIVE_DIR)
      const HTML_OUTPUT_PATH = join(PROJECT_OUTPUT_DIR, TEMPLATE_RELATIVE_PATH)

      mkdirSync(HTML_OUTPUT_DIR, {recursive: true})
      writeFileSync(HTML_OUTPUT_PATH, SOURCE)
    }

    this._previousContextTimestamps = newContextTimestamps
    this._previousFileTimestamps = newFileTimestamps

    log(`Done processing template: ${prettyFormat(TEMPLATE_PATH)}`)
    done()
  }
}
