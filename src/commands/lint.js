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

import {CONFIGS_DIR, PACKAGE_DIR} from '../paths'
import {join} from 'path'
import {runBinary} from '../binaries'

const ESLINT_CONFIG_PATH = join(CONFIGS_DIR, 'eslint', 'index.js')
const ESLINT_ARGS = [
  '--ignore-pattern',
  '/build/',
  '--config',
  ESLINT_CONFIG_PATH,
  PACKAGE_DIR,
]

export default {
  command: 'lint',
  description: 'Check or fix code style.',
  builder: yargs => yargs.option('fix', {
    description: 'Fix lint errors.',
  }),
  handler: ctrineArgs => {
    let args = [...ESLINT_ARGS]

    if (ctrineArgs.fix)
      args.push('--fix')

    // Lint test files.
    // runBinary('eslint', args, ctrineArgs)
    // Lint all other files.
    runBinary('eslint', args, ctrineArgs)
  },
}
