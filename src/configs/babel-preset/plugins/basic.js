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

export function addBasicPlugins(plugins) {
  // Basic extensions.
  plugins.push(findModule('@babel/plugin-proposal-async-generator-functions'))
  plugins.push(findModule('@babel/plugin-proposal-do-expressions'))
  plugins.push(findModule('@babel/plugin-proposal-export-default-from'))
  plugins.push(findModule('@babel/plugin-proposal-export-namespace-from'))
  plugins.push(findModule('@babel/plugin-proposal-function-bind'))
  plugins.push(findModule('@babel/plugin-proposal-function-sent'))
  plugins.push(findModule('@babel/plugin-proposal-logical-assignment-operators'))
  plugins.push(findModule('@babel/plugin-proposal-nullish-coalescing-operator'))
  plugins.push(findModule('@babel/plugin-proposal-numeric-separator'))
  plugins.push(findModule('@babel/plugin-proposal-object-rest-spread'))
  plugins.push(findModule('@babel/plugin-proposal-optional-catch-binding'))
  plugins.push(findModule('@babel/plugin-proposal-optional-chaining'))
  plugins.push(findModule('@babel/plugin-proposal-pipeline-operator'))
  plugins.push(findModule('@babel/plugin-proposal-throw-expressions'))
  plugins.push(findModule('@babel/plugin-proposal-unicode-property-regex'))

  // Decorators must appear before class properties.
  plugins.push([findModule('@babel/plugin-proposal-decorators'), {legacy: true}])
  plugins.push(findModule('@babel/plugin-proposal-class-properties'))

  let {production} = getSettings()
  if (production)
    return

  // IMPORTANT: This plugin will enable source map on stack traces but only if
  // babel generate inline source maps.
  plugins.push(findModule('babel-plugin-source-map-support'))
}

export default addBasicPlugins
