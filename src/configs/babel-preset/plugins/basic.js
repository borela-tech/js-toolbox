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

import {findModule} from '../../../modules'
import {getSettings} from '../../toolbox'

function babelPlugin(target, options) {
  const TARGET_MODULE = findModule(`@babel/plugin-proposal-${target}`)
  if (options)
    return [TARGET_MODULE, options]
  return TARGET_MODULE
}

export function addBasicPlugins(plugins) {
  // Basic extensions.
  plugins.push(babelPlugin('pipeline-operator', {proposal: 'minimal'}))
  plugins.push(babelPlugin('async-generator-functions'))
  plugins.push(babelPlugin('do-expressions'))
  plugins.push(babelPlugin('export-default-from'))
  plugins.push(babelPlugin('export-namespace-from'))
  plugins.push(babelPlugin('function-bind'))
  plugins.push(babelPlugin('function-sent'))
  plugins.push(babelPlugin('logical-assignment-operators'))
  plugins.push(babelPlugin('nullish-coalescing-operator'))
  plugins.push(babelPlugin('numeric-separator'))
  plugins.push(babelPlugin('object-rest-spread'))
  plugins.push(babelPlugin('optional-catch-binding'))
  plugins.push(babelPlugin('optional-chaining'))
  plugins.push(babelPlugin('throw-expressions'))
  plugins.push(babelPlugin('unicode-property-regex'))

  // Decorators must appear before class properties.
  plugins.push(babelPlugin('decorators', {legacy: true}))
  plugins.push(babelPlugin('class-properties'))

  let {production} = getSettings()
  if (production)
    return

  // IMPORTANT: This plugin will enable source map on stack traces but only if
  // babel generate inline source maps.
  plugins.push(findModule('babel-plugin-source-map-support'))
}

export default addBasicPlugins
