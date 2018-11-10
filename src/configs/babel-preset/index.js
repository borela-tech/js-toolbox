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
import prettyFormat from 'pretty-format'

import experimental from './plugins/experimental'
import flow from './plugins/flow'
import jsx from './plugins/jsx'
import react from './plugins/react'
import typeScript from './plugins/typeScript'

let log = debug('bb:config:babel')

/**
 * Generate a Babel’s preset based on CLI’s state.
 *
 * @param storeState
 * CLI’s current state.
 */
export default function (storeState) {
  let {
    options: {
      browsers,
      includePolyfills,
      node,
    }
  } = storeState

  let preset = {
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      // This plugin will prevent the Babel’s runtime from being inserted on
      // every module which should reduce Webpack’s bundle size drastically.
      // The plugin alone will not work, the “@babel/runtime” still must be
      // included in the bundle.
      '@babel/plugin-transform-runtime',
    ],
    presets: [],
  }

  if (includePolyfills) {
    const PRESET_ENV_OPTIONS = {
      useBuiltIns: 'usage',
      targets: {
        browsers,
        node,
      },
    }

    // The preset env will check the “browsers” and “node” values to enable the
    // necessary transformations.
    preset.presets.push([
      '@babel/preset-env',
      PRESET_ENV_OPTIONS,
    ])
  }

  // Each function will check the store’s state and add only the necessary
  // plugins.
  ({storeState, preset})
    |> experimental
    |> flow
    |> jsx
    |> react
    |> typeScript

  log(prettyFormat(preset))
  return preset
}
