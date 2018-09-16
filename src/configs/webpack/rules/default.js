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

import {relative, sep} from 'path'
import {getProjectDir} from '../../../paths'

const PROJECT_DIR = getProjectDir()

function fileName(file) {
  const RELATIVE = relative(PROJECT_DIR, file)
  let nodes = RELATIVE.split(sep)

  if (nodes[0] === 'src')
    nodes.shift()

  return `${nodes.join('/')}?[sha512:hash:base64:8]`
}

export default function () {
  return {
    exclude: /\.(css|jsx?|mjs)$/,
    use: [{
      loader: 'url-loader',
      options: {
        fallback: 'file-loader',
        limit: 1024,
        name: fileName,
      },
    }],
  }
}
