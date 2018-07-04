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

// The CLI’s current working directory is set to be the target package, this
// test makes sure we are getting the correct package root.
describe('PACKAGE_DIR', () => {
  test.each([
    [FIXTURE, FIXTURE],
    [FOO, FIXTURE],
    [FOO_PACKAGE, FOO_PACKAGE],
    [FOO_BAR, FIXTURE],
    [FOO_BAR_PACKAGE, FOO_BAR_PACKAGE],
    [FOO_BAR_PACKAGE_BAZ, FOO_BAR_PACKAGE],
  ])('It has the package’s root', (cwd, root) => {
    jest.spyOn(process, 'cwd').mockImplementation(() => cwd)

    const {PACKAGE_DIR} = require('../../paths')
    expect(PACKAGE_DIR).toBe(root)

    process.cwd.mockRestore()
    jest.resetModules()
  })
})
