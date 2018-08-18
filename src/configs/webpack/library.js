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

import shared from './shared'
import {getProjectName} from '../../util'
import {getSettings} from '../../settings'
import {join} from 'path'

let {minify, platforms} = getSettings()
const PROJECT_NAME = getProjectName()

function nodeLibConfig() {
  let config = shared()

  config.output = {
    ...config.output,
    filename: 'index.js',
    library: PROJECT_NAME,
    libraryTarget: 'umd',
    path: join(config.output.path, 'node'),
  }

  // Exclude any non relative imports.
  config.externals = /^(?!index|main)[a-z\-0-9]+$/

  config.target = 'node'
  return config
}

function webLibConfig() {
  let config = shared()

  config.output = {
    ...config.output,
    filename: !minify
      ? `${PROJECT_NAME}.js`
      : `${PROJECT_NAME}.min.js`,
    library: PROJECT_NAME,
    libraryTarget: 'umd',
    path: join(config.output.path, 'web'),
  }

  config.target = 'web'
  return config
}

export default function () {
  let result = []

  for (let platform of platforms) {
    switch (platform) {
      case 'browser':
        result.push(webLibConfig())
        break
      case 'node':
        result.push(nodeLibConfig())
        break
      default:
        throw new Error(`Unsupported platform “${platform}”.`)
    }
  }

  return result
}
