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

const FIXTURE = join(__dirname, '__fixture__')
const FOO = join(FIXTURE, 'foo')
const FOO_PACKAGE = join(FIXTURE, 'foo-package')
const FOO_BAR = join(FIXTURE, 'foo', 'bar')
const FOO_BAR_PACKAGE = join(FIXTURE, 'foo', 'bar-package')
const FOO_BAR_PACKAGE_BAZ = join(FIXTURE, 'foo', 'bar-package', 'baz')

// The “getProjectDir” function should try to find the nearest package directory
// based on the current CWD. If the current directory does not contain a
// “package.json” file, search the parent directory until one is found.
describe.each([
  [FIXTURE, FIXTURE],
  [FOO, FIXTURE],
  [FOO_PACKAGE, FOO_PACKAGE],
  [FOO_BAR, FIXTURE],
  [FOO_BAR_PACKAGE, FOO_BAR_PACKAGE],
  [FOO_BAR_PACKAGE_BAZ, FOO_BAR_PACKAGE],
])('Different values for “process.cwd”', (cwd, root) => {
  beforeEach(() => {
    jest.spyOn(process, 'cwd').mockImplementation(() => cwd)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    jest.resetModules()
  })

  describe('getProjectDir()', () => {
    test('It has the package’s root', () => {
      const {getProjectDir} = require('../../paths')
      expect(getProjectDir()).toBe(root)
    })
  })

  describe('getTargetDir()', () => {
    test('It has the process’s cwd and then the set target dir', () => {
      const {getTargetDir, setTargetDir} = require('../../paths')

      expect(getTargetDir()).toBe(cwd)

      setTargetDir('foo')
      expect(getTargetDir()).toBe('foo')

      setTargetDir('bar')
      expect(getTargetDir()).toBe('bar')

      setTargetDir('baz')
      expect(getTargetDir()).toBe('baz')
    })
  })
})
