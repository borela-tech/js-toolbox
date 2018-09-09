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

import debug from 'debug'
import {readFileSync} from 'fs'

let log = debug('bb:config:webpack:plugin:html')
const PLUGIN_NAME = 'Borela JS Toolbox | HTML Plugin'

export default class SpaHtml {
  constructor(options = {}) {
    this.options = options
    this.source = readFileSync(options.template, 'utf8')
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      PLUGIN_NAME,
      this.emit.bind(this),
    )
  }

  async emit(compilation, done) {
    compilation.assets['index.html'] = {
      source: () => this.source,
      size: () => this.source.length,
    }
    done()
  }
}
