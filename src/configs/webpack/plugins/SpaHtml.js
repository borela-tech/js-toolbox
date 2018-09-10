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
import parse from 'posthtml-parser'
import validateOptions from 'schema-utils'
import {readFileSync} from 'fs'
import prettyFormat from 'pretty-format'

let log = debug('bb:config:webpack:plugin:html')
const PLUGIN_NAME = 'SPA HTML Plugin'

/**
 * This schema is used to validate the plugin’s options, right now, all it does
 * is requiring the template property.
 */
const OPTIONS_SCHEMA = {
  additionalProperties: false,
  type: 'object',
  properties: {
    template: {
      type: 'string',
    },
  },
  required: ['template'],
}

/**
 * Actual Webpack plugin that generates an HTML from a template, add the script
 * bundles and and loads any local assets referenced in the code.
 */
export default class SpaHtml {
  /**
   * Options passed to the plugin.
   */
  options = undefined

  /**
   * Contains the HTML source.
   */
  source = 'test'

  constructor(options) {
    this.options = options
    validateOptions(OPTIONS_SCHEMA, this.options, PLUGIN_NAME)
  }

  apply(compiler) {
    compiler.hooks.make.tapAsync(PLUGIN_NAME, this.tapMake.bind(this))
    compiler.hooks.emit.tapAsync(PLUGIN_NAME, this.tapEmit.bind(this))
  }

  async tapEmit(compilation, done) {
    // Add the template to the dependencies to trigger a rebuild on change in
    // watch mode.
    compilation.fileDependencies.add(this.options.template)

    // Emit the final HTML.
    compilation.assets['index.html'] = {
      source: () => this.source,
      size: () => this.source.length,
    }

    done()
  }

  async tapMake(compilation, done) {
    this.source = readFileSync(this.options.template, 'utf8')
    let ast = parse(this.source)
    done()
  }
}
