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

// http://eslint.org/docs/rules/#possible-errors
module.exports = {
  rules: {
    // A for loop with a stop condition that can never be reached, such as one
    // with a counter that moves in the wrong direction, will run infinitely.
    // While there are occasions when an infinite loop is intended, the
    // convention is to construct such loops as while loops. More typically, an
    // infinite for loop is a bug.
    'for-direction': 'off',

    // This rule enforces that a return statement is present in property
    // getters.
    'getter-return': ['error'],

    // Performing an operation on each element of an iterable is a common task.
    // However, performing an await as part of each operation is an indication
    // that the program is not taking full advantage of the parallelization
    // benefits of async/await
    'no-await-in-loop': 'off',

    // The rule should warn against code that tries to compare against -0, since
    // that will not work as intended. That is, code like x === -0 will pass for
    // both +0 and -0. The author probably intended Object.is(x, -0).
    'no-compare-neg-zero': 'error',

    // This rule disallows ambiguous assignment operators in test conditions of
    // if, for, while, and do...while statements.
    'no-cond-assign': 'error',

    // This rule disallows calls to methods of the console object.
    'no-console': 'off',

    // A constant expression (for example, a literal) as a test condition might
    // be a typo or development trigger for a specific behavior.
    'no-constant-condition': 'warn',

    // This rule disallows control characters in regular expressions. Control
    // characters are special, invisible characters in the ASCII range 0-31.
    'no-control-regex': 'off',

    // The debugger statement is used to tell the executing JavaScript
    // environment to stop execution and start up a debugger at the current
    // point in the code. This has fallen out of favor as a good practice with
    // the advent of modern debugging and development tools. Production code
    // should definitely not contain debugger, as it will cause the browser to
    // stop executing code and open an appropriate debugger.
    'no-debugger': 'error',

    // If more than one parameter has the same name in a function definition,
    // the last occurrence “shadows” the preceding occurrences. A duplicated
    // name might be a typing error.
    'no-dupe-args': 'error',

    // Multiple properties with the same key in object literals can cause
    // unexpected behavior in your application.
    'no-dupe-keys': 'error',

    // If a switch statement has duplicate test expressions in case clauses,
    // it is likely that a programmer copied a case clause but forgot to change
    // the test expression.
    'no-duplicate-case': 'error',

    // This rule disallows empty block statements. This rule ignores block
    // statements which contain a comment (for example, in an empty catch or
    // finally block of a try statement to indicate that execution should
    // continue regardless of errors).
    'no-empty': 'error',

    // Empty character classes in regular expressions do not match anything,
    // they might be typing mistakes.
    'no-empty-character-class': 'error',

    // If a catch clause in a try statement accidentally (or purposely) assigns
    // another value to the exception parameter, it impossible to refer to the
    // error from that point on. Since there is no arguments object to offer
    // alternative access to this data, assignment of the parameter is
    // absolutely destructive.
    'no-ex-assign': 'error',

    // In contexts such as an if statement’s test where the result of the
    // expression will already be coerced to a Boolean, casting to a Boolean via
    // double negation (!!) or a Boolean call is unnecessary.
    'no-extra-boolean-cast': 'error',

    // This rule restricts the use of parentheses to only where they are
    // necessary.
    'no-extra-parens': [
      'error',
      'all', {
        ignoreJSX: 'multi-line',
        nestedBinaryExpressions: false,
      },
    ],

    // Typing mistakes and misunderstandings about where semicolons are
    // required can lead to semicolons that are unnecessary. While not
    // technically an error, extra semicolons can cause confusion when reading
    // code.
    'no-extra-semi': 'error',

    // This rule disallows reassigning function declarations.
    'no-func-assign': 'error',

    // This rule requires that function declarations and, optionally, variable
    // declarations be in the root of a program or the body of a function.
    'no-inner-declarations': 'off',

    // This rule disallows invalid regular expression strings in RegExp
    // constructors.
    'no-invalid-regexp': 'error',

    // This rule is aimed at catching invalid whitespace that is not a normaal
    // tab and space. Some of these characters may cause issues in modern
    // browsers and others will be a debugging issue to spot.
    'no-irregular-whitespace': [
      'error', {
        skipComments: false,
        skipRegExps: false,
        skipStrings: false,
        skipTemplates: false,
      },
    ],

    // This rule disallows calling the Math, JSON and Reflect objects as
    // functions.
    'no-obj-calls': 'error',

    // In ECMAScript 5.1, “Object.create” was added, which enables the creation
    // of objects with a specified [[Prototype]]. “Object.create(null)” is a
    // common pattern used to create objects that will be used as a Map. This
    // can lead to errors when it is assumed that objects will have properties
    // from “Object.prototype”. This rule prevents calling “Object.prototype”
    // methods directly from an object.
    'no-prototype-builtins': 'error',

    // This rule disallows multiple spaces in regular expression literals.
    'no-regex-spaces': 'off',

    // This rule disallows sparse array literals which have “holes” where commas
    // are not preceded by elements. It does not apply to a trailing comma
    // following the last element.
    'no-sparse-arrays': 'off',

    // This rule aims to warn when a regular string contains what looks like a
    // template literal placeholder. It will warn when it finds a string
    // containing the template literal place holder (${something}) that uses
    // either " or ' for the quotes.
    'no-template-curly-in-string': 'off',

    // This rule disallows confusing multiline expressions where a newline looks
    // like it is ending a statement, but is not.
    'no-unexpected-multiline': 'error',

    // This rule disallows unreachable code after return, throw, continue, and
    // break statements.
    'no-unreachable': 'warn',

    // JavaScript suspends the control flow statements of try and catch blocks
    // until the execution of finally block finishes. So, when return, throw,
    // break, or continue is used in finally, control flow statements inside try
    // and catch are overwritten, which is considered as unexpected behavior.
    'no-unsafe-finally': 'off',

    // This rule disallows negating the left operand of Relational Operators.
    'no-unsafe-negation': 'error',

    // This rule disallows comparisons to ‘NaN’ because it is unique in
    // JavaScript by not being equal to anything, including itself, the results
    // of comparisons to NaN are confusing.
    'use-isnan': 'error',

    // This rule enforces valid and consistent JSDoc comments.
    'valid-jsdoc': 'off',

    // For a vast majority of use cases, the result of the typeof operator is
    // one of the following string literals: "undefined", "object", "boolean",
    // "number", "string", "function" and "symbol". It is usually a typing
    // mistake to compare the result of a typeof operator to other string
    // literals.
    'valid-typeof': 'error',
  },
}
