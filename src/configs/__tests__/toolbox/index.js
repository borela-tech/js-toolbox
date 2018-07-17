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
  jest.doMock('../../../paths', () => ({
    CTRINE_JS: join(FIXTURES_PATH, fixture, 'ctrine.js'),
    CTRINE_JSON: join(FIXTURES_PATH, fixture, 'ctrine.json'),
    PACKAGE_JSON: join(FIXTURES_PATH, fixture, 'package.json'),
  }))
}

function stubEnv(env = {}) {
  beforeEach(() => {
    const ORIGINAL = process.env
    Object.defineProperty(process, 'env', {
      get: () => ({
        ...ORIGINAL,
        ctrine: JSON.stringify(env),
      })
    })
  })
}

afterEach(() => {
  jest.restoreAllMocks()
  jest.resetModules()
})

describe('getSettings()', () => {
  describe('Clean env', () => {
    stubEnv()

    test('load settings from “package.json”', () => {
      setFixture('package-json')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 1,
        bar: 1,
        baz: 1,
        fooBar: 1,
        fooBarBaz: 1,
        fooBarBazQux: 1,
      })
    })

    test('load settings from “ctrine.json”', () => {
      setFixture('ctrine-json')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 2,
        bar: 2,
        baz: 2,
        fooBar: 2,
        fooBarBaz: 2,
        fooBarBazQux: 2,
      })
    })

    test('load settings from “ctrine.js”', () => {
      setFixture('ctrine-js')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 3,
        bar: 3,
        baz: 3,
        fooBar: 3,
        fooBarBaz: 3,
        fooBarBazQux: 3,
      })
    })

    test('load combined settings', () => {
      setFixture('combined')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 1,
        bar: 2,
        baz: 3,
        fooBar: 1,
        fooBarBaz: 2,
        fooBarBazQux: 3,
      })
    })
  })

  describe('Settings on env too', () => {
    stubEnv({
      foo: 42,
      'foo-bar': 42,
      fooBarBaz: 42,
    })

    test('Only env', () => {
      setFixture('env')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 42,
        fooBar: 42,
        fooBarBaz: 42,
      })
    })

    test('load settings from “package.json”', () => {
      setFixture('package-json')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 42,
        bar: 1,
        baz: 1,
        fooBar: 42,
        fooBarBaz: 42,
        fooBarBazQux: 1,
      })
    })

    test('load settings from “ctrine.js”', () => {
      setFixture('ctrine-js')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 42,
        bar: 3,
        baz: 3,
        fooBar: 42,
        fooBarBaz: 42,
        fooBarBazQux: 3,
      })
    })

    test('load combined settings', () => {
      setFixture('combined')
      let {getSettings} = require('../../toolbox')
      expect(getSettings()).toEqual({
        foo: 42,
        bar: 2,
        baz: 3,
        fooBar: 42,
        fooBarBaz: 42,
        fooBarBazQux: 3,
      })
    })
  })
})
