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

import cliAppConfig from './cli-app'
import debug from 'debug'
import nodeAppConfig from './node-app'
import nodeLibConfig from './node-lib'
import prettyFormat from 'pretty-format'
import reactAppConfig from './react-app'
import webLibConfig from './web-lib'
import {getSettings} from '../../settings'
import {resolve} from 'path'

let log = debug('bb:config:webpack')

let {projectType} = getSettings()
let config

switch (projectType) {
  case 'cli':
    config = cliAppConfig()
    break

  case 'lib':
    config = [
      ...nodeLibConfig(),
      ...webLibConfig(),
    ]
    break

  case 'node-lib':
    config = nodeLibConfig()
    break

  case 'node-app':
    config = nodeAppConfig()
    break

  case 'react':
    config = reactAppConfig()
    break

  case 'web-lib':
    config = webLibConfig()
    break

  default:
    throw new Error(`Unsupported project type “${projectType}”.`)
}

// By default, all settings are generated where the output has a directory for
// each platform supported, but, if we are targetting only 1 platform, this
// convention is not necessary.
if (config.length < 2) {
  config = config[0]
  config.output.path = resolve(config.output.path, '..')
}

log(prettyFormat(config))
module.exports = config
