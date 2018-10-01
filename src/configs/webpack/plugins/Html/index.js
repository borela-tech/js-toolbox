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
  join,
  parse as parsePath,
} from 'path'

import debug from 'debug'
import CommonJsRequireDependency from 'webpack/lib/dependencies/CommonJsRequireDependency'
import NormalModule from 'webpack/lib/NormalModule'
import MultiModule from 'webpack/lib/MultiModule'
import OPTIONS_SCHEMA from './options-schema'
import prettyFormat from 'pretty-format'
import validateOptions from 'schema-utils'
import {parse as parseHtml} from 'parse5'
import {PrefetchPlugin} from 'webpack'
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
 * Get the module that is entry point of the main companion chunk.
 */
function findCompanionModule(chunks, template:LoadedTemplate) {
  let targetModule = findMainCompanionChunk(chunks, template)
    .entryModule

  if (targetModule instanceof NormalModule) {
    return targetModule
  }

  if (targetModule instanceof MultiModule) {
    const LAST = targetModule.dependencies.length - 1
    targetModule = targetModule.dependencies[LAST].module
    return targetModule
  }

  throw new Error(`Unexpected module type: “${typeof MODULE}”`)
}

/**
 * Get the main companion chunk.
 */
function findMainCompanionChunk(chunks, template:LoadedTemplate) {
  let {name} = template
  for (let chunk of chunks) {
    if (chunk.id === name)
      return chunk
  }
  return undefined
}

/**
 * Get the resulting module from the target template.
 */
function findTemplateModule(modules, template:LoadedTemplate) {
  let {fullPath} = template
  for (const MODULE of modules) {
    if (MODULE.resource === fullPath)
      return MODULE
  }
  throw new Error(`Template module not found: ${prettyFormat(fullPath)}.`)
}

/**
 * Get the chunk that has the same name as the template and the other chunks
 * it depends on.
 */
function * getCompanionChunks(chunks, template:LoadedTemplate) {
  let {fullPath, name} = template
  const MAIN_CHUNK = findMainCompanionChunk(chunks, template)

  if (!MAIN_CHUNK) {
    log(`Companion chunk NOT found for: ${prettyFormat(fullPath)}`)
    return
  } else {
    log(`Companion chunk found for: ${prettyFormat({
      chunk: MAIN_CHUNK.id,
      template: fullPath,
    })}`)
  }

  if (MAIN_CHUNK.getNumberOfGroups() > 1) {
    log(`Companion chunk is inside multiple groups: ${prettyFormat(fullPath)}`)
    return
  }

  // The companion chunk must be on its own group, with that in mind, we are
  // getting the first group from the groups set.
  const GROUP = MAIN_CHUNK.groupsIterable.values()
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

    // // During development we need to include the template in the entry point to
    // // enable hot reload, the downside is that the processed HTML gets included
    // // in the final bundle. To solve that we only do it when the dev server is
    // // run(but how?).
    // // TODO: Fix this.
    // if (false) {
    // } else
    //   this._includeAsEntry(compiler)

    // Emit the final HTML.
    compiler.hooks.emit.tapAsync(
      PLUGIN_NAME,
      this._tapEmit.bind(this),
    )
  }

  // _includeAsEntry(compiler) {
  //   const ENTRIES = compiler.options.entry
  //   const ENTRY = ENTRIES[name]

  //   if (ENTRY) {
  //     if (!Array.isArray(ENTRY))
  //       ENTRIES[name] = [ENTRY]
  //     ENTRIES[name].unshift(fullPath)
  //   }
  // }

  _mustCompile({
    contextDependencies,
    contextTimestamps,
    fileDependencies,
    fileTimestamps,
  }) {
    // The amount of file dependencies changed.
    if (this._previousFileTimestamps.length !== fileTimestamps.length)
      return true

    // The amount of context dependencies changed.
    if (this._previousContextTimestamps.length !== contextTimestamps.length)
      return true

    // Check each file dependency.
    for (let file of fileDependencies) {
      let oldTimestamp = this._previousFileTimestamps.get(file) || 0
      let newTimestamp = fileTimestamps.get(file) || 1

      if (newTimestamp > oldTimestamp)
        return true
    }

    // Check each context dependency.
    for (let context of contextDependencies) {
      let oldTimestamp = this._previousContextTimestamps.get(context) || 0
      let newTimestamp = contextTimestamps.get(context) || 1

      if (newTimestamp > oldTimestamp)
        return true
    }

    return false
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

    // console.log(COMPANION_MODULE)
    // process.exit()
    COMPANION_MODULE.dependencies.push(new CommonJsRequireDependency(
      this._template.fullPath,
    ))
    // console.log(prettyFormat(COMPANION_MODULE))

    done()
  }
}
