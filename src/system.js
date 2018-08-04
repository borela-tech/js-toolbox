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
import {BIN_DIR, PACKAGE_DIR} from './paths'
import {delimiter as PATH_DELIMITER} from 'path'
import {isToolboxBeingDebugged} from './state'
import {pickNonFalsy} from './util'
import {spawn, spawnSync} from 'child_process'

const IS_WINDOWS = process.platform === 'win32'
const PATH_KEY = IS_WINDOWS ? 'Path' : 'PATH'
const TOOLBOX_PATH = BIN_DIR + PATH_DELIMITER + process.env[PATH_KEY]
const SUCCESS = 0

export function exitOnError(runCommandResult) {
  if (runCommandResult.status === SUCCESS)
    return
  process.exit(runCommandResult.status)
}

export function runCommand(cmd:string, args:string[], env?:Object) {
  return internalRunCommand(spawn, cmd, args, env)
}

export function runCommandSync(cmd:string, args:string[], env?:Object) {
  return internalRunCommand(spawnSync, cmd, args, env)
}

function internalRunCommand(
  spawn:Function,
  cmd:string,
  args:string[],
  env?:Object,
) {
  const COMPUTED_ENV = {
    ...process.env,
    [PATH_KEY]: TOOLBOX_PATH,
    borela: JSON.stringify(pickNonFalsy(env)),
  }

  if (isToolboxBeingDebugged()) {
    console.log('Spawning: ', prettyFormat({args, cmd, env}))
    console.log('Computed env:', prettyFormat(COMPUTED_ENV))
  }

  let result = spawn(cmd, args, {
    cwd: PACKAGE_DIR || process.cwd(),
    env: COMPUTED_ENV,
    shell: true,
    stdio: 'inherit',
  })

  if (isToolboxBeingDebugged())
    console.log('Spawn result: ', prettyFormat(result))

  return result
}
