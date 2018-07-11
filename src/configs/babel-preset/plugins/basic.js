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

import {babelProposalPlugin, getModulePath} from '../../../modules'
import {getSettings} from '../../toolbox'

export default function addBasicPlugins(plugins) {
  // Basic extensions.
  plugins.push(babelProposalPlugin('pipeline-operator', {proposal: 'minimal'}))
  plugins.push(babelProposalPlugin('async-generator-functions'))
  plugins.push(babelProposalPlugin('do-expressions'))
  plugins.push(babelProposalPlugin('export-default-from'))
  plugins.push(babelProposalPlugin('export-namespace-from'))
  plugins.push(babelProposalPlugin('function-bind'))
  plugins.push(babelProposalPlugin('function-sent'))
  plugins.push(babelProposalPlugin('logical-assignment-operators'))
  plugins.push(babelProposalPlugin('nullish-coalescing-operator'))
  plugins.push(babelProposalPlugin('numeric-separator'))
  plugins.push(babelProposalPlugin('object-rest-spread'))
  plugins.push(babelProposalPlugin('optional-catch-binding'))
  plugins.push(babelProposalPlugin('optional-chaining'))
  plugins.push(babelProposalPlugin('throw-expressions'))
  plugins.push(babelProposalPlugin('unicode-property-regex'))

  // Decorators must appear before class properties.
  plugins.push(babelProposalPlugin('decorators', {legacy: true}))
  plugins.push(babelProposalPlugin('class-properties'))

  let {production} = getSettings()
  if (production)
    return

  // IMPORTANT: This plugin will enable source map on stack traces but only if
  // babel generate inline source maps.
  plugins.push(getModulePath('babel-plugin-source-map-support'))
}
