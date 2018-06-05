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

// http://eslint.org/docs/rules/#variables
module.exports = {
  rules: {
    // This rule is aimed at enforcing or eliminating variable initializations
    // during declaration.
    'init-declarations': 'off',

    // This rule is aimed at preventing unexpected behavior in your program that
    // may arise from a bug in IE 8 and earlier, in which the catch clause
    // parameter can leak into outer scopes. This rule will warn whenever it
    // encounters a catch clause parameter that has the same name as a variable
    // in an outer scope.
    'no-catch-shadow': 'off',

    // This rule disallows the use of the delete operator on variables.
    'no-delete-var': 'error',

    // This rule aims to create clearer code by disallowing the bad practice of
    // creating a label that shares a name with a variable that is in scope.
    // Note: This is not a problem when using a good syntax highlighting and
    // color scheme: https://github.com/borela/naomi
    'no-label-var': 'off',

    // This rule allows you to specify global variable names that you don’t want
    // to use in your application.
    'no-restricted-globals': 'off',

    // This rule aims to eliminate shadowed variable declarations.
    'no-shadow': 'off',

    // Value properties “NaN”, “Infinity” and “undefined” of the Global Object
    // as well as strict mode restricted identifiers eval and arguments are
    // considered to be restricted names in JavaScript.
    'no-shadow-restricted-names': 'error',

    // This rule can help you locate potential reference errors resulting from
    // misspellings of variable and parameter names, or accidental implicit
    // globals.
    'no-undef': 'warn',

    // This rule aims to eliminate variable declarations that initialize to
    // undefined.
    'no-undef-init': 'off',

    // This rule aims to eliminate the use of “undefined”, and as such,
    // generates a warning whenever it is used.
    'no-undefined': 'off',

    // This rule is aimed at eliminating unused variables, functions, and
    // parameters of functions.
    'no-unused-vars': ['warn', {
      args: 'none',
      vars: 'all',
    }],

    // This rule will warn when it encounters a reference to an identifier that
    // has not yet been declared.
    'no-use-before-define': 'error',
  },
}
