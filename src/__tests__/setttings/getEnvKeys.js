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

import {getEnvFlags} from '../../settings'

const ORIGINAL = process.env

describe('getEnvFlags()', () => {
  test('Returns the flags camelized', () => {
    Object.defineProperty(process, 'env', {
      get: () => ({
        ...ORIGINAL,
        // Wrong format, ignored keys.
        _BORELA_JS_TOOLBOX: 42,
        _BORELA_JS_TOOLBOX_: 42,
        BORELA_JS_TOOLBOX_: 42,
        TEMP_BORELA_JS_TOOLBOX: 42,
        // Correct format.
        BORELA_JS_TOOLBOX_1: 1,
        BORELA_JS_TOOLBOX_FOO: 2,
        BORELA_JS_TOOLBOX_FOO_BAR: 3,
      }),
    })
    expect(getEnvFlags()).toEqual({1: 1, foo: 2, fooBar: 3})
  })
})
