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

import pkgDir from 'pkg-dir'
import {join} from 'path'

let targetDir = process.cwd()

export function getProjectDir():string {
  return pkgDir.sync(targetDir) || ''
}

export function getTargetDir():string {
  return targetDir
}

export function setTargetDir(dir:string):string {
  targetDir = dir
}

// This is the path to the toolbox itself.
export const TOOLBOX_DIR = join(__dirname, '..')
export const TOOLBOX_SRC_DIR = join(TOOLBOX_DIR, 'src')

// Other helpers to locate the assets.
export const BIN_DIR = join(TOOLBOX_DIR, 'node_modules', '.bin')
export const CONFIGS_DIR = join(TOOLBOX_DIR, 'build', 'configs')
export const MODULES_DIR = join(TOOLBOX_DIR, 'node_modules')
export const TEMPLATES_DIR = join(TOOLBOX_DIR, 'templates')
