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
import {PACKAGE_DIR} from './paths'
import {pickNonFalsy} from './util'
import {spawnSync} from 'npm-run'

const SUCCESS = 0

export function runBin(targetBinary:string, args:string[], env?:Object) {
  let {debugToolbox} = env
  if (debugToolbox) {
    console.log('Borela Toolbox | Spawning binary')
    console.log('Binary:')
    console.log(prettyFormat(targetBinary))
    console.log('Arguments:')
    console.log(prettyFormat(args))
    console.log('Environment:')
    console.log(prettyFormat(env))
  }

  let result = spawnSync(targetBinary, args, {
    cwd: PACKAGE_DIR,
    env: {borela: JSON.stringify(pickNonFalsy(env))},
    shell: true,
    stdio: 'inherit',
  })

  if (debugToolbox) {
    console.log('Spawn result:')
    console.log(prettyFormat(result))
  }

  if (result.status != SUCCESS)
    process.exit(result.status)
}
