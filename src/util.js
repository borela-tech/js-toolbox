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

import {getProjectDir} from './paths'
import {isAbsolute, join, relative} from 'path'

export function exitOnPackageNotFound() {
  if (getProjectDir())
    return
  process.stdout.write('No valid “package.json” found.')
  process.exit(1)
}

export function getProjectName() {
  const PACKAGE_JSON = join(getProjectDir(), 'package.json')
  return require(PACKAGE_JSON).name
}

export function isProduction() {
  let {NODE_ENV} = process.env
  return isString(NODE_ENV)
    ? NODE_ENV === 'production'
    : false
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isPathSubDirOf(path, parent) {
  let result = relative(parent, path)

  // Returns an empty string when “parent” is the same as the “path”.
  if (result == '')
    return false

  // Windows: If the result is an absolute path, this means that paths are on
  // different drive letters.
  if (isAbsolute(result))
    return false

  return !result.startsWith('..')
}

export function isWindows() {
  return process.platform === 'win32'
}

export function pickNonFalsy(obj:Object):Object {
  let result = {}
  for (let prop in obj) {
    if (obj[prop])
      result[prop] = obj[prop]
  }
  return result
}
