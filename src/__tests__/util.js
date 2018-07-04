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

import {noFalsyProps} from '../util'

const NO_FALSY = {a: 1, b: 2, c: 3}

describe('noFalsyProps()', () => {
  test.each([
    [NO_FALSY, NO_FALSY],
    [{d: false, ...NO_FALSY}, NO_FALSY],
    [{d: 0, ...NO_FALSY}, NO_FALSY],
    [{d: '', ...NO_FALSY}, NO_FALSY],
    [{d: null, ...NO_FALSY}, NO_FALSY],
    [{d: undefined, ...NO_FALSY}, NO_FALSY],
    [{d: NaN, ...NO_FALSY}, NO_FALSY],
  ])('Returns a new object without the falsy props', (a, expected) => {
    let b = noFalsyProps(a)
    expect(b).not.toBe(a)
    expect(noFalsyProps(a)).toEqual(expected)
  })
})
