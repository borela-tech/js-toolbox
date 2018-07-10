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

import {existsSync} from 'fs'
import {join} from 'path'
import {MODULES_DIR} from './paths'

export function assertModuleExists(targetModule:string) {
  if (!existsSync(getModulePath(targetModule)))
    throw new Error(`Module “${targetModule}” not found.`)
}

export function babelPlugin(plugin:string, options?:Object) {
  const MODULE = getModulePath(`@babel/plugin-${plugin}`)
  return options ? [MODULE, options] : MODULE
}

export function babelProposalPlugin(plugin:string, options?:Object) {
  return babelPlugin(`proposal-${plugin}`, options)
}

export function babelSyntaxPlugin(plugin:string, options?:Object) {
  return babelPlugin(`syntax-${plugin}`, options)
}

export function babelTransformPlugin(plugin:string, options?:Object) {
  return babelPlugin(`transform-${plugin}`, options)
}

export function getModulePath(targetModule:string) {
  return join(MODULES_DIR, targetModule)
}

export function getModuleNameVersion(targetModule:string) {
  let json = getModulePackageJson(targetModule)
  return `${targetModule} (v${json.version})`
}

export function getModulePackageJson(targetModule:string) {
  return require(join(getModulePath(targetModule), 'package.json'))
}
