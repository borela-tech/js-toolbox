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

export function exitOnError(runBinResult) {
  if (runBinResult.status != SUCCESS)
    process.exit(runBinResult.status)
}

export function runBin(targetBinary:string, args:string[], env?:Object) {
  let {debugToolbox} = env
  if (debugToolbox)
    console.log('Spawning binary: ', prettyFormat({
      Arguments: args,
      Binary: targetBinary,
      Environment: env,
    }))

  let result = spawnSync(targetBinary, args, {
    cwd: PACKAGE_DIR,
    env: {
      ...process.env,
      borela: JSON.stringify(pickNonFalsy(env)),
    },
    shell: true,
    stdio: 'inherit',
  })

  if (debugToolbox)
    console.log('Spawn result: ', prettyFormat(result))

  return result
}
