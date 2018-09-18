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

import {babelTransformPlugin} from '../../../modules'
import {getSettings} from '../../../settings'
import {isProduction} from '../../../utils'

export default function (plugins) {
  let {jsx, react} = getSettings()
  if (!react)
    return

  // Transform JSX into “React.createElement()” calls.
  if (jsx)
    plugins.push(babelTransformPlugin('react-jsx'))

  // Add display name attribute to React classes created by calling
  // “React.createClass()” or “createReactClass()”.
  plugins.push(babelTransformPlugin('react-display-name'))

  // Plugins used during development only.
  if (!isProduction()) {
    // Add “__self” property to JSX elements which React will use to generate
    // runtime warnings.
    plugins.push(babelTransformPlugin('react-jsx-self'))

    // Add “__source” property to JSX elements containing the file and line
    // number used to enhance error messages.
    plugins.push(babelTransformPlugin('react-jsx-source'))
  }
}
