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

import shared from './shared'
import {getPackageDir} from '../../paths'
import {BannerPlugin} from 'webpack'
import {join} from 'path'

export default function () {
  let config = shared()

  config.output = {
    ...config.output,
    path: join(config.output.path, 'node'),
  }

  // Exclude any non relative imports.
  config.externals = /^[a-z\-0-9]+$/

  // Include the shebang.
  config.plugins.push(new BannerPlugin({
    banner: '#!/usr/bin/env node',
    raw: true,
  }))

  config.target = 'node'
  return [config]
}
