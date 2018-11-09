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

export default function ({storeState, preset}) {
  let {
    options: {disableExperimentalPlugins},
  } = storeState

  if (disableExperimentalPlugins)
    return preset

  let {plugins} = preset

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-async-generator-functions
  plugins.push('@babel/plugin-proposal-async-generator-functions')

  // IMPORTANT: Decorators must appear before class properties.
  // https://babeljs.io/docs/en/next/babel-plugin-proposal-decorators
  plugins.push(['@babel/plugin-proposal-decorators', {legacy: true}])

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties
  plugins.push(['@babel/plugin-proposal-class-properties', {loose: true}])

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-do-expressions
  plugins.push('@babel/plugin-proposal-do-expressions')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-export-default-from
  plugins.push('@babel/plugin-proposal-export-default-from')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-export-namespace-from
  plugins.push('@babel/plugin-proposal-export-namespace-from')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-function-bind.html
  plugins.push('@babel/plugin-proposal-function-bind')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-function-sent
  plugins.push('@babel/plugin-proposal-function-sent')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-logical-assignment-operators
  plugins.push('@babel/plugin-proposal-logical-assignment-operators')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-nullish-coalescing-operator
  plugins.push('@babel/plugin-proposal-nullish-coalescing-operator')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-numeric-separator
  plugins.push('@babel/plugin-proposal-numeric-separator')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread
  plugins.push('@babel/plugin-proposal-object-rest-spread')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-catch-binding
  plugins.push('@babel/plugin-proposal-optional-catch-binding')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining
  plugins.push('@babel/plugin-proposal-optional-chaining')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-pipeline-operator
  plugins.push([
    '@babel/plugin-proposal-pipeline-operator',
    {proposal: 'minimal'},
  ])

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-throw-expressions
  plugins.push('@babel/plugin-proposal-throw-expressions')

  // https://babeljs.io/docs/en/next/babel-plugin-proposal-unicode-property-regex
  plugins.push('@babel/plugin-proposal-unicode-property-regex')

  return preset
}
