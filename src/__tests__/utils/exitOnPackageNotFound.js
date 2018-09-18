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
  jest.doMock('../../paths', () => ({
    getProjectDir() {
      return dir
    },
  }))
}

const STDOUT_SPY = jest.spyOn(process.stdout, 'write')
  .mockImplementation(() => undefined)

const EXIT_SPY = jest.spyOn(process, 'exit')
  .mockImplementation(() => undefined)

afterEach(() => {
  STDOUT_SPY.mockClear()
  EXIT_SPY.mockClear()
  jest.resetModules()
})

afterAll(() => {
  STDOUT_SPY.mockRestore()
  EXIT_SPY.mockRestore()
})

describe('exitOnPackageNotFound()', () => {
  test('Do nothing', () => {
    stubPackageDir('foo')
    const {exitOnPackageNotFound} = require('../../utils')
    exitOnPackageNotFound()
    expect(STDOUT_SPY).not.toHaveBeenCalled()
    expect(EXIT_SPY).not.toHaveBeenCalled()
  })

  test('Output error and exit', () => {
    stubPackageDir(undefined)
    const {exitOnPackageNotFound} = require('../../utils')
    exitOnPackageNotFound()
    expect(STDOUT_SPY).toHaveBeenCalled()
    expect(EXIT_SPY).toHaveBeenCalledWith(1)
  })
})
