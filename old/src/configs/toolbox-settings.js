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
import {getProjectDir} from '../paths'
import {join} from 'path'

const PACKAGE_DIR = getProjectDir()
const PACKAGE_JSON_PATH = join(PACKAGE_DIR, 'package.json')
const BORELARC_PATH = join(PACKAGE_DIR, 'borelarc')
const BORELA_JSON_PATH = join(PACKAGE_DIR, 'borela.json')

/**
 * Each tool will run on its own process, this means that the configuration
 * files will not have any knowledge of the flags passed to the toolbox, to
 * solve that, they are passed as a JSON string in the env variable
 * “TEMP_BORELA_JS_TOOLBOX” which is loaded here.
 */
export const ENV = process.env.TEMP_BORELA_JS_TOOLBOX
  ? camelizeKeys(JSON.parse(process.env.TEMP_BORELA_JS_TOOLBOX))
  : {}

/**
 * The contents of the “borela” key inside the project’s “package.json”.
 */
export const PACKAGE_JSON = existsSync(PACKAGE_JSON_PATH)
  ? camelizeKeys(require(PACKAGE_JSON_PATH).borela)
  : {}

/**
 * The contents of “borelarc” in the project’s root.
 */
export const BORELARC = existsSync(BORELARC_PATH)
  ? camelizeKeys(JSON.parse(readFileSync(BORELARC_PATH)))
  : {}

/**
 * The contents of “borela.json” in the project’s root.
 */
export const BORELA_JSON = existsSync(BORELA_JSON_PATH)
  ? camelizeKeys(require(BORELA_JSON_PATH))
  : {}

/**
 * Combines the flags gathered from the different ways that the toolbox can be
 * configured, set some defaults and returns the result.
 */
export function getSettings() {
  let settings = {
    ...PACKAGE_JSON,
    ...BORELARC,
    ...BORELA_JSON,
    ...ENV,
  }
  setDefaultSettings(settings)
  return settings
}

/**
 * Add missing settings with the default values.
 */
function setDefaultSettings(settings) {
  if (!settings)
    throw new Error('Settings must be an object.')

  // Default settings for each project type.
  switch (settings.projectType) {
    case 'cli':
    case 'node-app':
    case 'node-lib':
      settings.platforms ??= ['node']
      break

    case 'lib':
      settings.platforms ??= ['browser', 'node']
      break

    case 'react-spa':
      settings.platforms ??= ['browser']
      settings.jsx ??= true
      settings.react ??= true
      break

    case 'web-lib':
      settings.platforms ??= ['browser']
      break
  }

  // Default supported browsers inferred by the platform.
  if (settings.platforms.includes('browsers')) {
    settings.browsers ??= [
      '>= 0.5%',
      'not ie 11',
      'not op_mini all',
    ]
  }

  // Default supported NodeJS inferred by the platform.
  if (settings.platforms.includes('node'))
    settings.node ??= '8.9'
}
