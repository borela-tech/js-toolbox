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

import nodeExternals from 'webpack-node-externals'
import shared from './shared'
import {getSettings} from '../../settings'
import {join} from 'path'

let {platforms} = getSettings()

function nodeAppConfig() {
  let config = shared()

  config.output = {
    ...config.output,
    path: join(config.output.path, 'node'),
  }

  config.externals.push(nodeExternals())
  config.target = 'node'
  return config
}

function webAppConfig() {
  let config = shared()

  config.output = {
    ...config.output,
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
        result.push(webAppConfig())
        break
      case 'node':
        result.push(nodeAppConfig())
        break
      default:
        throw new Error(`Unsupported platform “${platform}”.`)
    }
  }

  return result
}
