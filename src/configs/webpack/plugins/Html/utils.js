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

import debug from 'debug'
import MultiModule from 'webpack/lib/MultiModule'
import NormalModule from 'webpack/lib/NormalModule'
import prettyFormat from 'pretty-format'
import {Script} from 'vm'

let log = debug('bb:config:webpack:plugin:html')

/**
 * Checks if the dependencies changed.
 */
export function dependenciesChanged(
  dependencies,
  newTimestamps,
  oldTimestamps,
) {
  // The amount of dependencies changed.
  if (oldTimestamps.length !== newTimestamps.length)
    return true

  // Check each dependency.
  for (let dependency of dependencies) {
    let oldTimestamp = oldTimestamps.get(dependency) || 0
    let newTimestamp = newTimestamps.get(dependency) || 1

    if (newTimestamp > oldTimestamp)
      return true
  }

  return false
}

/**
 * Execute the code and returns the exported result.
 */
export function execModule(code) {
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
 * Get the module that is entry point of the chunk.
 */
export function findEntryModule(chunk) {
  let targetModule = chunk.entryModule

  if (targetModule instanceof NormalModule)
    return targetModule

  if (targetModule instanceof MultiModule) {
    const LAST = targetModule.dependencies.length - 1
    targetModule = targetModule.dependencies[LAST].module
    return targetModule
  }

  throw new Error(`Unexpected module type: “${typeof targetModule}”`)
}

/**
 * Get the chunk that has the same name as the template.
 */
export function findMainCompanionChunk(chunks, template:Template) {
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
export function findTemplateModule(modules, template:Template) {
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
export function * getCompanionChunks(chunks, template:Template) {
  let {fullPath} = template
  const MAIN_CHUNK = findMainCompanionChunk(chunks, template)

  if (!MAIN_CHUNK) {
    log(`Companion chunk NOT found for: ${prettyFormat(fullPath)}`)
    return
  }

  log(`Companion chunk found for: ${prettyFormat({
    chunk: MAIN_CHUNK.id,
    template: fullPath,
  })}`)

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
