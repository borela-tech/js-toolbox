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

import {existsSync} from 'fs'
import {fork} from 'child_process'
import {join} from 'path'
import {MODULES_DIR, PACKAGE_DIR} from './paths'
import {pickNonFalsy} from './util'

function forkPromise(script, args, options) {
  return new Promise((resolve, reject) => {
    let forked = fork(script, args, options)
    forked.on('close', () => resolve())
    forked.on('error', error => reject(error))
  })
}

export function assertBinaryExists(targetBinary:string) {
  if (!existsSync(getBinaryPath(targetBinary)))
    throw new Error(`Binary “${targetBinary}” not found.`)
}

export function getBinaryPath(targetBinary:string) {
  const MODULE = join(MODULES_DIR, targetBinary)
  const PACKAGE_JSON = require(join(MODULE, 'package.json'))
  return join(MODULE, PACKAGE_JSON.bin[targetBinary])
}

export function runBin(targetBinary:string, args:string[], env?:Object) {
  const FOUND_BINARY = getBinaryPath(targetBinary)
  env = pickNonFalsy(env)

  if (env.debugToolbox) {
    console.log('CWD: ', PACKAGE_DIR)
    console.log('Binary: ', FOUND_BINARY)
    console.log('Env: ', env)
  }

  return forkPromise(FOUND_BINARY, args, {
    cwd: PACKAGE_DIR,
    env: {borela: JSON.stringify(env)},
    stdio: 'inherit',
  })
}
