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
import {join} from 'path'
import {spawnSync} from 'child_process'
import {PACKAGE_DIR, PACKAGE_BIN_DIR, TOOLBOX_BIN_DIR} from './paths'

const BINARIES = {}
const IS_WINDOWS = process.platform === 'win32'

/**
 * Find the binary either in the toolbox or target package’s directory.
 */
export function findBinary(targetBinary:string) {
  if (BINARIES[targetBinary])
    return BINARIES[targetBinary]

  const TOOLBOX_BIN = join(TOOLBOX_BIN_DIR, targetBinary)
  if (existsSync(TOOLBOX_BIN))
    BINARIES[targetBinary] = IS_WINDOWS ? `${TOOLBOX_BIN}.cmd` : TOOLBOX_BIN

  const PACKAGE_BIN = join(PACKAGE_BIN_DIR, targetBinary)
  if (existsSync(PACKAGE_BIN))
    BINARIES[targetBinary] = IS_WINDOWS ? `${PACKAGE_BIN}.cmd` : PACKAGE_BIN

  return BINARIES[targetBinary]
}

/**
 * Delete any falsy property to prevent them to be passed as strings.
 */
function normalizeEnv(env) {
  let result = []
  for (let prop in env) {
    if (env[prop])
      result[prop] = env[prop]
  }
  return result
}

/**
 * Find the binary and run it with the parent IO attached to it.
 */
export function runBin(targetBinary:string, args:string[], env?:Object) {
  const FOUND_BINARY = findBinary(targetBinary)
  return spawnSync(FOUND_BINARY, args, {
    cwd: PACKAGE_DIR,
    env: normalizeEnv(env),
    stdio: 'inherit',
  })
}

/**
 * Find the binary and run it.
 */
export function runBinPiped(targetBinary:string, args:string[], env?:any) {
  const FOUND_BINARY = findBinary(targetBinary)
  return spawnSync(FOUND_BINARY, args, {
    cwd: PACKAGE_DIR,
    env: normalizeEnv(env),
  })
}
