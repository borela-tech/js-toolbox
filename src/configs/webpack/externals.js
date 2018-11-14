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
import {isAbsolute, join, resolve} from 'path'
import {isSubPathOf} from '../../utils'

let logIncluded = debug('bb:config:webpack:included')
let logExcluded = debug('bb:config:webpack:excluded')

/**
 * Function used to exclude “node_modules” dependencies from being bundled.
 *
 * @param storeState
 * CLI’s current state.
 */
export default function (storeState, options = {}) {
  let {include, exclude} = options
  let {
    directories: {
      project: {
        source: projectSourceDir,
      },
      toolbox: {
        entries: entriesDir,
      },
    },
  } = storeState

  return function (context, request, callback) {
    // The necessary runtime for each module is removed using the plugin
    // “@babel/plugin-transform-runtime”, this conditional will add it back to
    // the bundle.
    if (request.includes('@babel/runtime')) {
      logIncluded(prettyFormat({context, request}))
      callback()
      return
    }

    const RESOLVED_PATH = request.startsWith('.')
      ? resolve(context, request)
      : request

    if (isAbsolute(RESOLVED_PATH)) {
      // Include default entry points.
      if (isSubPathOf(RESOLVED_PATH, entriesDir)) {
        logIncluded(prettyFormat({context, request}))
        callback()
        return
      }

      // Include files from the project.
      if (isSubPathOf(RESOLVED_PATH, projectSourceDir)) {
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
