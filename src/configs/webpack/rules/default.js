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

import {
  getProjectDir,
  TOOLBOX_DIR,
} from '../../../paths'

import {isPathSubDirOf} from '../../../utils'
import {relative, sep} from 'path'

const PROJECT_DIR = getProjectDir()

/**
 * Calculate the file path for the loaded asset.
 */
function fileName(file) {
  let prefix = null
  let reference = null

  if (isPathSubDirOf(file, PROJECT_DIR)) {
    // Assets from the target project.
    prefix = []
    reference = PROJECT_DIR
  } else if (isPathSubDirOf(file, TOOLBOX_DIR)) {
    // Assets from the Toolbox.
    prefix = ['borela-js-toolbox']
    reference = TOOLBOX_DIR
  }

  const RELATIVE = relative(reference, file)
  let nodes = RELATIVE.split(sep)

  if (nodes[0] === 'src')
    nodes.shift()

  if (prefix.length > 0)
    nodes = [...prefix, ...nodes]

  return `${nodes.join('/')}?[sha512:hash:base64:8]`
}

export default function () {
  return {
    exclude: [
      /\.css$/,
      /\.html$/,
      /\.jsx?$/,
      /\.mjs$/,
      /\.tsx?$/,
    ],
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
