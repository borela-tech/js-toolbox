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

import prettyFormat from 'pretty-format'
import {CONFIGS_DIR, PACKAGE_DIR} from '../../paths'
import {getSettings} from '../toolbox'
import {join} from 'path'

let {debugToolbox} = getSettings()

const CONFIG = {
  rootDir: join(PACKAGE_DIR, 'src'),
  testRegex: '__tests__',
  testPathIgnorePatterns: ['node_modules', '__fixture__', '__fixtures__'],
  transform: {
    '^.+\\.(jsx?)$': join(CONFIGS_DIR, 'jest', 'babel-transform.js'),
  },
  verbose: true,
}

if (debugToolbox)
  console.log('Jest config: ', prettyFormat(CONFIG))

module.exports = CONFIG
