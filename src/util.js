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

import {enableConfigDebugMode, enableDebugMode} from './state'
import {PACKAGE_DIR} from './paths'

export function checkDebugFlags(args) {
  let {debugConfigs, debugToolbox} = args
  if (debugConfigs) enableConfigDebugMode()
  if (debugToolbox) enableDebugMode()
}

export function exitOnPackageNotFound() {
  if (PACKAGE_DIR)
    return
  console.log('No valid “package.json” found.')
  process.exit(1)
}

export function interopRequire(path) {
  const RESULT = require(path)
  return RESULT.default || RESULT
}

export function pickNonFalsy(obj:Object):Object {
  let result = {}
  for (let prop in obj) {
    if (obj[prop])
      result[prop] = obj[prop]
  }
  return result
}
