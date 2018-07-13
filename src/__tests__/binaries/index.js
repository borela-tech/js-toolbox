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

import {join} from 'path'

const FIXTURE_PATH = join(__dirname, '__fixture__')

jest.doMock('../../paths', () => ({
  BIN_DIR: FIXTURE_PATH,
}))

function stubPlatform(platform) {
  beforeEach(() => {
    Object.defineProperty(process, 'platform', {
      get: () => platform,
    })
  })
}

describe('Binary helpers', () => {
  describe.each([
    ['win32', 'foo', join(FIXTURE_PATH, 'foo.cmd')],
    ['linux', 'foo', join(FIXTURE_PATH, 'foo')],
  ])('Binary exists', (platform, bin, path) => {
    stubPlatform(platform)

    describe('assertBinaryExists()', () => {
      test('Do nothing', () => {
        let {assertBinaryExists} = require('../../binaries')
        assertBinaryExists(bin)
      })
    })

    describe('getBinaryPath()', () => {
      test('Returns the full path', () => {
        let {getBinaryPath} = require('../../binaries')
        expect(getBinaryPath(bin)).toBe(path)
      })
    })
  })

  describe.each([
    ['win32', 'bar', join(FIXTURE_PATH, 'bar.cmd')],
    ['linux', 'bar', join(FIXTURE_PATH, 'bar')],
  ])('Binary does not exist', (platform, bin, path) => {
    stubPlatform(platform)

    describe('assertBinaryExists()', () => {
      test('Throws an exception', () => {
        let {assertBinaryExists} = require('../../binaries')
        expect(() => assertBinaryExists(bin)).toThrow()
      })
    })

    describe('getBinaryPath()', () => {
      test('Returns the full path', () => {
        let {getBinaryPath} = require('../../binaries')
        expect(getBinaryPath(bin)).toBe(path)
      })
    })
  })
})
