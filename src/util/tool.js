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

import {existsSync} from "fs"
import {join} from "path"
import {spawnSync} from "child_process"
import {
  TARGET_PACKAGE_DIR,
  TARGET_PACKAGE_BIN_DIR,
  TOOLBOX_BIN_DIR
} from "./paths"

// Cache for found binaries.
const BINARIES = {}

/**
 * Finds the binary either in the toolbox or target package’s directory.
 */
function findBin(bin: string) {
  if (BINARIES[bin]) return BINARIES[bin]

  const TOOLBOX_BIN = join(TOOLBOX_BIN_DIR, bin)
  if (existsSync(TOOLBOX_BIN))
    BINARIES[bin] =
      process.platform === "win32" ? `${TOOLBOX_BIN}.cmd` : TOOLBOX_BIN

  const PACKAGE_BIN = join(TARGET_PACKAGE_BIN_DIR, bin)
  if (existsSync(PACKAGE_BIN))
    BINARIES[bin] =
      process.platform === "win32" ? `${PACKAGE_BIN}.cmd` : PACKAGE_BIN

  return BINARIES[bin]
}

export function run(bin: string, args: string[]) {
  return spawnSync(findBin(bin), args, {
    cwd: TARGET_PACKAGE_DIR,
    stdio: "inherit"
  })
}
