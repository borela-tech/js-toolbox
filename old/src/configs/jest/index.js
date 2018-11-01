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
import {getSettings} from '../toolbox-settings'
import {join} from 'path'

let log = debug('bb:config:jest')

let {
  jsx,
  platforms = [],
  typeScript,
} = getSettings()
const BROWSER = platforms.includes('browser')
const BABEL_TRANSFORM = join(CONFIGS_DIR, 'jest', 'babel-transform.js')

const CONFIG = {
  rootDir: join(getProjectDir(), 'src'),
  moduleFileExtensions: [
    'js',
    'json',
    'mjs',
  ],
  modulePathIgnorePatterns: [
    'node_modules',
    '__fixture__',
    '__fixtures__',
  ],
  testEnvironment: BROWSER ? 'jsdom' : 'node',
  testRegex: '__tests__',
  testPathIgnorePatterns: [
    'node_modules',
    '__fixture__',
    '__fixtures__',
  ],
  testURL: 'http://localhost',
  transform: {
    '\\.(js|mjs)$': BABEL_TRANSFORM,
  },
  verbose: true,
}

if (jsx) {
  CONFIG.moduleFileExtensions.push('jsx')
  CONFIG.transform['\\.jsx$'] = BABEL_TRANSFORM
}

if (typeScript) {
  CONFIG.moduleFileExtensions.push('ts')
  CONFIG.transform['\\.ts$'] = BABEL_TRANSFORM

  if (jsx) {
    CONFIG.moduleFileExtensions.push('tsx')
    CONFIG.transform['\\.tsx$'] = BABEL_TRANSFORM
  }
}

log(prettyFormat(CONFIG))
// We can’t “export default CONFIG” because Jest doesn’t support it.
module.exports = CONFIG
