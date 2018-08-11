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
import {CONFIGS_DIR, getPackageDir} from '../../paths'
import {getSettings} from '../toolbox'
import {join} from 'path'

const log = debug('borela-js-toolbox:config:jest')

let {platforms = []} = getSettings()
const BROWSER = platforms.includes('browser')

log('platforms: ', prettyFormat(platforms))
log('BROWSER: ', prettyFormat(BROWSER))

const CONFIG = {
  rootDir: join(getPackageDir(), 'src'),
  modulePathIgnorePatterns: ['node_modules', '__fixture__', '__fixtures__'],
  testEnvironment: BROWSER ? 'jsdom' : 'node',
  testRegex: '__tests__',
  testPathIgnorePatterns: ['node_modules', '__fixture__', '__fixtures__'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(jsx?)$': join(CONFIGS_DIR, 'jest', 'babel-transform.js'),
  },
  verbose: true,
}

log(prettyFormat(CONFIG))
module.exports = CONFIG
