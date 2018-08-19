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
import {getProjectDir} from '../../paths'
import {join, relative} from 'path'

let logIncluded = debug('bb:config:webpack:included')
let logExcluded = debug('bb:config:webpack:excluded')

const PROJECT_DIR = getProjectDir()
const PROJECT_SRC_DIR = join(PROJECT_DIR, 'src')

/**
 * Function used to exclude “node_modules” dependencies from being bundled.
 */
export default function (options = {}) {
  let {whitelist = []} = options
  return function (context, request, callback) {
    // Default entry points.
    if (context === PROJECT_DIR) {
      switch (request) {
        case 'index':
        case 'main':
          callback()
          logIncluded(prettyFormat({context, request}))
          return
      }
    }

    // Check if it is a file from the project.
    if (request.startsWith('.')) {
      const FULL_REQUEST_PATH = join(context, request)
      const RELATIVE_TO_SRC = relative(PROJECT_SRC_DIR, FULL_REQUEST_PATH)
      // If it starts with a “..”, then the file is outside the project’s “src”
      // directory and can be ignored.
      if (!RELATIVE_TO_SRC.startsWith('..')) {
        callback()
        logIncluded(prettyFormat({context, request}))
        return
      }
    }

    // Whitelisted modules.
    if (whitelist.includes(request)) {
      callback()
      return
    }

    // Exclude everything else.
    callback(null, `commonjs ${request}`)
    logExcluded(prettyFormat({context, request}))
  }
}
