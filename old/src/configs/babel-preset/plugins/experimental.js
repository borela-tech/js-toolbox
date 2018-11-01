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

import {babelProposalPlugin} from '../../../modules'
import {getSettings} from '../../toolbox-settings'

export default function (plugins) {
  let {disableExperimentalPlugins} = getSettings()
  if (disableExperimentalPlugins)
    return

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-async-generator-functions
  plugins.push(babelProposalPlugin('async-generator-functions'))

  // IMPORTANT: Decorators must appear before class properties.
  // https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators
  plugins.push(babelProposalPlugin('decorators', {legacy: true}))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties
  plugins.push(babelProposalPlugin('class-properties', {loose: true}))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-do-expressions
  plugins.push(babelProposalPlugin('do-expressions'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-export-default-from
  plugins.push(babelProposalPlugin('export-default-from'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-export-namespace-from
  plugins.push(babelProposalPlugin('export-namespace-from'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-function-bind.html
  plugins.push(babelProposalPlugin('function-bind'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-function-sent
  plugins.push(babelProposalPlugin('function-sent'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-logical-assignment-operators
  plugins.push(babelProposalPlugin('logical-assignment-operators'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-nullish-coalescing-operator
  plugins.push(babelProposalPlugin('nullish-coalescing-operator'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-numeric-separator
  plugins.push(babelProposalPlugin('numeric-separator'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread
  plugins.push(babelProposalPlugin('object-rest-spread'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-catch-binding
  plugins.push(babelProposalPlugin('optional-catch-binding'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining
  plugins.push(babelProposalPlugin('optional-chaining'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-pipeline-operator
  plugins.push(babelProposalPlugin('pipeline-operator', {proposal: 'minimal'}))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-throw-expressions
  plugins.push(babelProposalPlugin('throw-expressions'))

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-unicode-property-regex
  plugins.push(babelProposalPlugin('unicode-property-regex'))
}
