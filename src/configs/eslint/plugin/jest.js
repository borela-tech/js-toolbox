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

// https://github.com/jest-community/eslint-plugin-jest#rules
module.exports = {
  plugins: ['eslint-plugin-jest'],
  rules: {
    // Jest allows you to choose how you want to define your tests, using the
    // “it” or the “test” keywords, with multiple permutations for each one,
    // this rule gives you control over the usage of these keywords in your
    // codebase.
    'jest/consistent-test-it': 'off',

    // Enforce it, test and describe to have descriptions that begin with a
    // lowercase letter.
    'jet/lowercase-name': 'off',

    // This rule reminds you to remove “.skip” or the “x” prefix from your
    // tests.
    'jest/no-disabled-tests': 'warn',

    // This rule reminds you to remove “.only” from your tests by raising a
    // warning whenever you are using the exclusivity feature.
    'jest/no-focused-tests': 'warn',

    // Having identical titles for two different tests or test suites may create
    // confusion.
    'jest/no-identical-title': 'off',

    // Jest uses jasmine as a test runner. A side effect of this is that both a
    // jasmine object, and some jasmine-specific globals, are exposed to the
    // test environment. Most functionality offered by Jasmine has been ported
    // to Jest, and the Jasmine globals will stop working in the future.
    'jest/no-jasmine-globals': 'error',

    // The jest object is automatically in scope within every test file. The
    // methods in the jest object help create mocks and let you control Jest’s
    // overall behavior. It is therefore completely unnecessary to import in
    // jest, as Jest doesn’t export anything in the first place.
    'jest/no-jest-import': 'error',

    // When using Jest's snapshot capability one should be mindful of the size
    // of created snapshots. As a best practice snapshots should be limited in
    // size in order to be more manageable and reviewable. A stored snapshot is
    // only as good as its review and as such keeping it short, sweet, and
    // readable is important to allow for thorough reviews.
    'jest/no-large-snapshots': 'warn',

    // Jest allows you to choose how you want to define focused and skipped
    // tests, with multiple permutations for each. This rule enforces “only” and
    // “skip” be used.
    'jest/no-test-prefixes': 'error',

    // Ensure every test to have either “expect.assertions()” or
    // “expect.hasAssertions()” as its first expression.
    'jest/prefer-expect-assertions': 'error',

    // In order to have a better failure message, “toBeNull()” should be used
    // upon asserting expections on null value.
    'jest/prefer-to-be-null': 'error',

    // In order to have a better failure message, “toBeUndefined()” should be
    // used upon asserting expections on undefined value.
    'jest/prefer-to-be-undefined': 'error',

    // In order to have a better failure message, “toHaveLength()” should be
    // used upon asserting expectations on object's length property.
    'jest/prefer-to-have-length': 'error',

    // Using an improper “describe()” callback function can lead to unexpected
    // test errors.
    'jest/valid-describe': 'error',

    // Ensure “expect()” is called with a single argument and there is an actual
    // expectation made.
    'jest/valid-expect': 'error',

    // Ensure to return promise when having assertions in then or catch block of
    // promise.
    'jest/valid-expect-in-promise': 'off',
  },
}
