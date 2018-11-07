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
import store from '../../state'

import experimental from './plugins/experimental'
import flow from './plugins/flow'
import jsx from './plugins/jsx'
import react from './plugins/react'
import typeScript from './plugins/typeScript'

let log = debug('bb:config:babel')

/**
 * Add “@babel/preset-env” to the final preset configured to include polyfills
 * in the final bundle.
 */
function includePolyfills(preset) {
  let {
    options: {
      browsers,
      node,
    }
  } = store.getState()

  const OPTIONS = {
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
    OPTIONS,
  ])
}

/**
 * The final Babel preset.
 */
export default function () {
  let {
    options: {includePolyfills}
  } = store.getState()

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

  if (includePolyfills)
    includePolyfills(preset)

  preset
    |> experimental
    |> flow
    |> jsx
    |> react
    |> typeScript

  log(prettyFormat(preset))
  return preset
}
