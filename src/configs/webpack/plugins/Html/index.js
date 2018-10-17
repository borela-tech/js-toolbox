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
  createTextNode,
  getNodeByTagName,
  minifiedHtmlString,
  prettifiedHtmlString,
} from './parse5-utils'

import {
  dependenciesChanged,
  execModule,
  findTemplateModule,
  generateHotListener,
  getCompanionChunks,
} from './utils'

import debug from 'debug'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import socket from '../../../messaging-socket'
import validateOptions from 'schema-utils'
import {parse as parseHtml} from 'parse5'
import {parse as parsePath} from 'path'
import {PrefetchPlugin} from 'webpack'
import {RawSource} from 'webpack-sources'

let log = debug('bb:config:webpack:plugin:html')

const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

/**
 * Actual Webpack plugin that generates an HTML from a template, loads requests
 * inside it and add the script bundles to the head and body.
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
   * If true, a script will be included in the final template to reload the
   * page on changes.
   */
  _hot = false

  /**
   * Minify the final HTML.
   */
  _minify = false

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

    let {base, dir} = parsePath(options.templatePath)
    // Remove the “.bb.something” extension.
    const EXT = /\.bb\.\w+$/
    let name = base.replace(EXT, '')

    this._head.appendScripts = options?.head?.appendScripts || []
    this._hot = options.hot || true
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

    if (this._hot) {
      log(`Injecting hot listener: ${prettyFormat(TEMPLATE_PATH)}`)

      appendChild(BODY, createTagNode({
        tagName: 'script',
        attrs: [{
          name: 'src',
          value: '//localhost:8196/socket.io/socket.io.js',
        }],
      }))

      appendChild(BODY, createTagNode({
        tagName: 'script',
        childNodes: [createTextNode(generateHotListener(this._template))],
      }))
    }

    log(`Emitting final HTML: ${prettyFormat(TEMPLATE_PATH)}`)

    let {name} = this._template
    compilation.assets[`${name}.html`] = new RawSource(
      this._minify
        ? minifiedHtmlString(tree)
        : prettifiedHtmlString(tree)
    )

    socket.emit('Template Emitted', this._template.fullPath)

    this._firstBuild = false
    this._previousContextTimestamps = contextTimestamps
    this._previousFileTimestamps = fileTimestamps

    done()
  }
}
