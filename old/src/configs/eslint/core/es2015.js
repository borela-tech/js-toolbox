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

// http://eslint.org/docs/rules/#ecmascript-6
module.exports = {
  rules: {
    // This rule can enforce or disallow the use of braces around arrow function
    // body.
    'arrow-body-style': ['error', 'as-needed'],

    // This rule enforces parentheses around arrow function parameters
    // regardless of arity.
    'arrow-parens': ['error', 'as-needed'],

    // This rule normalize style of spacing before/after “=>”.
    'arrow-spacing': ['error', {
      after: true,
      before: true,
    }],

    // This rule is aimed to flag invalid/missing “super” calls.
    'constructor-super': 'error',

    // His rule aims to enforce spacing around the “*” of generator functions.
    'generator-star-spacing': ['error', {
      after: true,
      before: true,
    }],

    // This rule is aimed to flag modifying variables of class declarations.
    'no-class-assign': 'error',

    // Arrow functions “=>” are similar in syntax to some comparison operators.
    // Note: This is preventable with a good syntax highlighting and color
    // scheme: https://github.com/borela/naomi
    'no-confusing-arrow': 'off',

    // This rule is aimed to flag modifying variables that are declared using
    // “const” keyword.
    'no-const-assign': 'error',

    // This rule is aimed to flag the use of duplicate names in class members.
    'no-dupe-class-members': 'error',

    // This rules requires that all imports from a single module exists in a
    // sinhle import statement.
    'no-duplicate-imports': 'error',

    // This rule is aimed at preventing the accidental calling of “Symbol” with
    // the “new” operator.
    'no-new-symbol': 'error',

    // This rule allows you to specify imports that you don’t want to use in
    // your application.
    'no-restricted-imports': 'off',

    // This rule is aimed to flag “this” and “super” keywords before “super()”
    // callings.
    'no-this-before-super': 'error',

    // This rule disallows unnecessary usage of computed property keys.
    'no-useless-computed-key': 'error',

    // This rule flags class constructors that can be safely removed without
    // changing how the class works.
    'no-useless-constructor': 'error',

    // This rule disallows the renaming of import, export, and destructured
    // assignments to the same name.
    'no-useless-rename': 'error',

    // This rule is aimed at discouraging the use of “var” and encouraging the
    // use of “const” or “let” instead.
    'no-var': 'error',

    // This rule enforces the use of the shorthand syntax.
    'object-shorthand': 'error',

    // This rule is aimed to flag usage of function expressions in an argument
    // list.
    'prefer-arrow-callback': 'error',

    // This rule is aimed at flagging variables that are declared using “let”,
    // but never reassigned after the initial assignment.
    'prefer-const': 'off',

    // This rule enforces usage of destructuring instead of accessing a property
    // through a member expression.
    'prefer-destructuring': 'off',

    // This rule disallows “parseInt()” if it is called with two arguments: a
    // string and a radix option of 2 (binary), 8 (octal), or 16 (hexadecimal).
    'prefer-numeric-literals': 'error',

    // This rule is aimed to flag usage of arguments variables.
    'prefer-rest-params': 'error',

    // This rule is aimed to flag usage of “Function.prototype.apply()” in
    // situations where the spread operator could be used instead.
    'prefer-spread': 'error',

    // This rule is aimed to flag usage of “+” operators with strings.
    'prefer-template': 'error',

    // This rule generates warnings for generator functions that do not have the
    // “yield” keyword.
    'require-yield': 'error',

    // This rule aims to enforce consistent spacing between rest and spread
    // operators and their expressions.
    'rest-spread-spacing': ['error', 'never'],

    // This rule checks all import declarations and verifies that all imports
    // are first sorted by the used member syntax and then alphabetically by the
    // first member or alias name.
    'sort-imports': 'off',

    // This rules requires a description when creating symbols.
    'symbol-description': 'error',

    // This rule aims to maintain consistency around the spacing inside of
    // template literals.
    'template-curly-spacing': ['error', 'never'],

    // This rule enforces spacing around the “*” in “yield*” expressions.
    'yield-star-spacing': ['error', {
      after: true,
      before: true,
    }],
  },
}
