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

function stubPackageDir(dir) {
  jest.doMock('../../paths', () => ({PACKAGE_DIR: dir}))
}

let logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined)
let processSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined)

afterEach(() => {
  logSpy.mockClear()
  processSpy.mockClear()
  jest.resetModules()
})

afterAll(() => {
  logSpy.mockRestore()
  processSpy.mockRestore()
})

describe('exitOnPackageNotFound()', () => {
  test('Do nothing', () => {
    stubPackageDir('foo')
    const {exitOnPackageNotFound} = require('../../util')
    exitOnPackageNotFound()
    expect(logSpy).not.toHaveBeenCalled()
    expect(processSpy).not.toHaveBeenCalled()
  })

  test('Call console and exit with error', () => {
    stubPackageDir(undefined)
    const {exitOnPackageNotFound} = require('../../util')
    exitOnPackageNotFound()
    expect(logSpy).toHaveBeenCalled()
    expect(processSpy).toHaveBeenCalledWith(1)
  })
})
