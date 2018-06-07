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

import fs from 'fs'
import packageInfo from '../../package'
import {join} from 'path'

const PROLOG_PATH = join(__dirname, 'prolog.txt')
const EPILOG_PATH = join(__dirname, 'epilog.txt')
const PADDED_VERSION = packageInfo.version.padStart('#version'.length)

export const PROLOG = fs.readFileSync(PROLOG_PATH, 'UTF-8')
  .replace(/\n$/, '')
  .replace(/#version/, PADDED_VERSION)
export const EPILOG = fs.readFileSync(EPILOG_PATH, 'UTF-8')
  .replace(/\n$/, '')
