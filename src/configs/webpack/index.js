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

import basic from './basic'
import debug from 'debug'
import prettyFormat from 'pretty-format'
import {getProjectName} from '../../util'
import {getSettings} from '../../settings'
import {join} from 'path'

let log = debug('bb:config:webpack')

function platformToTarget(platform) {
  switch (platform) {
    case 'browser':
      return 'web'
    case 'node':
      return platform
  }
  throw new Error(`Unsupported platform “${platform}”.`)
}

let configs = []
let {platforms, projectType} = getSettings()

if (projectType === 'library') {
  let config = basic()
  config.output = {
    ...config.output,
    library: getProjectName(),
    libraryTarget: 'umd',
  }
  configs.push(config)
}

// // Set target platform.
// for (let platform of platforms) {
//   let config = basic()
//   config.target = platformToTarget(platform)
//   configs.push(config)
// }
//
// // Add target to output directory path if the are multiple platforms.
// if (configs.length > 1) {
//   for (let config of configs)
//     config.output.path = join(config.output.path, config.target)
// }

log(prettyFormat(configs))
module.exports = configs
