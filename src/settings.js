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
import {existsSync, readFileSync} from 'fs'
import {getPackageDir} from './paths'
import {join} from 'path'

const ENV_VAR = /^BORELA_JS_TOOLBOX_(.+)$/

export function getEnvFlags() {
  let result = {}
  for (let prop in process.env) {
    const MATCH = prop.match(ENV_VAR)
    if (MATCH)
      result[MATCH[1].toLowerCase()] = process.env[prop]
  }
  return camelizeKeys(result)
}

const PACKAGE_DIR = getPackageDir()
const PACKAGE_JSON_PATH = join(PACKAGE_DIR, 'package.json')
const BORELARC_PATH = join(PACKAGE_DIR, 'borelarc')
const BORELA_JSON_PATH = join(PACKAGE_DIR, 'borela.json')

export const PACKAGE_JSON = existsSync(PACKAGE_JSON_PATH)
  ? camelizeKeys(require(PACKAGE_JSON_PATH).borela)
  : {}

export const BORELARC = existsSync(BORELARC_PATH)
  ? camelizeKeys(JSON.parse(readFileSync(BORELARC_PATH)))
  : {}

export const BORELA_JSON = existsSync(BORELA_JSON_PATH)
  ? camelizeKeys(require(BORELA_JSON_PATH))
  : {}

export const CLI_ENV = process.env.TEMP_BORELA_JS_TOOLBOX
  ? camelizeKeys(JSON.parse(process.env.TEMP_BORELA_JS_TOOLBOX))
  : {}

export function getSettings() {
  let result = {
    ...getEnvFlags(),
    ...PACKAGE_JSON,
    ...BORELARC,
    ...BORELA_JSON,
    ...CLI_ENV,
  }

  // Default platforms inferred by the project’s type.
  if (!result.platforms) {
    switch (result.projectType) {
      case 'app':
      case 'cli':
        result.platforms = ['node']
        break
      case 'library':
        result.platforms = ['browser', 'node']
        break
    }
  }

  // Default supported browsers inferred by the platform.
  if (result.platforms.includes('browsers') && !result.browsers)
    result.browsers = ['chrome >= 49', '>= 0.5%', 'last 2 versions', 'not dead']

  // Default supported NodeJS inferred by the platform.
  if (result.platforms.includes('node') && !result.node)
    result.node = '8.9'

  return result
}
