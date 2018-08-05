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
import {
  BORELA_JS as BORELA_JS_PATH,
  BORELA_JSON as BORELA_JSON_PATH,
  PACKAGE_JSON as PACKAGE_JSON_PATH,
} from '../paths'
import {interopRequire} from '../util'
import {existsSync} from 'fs'

const PACKAGE_JSON = existsSync(PACKAGE_JSON_PATH)
  ? require(PACKAGE_JSON_PATH).borela
  : {}

const BORELA_JS = existsSync(BORELA_JS_PATH)
  ? interopRequire(BORELA_JS_PATH)
  : {}

const BORELA_JSON = existsSync(BORELA_JSON_PATH)
  ? require(BORELA_JSON_PATH)
  : {}

const ENV = process.env.borela
  ? JSON.parse(process.env.borela)
  : {}

export function getSettings() {
  return {
    ...camelizeKeys(PACKAGE_JSON),
    ...camelizeKeys(BORELA_JSON),
    ...camelizeKeys(BORELA_JS),
    ...camelizeKeys(ENV),
  }
}
