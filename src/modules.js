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
import {PACKAGE_MODULES_DIR, TOOLBOX_MODULES_DIR} from './paths'

// Cache for found modules.
const MODULES = {}

/**
 * Find the module either in the toolbox or target package’s directory.
 */
export function findModule(targetModule:string) {
  if (MODULES[targetModule])
    return MODULES[targetModule]

  const TOOLBOX_MODULE = join(TOOLBOX_MODULES_DIR, targetModule)
  if (existsSync(TOOLBOX_MODULE))
    MODULES[targetModule] = TOOLBOX_MODULE

  const PACKAGE_MODULE = join(PACKAGE_MODULES_DIR, targetModule)
  if (existsSync(PACKAGE_MODULE))
    MODULES[targetModule] = PACKAGE_MODULE

  return MODULES[targetModule]
}

export function getModuleInfo(targetModule:string) {
  return require(join(findModule(targetModule), 'package.json'))
}

export function getModuleNameVersion(targetModule:string) {
  let info = getModuleInfo(targetModule)
  return `${targetModule} (v${info.version})`
}
