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

/**
 * This schema is used to validate the plugin’s options.
 */
export default {
  additionalProperties: false,
  type: 'object',
  properties: {
    head: {
      type: 'object',
      description: 'Stuff that needs to be added to the “head” tag.',
      properties: {
        appendScripts: {
          type: 'array',
          items: {type: 'string'},
        },
      },
    },
    minify: {
      type: 'boolean',
      description: 'True if the final HTML must be minified.',
    },
    templatePath: {
      type: 'string',
      description: 'Full path to the target template.',
    },
  },
  required: ['templatePath'],
}
