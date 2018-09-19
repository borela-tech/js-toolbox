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

import {
  babelPlugin,
  babelSyntaxPlugin,
  getModulePath,
} from '../../modules'

import debug from 'debug'
import experimental from './plugins/experimental'
import flow from './plugins/flow'
import jsx from './plugins/jsx'
import prettyFormat from 'pretty-format'
import react from './plugins/react'
import typeScript from './plugins/typeScript'
import {getSettings} from '../../settings'

let log = debug('bb:config:babel')

/**
 * The final Babel preset.
 */
export default function () {
  let {
    browsers,
    includePolyfills,
    node,
    platforms,
    projectType,
  } = getSettings()

  let result = {
    plugins: [
      babelSyntaxPlugin('dynamic-import'),
      // This plugin will prevent the Babel’s runtime from being inserted on
      // every module which should reduce Webpack’s bundle size drastically.
      // The plugin alone will not work, the “@babel/runtime” still must be
      // included in the bundle.
      babelPlugin('transform-runtime'),
    ],
    presets: [],
  }

  if (includePolyfills === undefined) {
    switch (projectType) {
      case 'cli':
      case 'node-app':
      case 'react-app':
        includePolyfills = true
        break
      case 'lib':
      case 'node-lib':
      case 'web-lib':
        includePolyfills = false
        break
    }
  }

  if (includePolyfills) {
    // The preset env will check the “browsers” and “node” values to enable the
    // necessary transformations.
    let presetEnvOptions = {
      useBuiltIns: 'usage',
      targets: {},
    }

    if (platforms.includes('browser'))
      presetEnvOptions.targets.browsers = browsers

    if (platforms.includes('node'))
      presetEnvOptions.targets.node = node

    result.presets.push([
      getModulePath('@babel/preset-env'),
      presetEnvOptions,
    ])
  }

  // Each of these functions will check the toolbox’s settings and add the
  // necessary plugins.
  experimental(result.plugins)
  flow(result.plugins)
  jsx(result.plugins)
  react(result.plugins)
  typeScript(result.plugins)

  log(prettyFormat(result))
  return result
}
