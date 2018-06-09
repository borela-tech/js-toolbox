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

import {camelizeKeys} from 'humps'
import {existsSync} from 'fs'
import {join} from 'path'
import {PACKAGE_DIR} from '../paths'

const PACKAGE_JSON_PATH = join(PACKAGE_DIR, 'package.json')
const PACKAGE_JSON = existsSync(PACKAGE_JSON_PATH)
  ? require(PACKAGE_JSON_PATH)
  : {}

const CTRINE_JSON_PATH = join(PACKAGE_DIR, 'ctrine.json')
const CTRINE_JSON = existsSync(CTRINE_JSON_PATH)
  ? require(CTRINE_JSON_PATH)
  : {}

export function getSettings() {
  return camelizeKeys({
    ...PACKAGE_JSON.ctrine,
    ...CTRINE_JSON,
    ...process.env,
  })
}