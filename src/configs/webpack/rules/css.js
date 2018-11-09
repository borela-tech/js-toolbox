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

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import pluginAutoPrefixer from 'autoprefixer'

/**
 * Generate a config to load CSS.
 *
 * @param storeState
 * CLI’s current state.
 */
export default function (storeState) {
  let {
    command,
    options: {disableSourceMaps},
  } = storeState

  let rootLoader = 'style-loader'
  let rootOptions = {sourceMap: !disableSourceMaps}

  if (command !== 'serve') {
    rootLoader = MiniCssExtractPlugin.loader
    rootOptions = undefined
  }

  return {
    exclude: /\.module\.css$/,
    test: /\.css$/,
    use: [{
      loader: rootLoader,
      options: rootOptions,
    }, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: !disableSourceMaps,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        plugins: [pluginAutoPrefixer],
        sourceMap: !disableSourceMaps,
      },
    }],
  }
}
