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
import experimental from './plugins/experimental'
import flow from './plugins/flow'
import jsx from './plugins/jsx'
import minifyPreset from 'babel-preset-minify'
import prettyFormat from 'pretty-format'
import react from './plugins/react'
import typeScript from './plugins/typeScript'
import {addSideEffect} from '@babel/helper-module-imports'
import {getModulePath} from '../../modules'
import {getSettings} from '../../settings'

let log = debug('borela-js-toolbox:config:babel')

module.exports = function () {
  let {
    browsers,
    // disableSourceMaps,
    // minify,
    node,
    platforms = [],
  } = getSettings()

  let result = {
    plugins: [],
    presets: [[getModulePath('@babel/preset-env'), {
      targets: {
        ...platforms.includes('browser') && browsers && {browsers},
        ...platforms.includes('node') && node && {node},
      },
    }]],
  }

  // if (minify)
  //   result.presets.push(minifyPreset)

  experimental(result.plugins)
  flow(result.plugins)
  jsx(result.plugins)
  react(result.plugins)
  typeScript(result.plugins)

  // IMPORTANT: This plugin will enable source map on stack traces but only if
  // babel generate inline source maps. This will only work locally and requires
  // the toolbox to be installed.
  // const PRODUCTION = process.env.NODE_ENV === 'production'
  // if (!PRODUCTION && !disableSourceMaps) {
  //   result.plugins.push(() => ({
  //     visitor: {
  //       Program(path) {
  //         // TODO: Make the path to source-map-support dynamic by querying the
  //         // toolbox’s location at runtime.
  //         addSideEffect(path, getModulePath('source-map-support/register'))
  //       },
  //     },
  //   }))
  // }

  log(prettyFormat(result))
  return result
}
