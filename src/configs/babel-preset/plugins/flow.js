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

import {babelSyntaxPlugin, babelTransformPlugin} from '../../../modules'
import {getSettings} from '../../toolbox'

export default function (plugins) {
  let {commentFlow, flow, removeFlow} = getSettings()

  // Parse Flow annoations.
  if (flow || commentFlow || removeFlow)
    plugins.push(babelSyntaxPlugin('flow'))

  // Comment Flow annotations.
  if (commentFlow)
    plugins.push(babelTransformPlugin('flow-comments'))

  // Remove Flow annotations.
  if (removeFlow)
    plugins.push(babelTransformPlugin('flow-strip-types'))
}
