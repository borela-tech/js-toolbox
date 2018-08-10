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
import {BIN_DIR, PACKAGE_DIR} from './paths'
import {delimiter as PATH_DELIMITER} from 'path'
import {pickNonFalsy} from './util'
import {spawn, spawnSync} from 'child_process'

const LOG = debug('borela-js-toolbox')
const IS_WINDOWS = process.platform === 'win32'
const PATH_KEY = IS_WINDOWS ? 'Path' : 'PATH'
const TOOLBOX_PATH = BIN_DIR + PATH_DELIMITER + process.env[PATH_KEY]
const SUCCESS = 0

export function calculateEnv(env = {}) {
  return {
    ...process.env,
    [PATH_KEY]: TOOLBOX_PATH,
    TEMP_BORELA_JS_TOOLBOX: JSON.stringify(pickNonFalsy(env)),
  }
}

export function exitOnError(spawnResult) {
  if (spawnResult.status !== SUCCESS)
    process.exit(spawnResult.status)
}

export type RunOptions = {
  args?:string[],
  env?:Object,
  stdio?:string|string[]
}

export function runCommand(cmd:string, options?:RunOptions) {
  return internalRunCommand(spawn, cmd, options)
}

export function runCommandSync(cmd:string, options?:RunOptions) {
  return internalRunCommand(spawnSync, cmd, options)
}

function internalRunCommand(spawn:Function, cmd:string, options?:RunOptions) {
  LOG('Spawning...')

  let {
    args = [],
    env = {},
    stdio = 'inherit',
  } = options || {}

  LOG('cmd: ', prettyFormat(cmd))
  LOG('options: ', prettyFormat(options))

  const COMPUTED_OPTIONS = {
    cwd: PACKAGE_DIR || process.cwd(),
    env: calculateEnv(env),
    shell: true,
    stdio,
  }

  const RESULT = spawn(cmd, args, COMPUTED_OPTIONS)

  LOG('COMPUTED_OPTIONS: ', prettyFormat(COMPUTED_OPTIONS))
  LOG('Result: ', prettyFormat(RESULT))

  return RESULT
}
