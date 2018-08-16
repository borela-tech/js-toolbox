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

import debug from 'debug'
import libraryConfig from './library'
import nodeAppConfig from './node-app'
import prettyFormat from 'pretty-format'
import {getSettings} from '../../settings'
import {resolve} from 'path'

let log = debug('bb:config:webpack')

let {projectType} = getSettings()
let compositeConfig

switch (projectType) {
  case 'app':
    compositeConfig = nodeAppConfig()
    break
  case 'library':
    compositeConfig = libraryConfig()
    break
  default:
    throw new Error(`Unsupported project type “${projectType}”.`)
}

// By default, all settings are generated where the output has a directory for
// each platform supported, but, if we are targetting only 1 platform, this
// convention is not necessary.
if (compositeConfig.length < 2) {
  compositeConfig = compositeConfig[0]
  compositeConfig.output.path = resolve(compositeConfig.output.path, '..')
}

log(prettyFormat(compositeConfig))
module.exports = compositeConfig
