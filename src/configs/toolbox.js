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
  CTRINE_JS as CTRINE_JS_PATH,
  CTRINE_JSON as CTRINE_JSON_PATH,
  PACKAGE_JSON as PACKAGE_JSON_PATH,
} from '../paths'
import {existsSync} from 'fs'
import {interopRequire} from '../util'

const PACKAGE_JSON = existsSync(PACKAGE_JSON_PATH)
  ? require(PACKAGE_JSON_PATH).ctrine
  : {}

const CTRINE_JS = existsSync(CTRINE_JS_PATH)
  ? interopRequire(CTRINE_JS_PATH)
  : {}

const CTRINE_JSON = existsSync(CTRINE_JSON_PATH)
  ? require(CTRINE_JSON_PATH)
  : {}

const ENV = process.env.ctrine
  ? JSON.parse(process.env.ctrine)
  : {}

export function getSettings() {
  return {
    ...camelizeKeys(PACKAGE_JSON),
    ...camelizeKeys(CTRINE_JSON),
    ...camelizeKeys(CTRINE_JS),
    ...camelizeKeys(ENV),
  }
}
