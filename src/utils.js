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

import {isAbsolute, relative} from 'path'

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * Returns true if “path” is subpath of “parent”.
 */
export function isSubPathOf(path, parent) {
  let result = relative(parent, path)

  // Returns an empty string when “parent” is the same as the “path”.
  if (!result)
    return false

  // Windows: If the result is an absolute path, this means that paths are on
  // different drive letters.
  if (isAbsolute(result))
    return false

  return !result.startsWith('..')
}

export function nodeEnvIsProduction() {
  let {NODE_ENV} = process.env
  return isString(NODE_ENV)
    ? NODE_ENV === 'production'
    : false
}
