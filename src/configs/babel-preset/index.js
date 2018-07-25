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

import experimental from './plugins/experimental'
import flow from './plugins/flow'
import jsx from './plugins/jsx'
import react from './plugins/react'
import typeScript from './plugins/typeScript'
import {getModulePath} from '../../modules'
import {getSettings} from '../toolbox'

module.exports = function () {
  let {
    browsers,
    node,
    platforms,
    production,
  } = getSettings()

  let result = {
    plugins: [],
    presets: [[getModulePath('@babel/preset-env'), {
      targets: {
        ...browsers && {browsers},
        ...node && {node},
      }
    }]],
  }

  experimental(result.plugins)
  flow(result.plugins)
  jsx(result.plugins)
  react(result.plugins)
  typeScript(result.plugins)

  if (!production) {
    // IMPORTANT: This plugin will enable source map on stack traces but only if
    // babel generate inline source maps.
    result.plugins.push(getModulePath('babel-plugin-source-map-support'))
  }

  return result
}
