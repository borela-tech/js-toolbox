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

import {getSettings} from '../../../settings'
import pluginAutoPrefixer from 'autoprefixer'

let {disableSourceMaps} = getSettings()

export default function () {
  return {
    test: /\.module\.css$/,
    use: [{
      loader: 'style-loader',
      options: {sourceMap: !disableSourceMaps},
    }, {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: '[local]---[name]---[hash:base64]',
        modules: true,
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
