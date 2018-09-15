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

import debug from 'debug'
import prettyFormat from 'pretty-format'
import {CONFIGS_DIR, getProjectDir} from '../../paths'
import {isPathSubDirOf} from '../../util'
import {isAbsolute, join, resolve} from 'path'

let logIncluded = debug('bb:config:webpack:included')
let logExcluded = debug('bb:config:webpack:excluded')

const PROJECT_DIR = getProjectDir()
const PROJECT_SRC_DIR = join(PROJECT_DIR, 'src')
const WEBPACK_CONFIG_DIR = join(CONFIGS_DIR, 'webpack')
const ENTRIES_DIR = join(WEBPACK_CONFIG_DIR, 'entries')

/**
 * Function used to exclude “node_modules” dependencies from being bundled.
 */
export default function (options = {}) {
  let {include, exclude} = options
  return function (context, request, callback) {
    // Include runtime removed using the “@babel/plugin-transform-runtime”.
    if (request.includes('@babel/runtime')) {
      logIncluded(prettyFormat({context, request}))
      callback()
      return
    }

    // Turn relative requests into absolute ones.
    if (request.startsWith('.'))
      request = resolve(context, request)

    if (isAbsolute(request)) {
      // Include default entry points.
      if (isPathSubDirOf(request, ENTRIES_DIR)) {
        logIncluded(prettyFormat({context, request}))
        callback()
        return
      }

      // Include files from the project.
      if (isPathSubDirOf(request, PROJECT_SRC_DIR)) {
        logIncluded(prettyFormat({context, request}))
        callback()
        return
      }
    }

    // Custom inclusions.
    if (include && include(context, request)) {
      logIncluded(prettyFormat({context, request}))
      callback()
      return
    }

    // Custom exclusions.
    if (exclude && exclude(context, request)) {
      logExcluded(prettyFormat({context, request}))
      callback(null, `commonjs2 ${request}`)
      return
    }

    // Exclude everything else.
    logExcluded(prettyFormat({context, request}))
    callback(null, `commonjs2 ${request}`)
  }
}
