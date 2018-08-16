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

const FIXTURES_PATH = join(__dirname, '__fixtures__')

function setFixture(fixture) {
  jest.doMock('../../paths', () => ({
    getPackageDir() {
      return join(FIXTURES_PATH, fixture)
    },
  }))
}

function stubEnv(env = {}) {
  const ORIGINAL = process.env

  afterEach(() => {
    Object.defineProperty(process, 'env', {
      get: () => ORIGINAL,
    })
  })

  beforeEach(() => {
    Object.defineProperty(process, 'env', {
      get: () => env,
    })
  })
}

afterEach(() => {
  jest.restoreAllMocks()
  jest.resetModules()
})

const PACKAGE_JSON_CONTENTS = {
  foo: 1,
  bar: 1,
  baz: 1,
  fooBar: 1,
}

const BORELARC_CONTENTS = {
  bar: 2,
  baz: 2,
  fooBar: 2,
}

const BORELA_JSON_CONTENTS = {
  baz: 3,
  fooBbar: 3,
}

test('“PACKAGE_JSON” has the borela key inside the “package.json”', () => {
  setFixture('package-json')
  const {PACKAGE_JSON} = require('../../settings')
  expect(PACKAGE_JSON).toEqual(PACKAGE_JSON_CONTENTS)
})

test('“BORELARC” has the contents of the “borelarc”', () => {
  setFixture('borelarc')
  const {BORELARC} = require('../../settings')
  expect(BORELARC).toEqual(BORELARC_CONTENTS)
})

test('“BORELA_JSON” has the contents of the “borela.json”', () => {
  setFixture('borela-json')
  const {BORELA_JSON} = require('../../settings')
  expect(BORELA_JSON).toEqual(BORELA_JSON_CONTENTS)
})

describe('CLI_ENV', () => {
  stubEnv({
    TEMP_BORELA_JS_TOOLBOX: JSON.stringify({
      foo: true,
      fooBar: 42,
      fooBarBaz: 'Lorem ipsum.',
    }),
  })

  test('It has the combined object from env vars', () => {
    const {CLI_ENV} = require('../../settings')
    expect(CLI_ENV).toEqual({
      foo: true,
      fooBar: 42,
      fooBarBaz: 'Lorem ipsum.',
    })
  })
})
