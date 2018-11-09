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

/**
 * Calculate the file path for the loaded asset.
 */
export function fileName(storeState) {
  return function (file) {
    let {
      directories: {
        target: PROJECT_DIR,
        toolbox: TOOLBOX_DIR,
      }
    } = storeState

    let prefix = null
    let reference = null

    if (isSubPathOf(file, PROJECT_DIR)) {
      // Assets from the target project.
      prefix = []
      reference = PROJECT_DIR
    } else if (isSubPathOf(file, TOOLBOX_DIR)) {
      // Assets from the Toolbox.
      prefix = ['__borela__']
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
}

/**
 * Returns true if “path” is subpath of “parent”.
 */
export function isSubPathOf(path, parent) {
  let result = relative(parent, path)

  // Returns an empty string when “parent” is the same as the “path”.
  if (!result)
    return false

  // Windows: If the result is an absolute path, this means that paths are on
  // different drive letters.
  if (isAbsolute(result))
    return false

  return !result.startsWith('..')
}

export default function (storeState) {
  return {
    exclude: [
      /\.css$/,
      /\.html$/,
      /\.jsx?$/,
      /\.mjs$/,
      /\.pug$/,
      /\.tsx?$/,
    ],
    use: [{
      loader: 'url-loader',
      options: {
        fallback: 'file-loader',
        limit: 1024,
        name: fileName(storeState),
      },
    }],
  }
}
