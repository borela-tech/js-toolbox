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

// http://eslint.org/docs/rules/#best-practices
module.exports = {
  rules: {
    // This rule enforces a style where it requires to have a getter for every
    // property which has a setter defined.
    'accessor-pairs': 'off',

    // This rule enforces usage of return statement in callbacks of array’s
    // methods.
    'array-callback-return': 'warn',

    // This rule aims to reduce the usage of variables outside of their binding
    // context and emulate traditional block scope from other languages. This is
    // to help newcomers to the language avoid difficult bugs with variable
    // hoisting.
    'block-scoped-var': 'error',

    // If a class method does not use this, it can safely be made a static
    // function.
    'class-methods-use-this': 'warn',

    // This rule is aimed at reducing code complexity by capping the amount of
    // cyclomatic complexity allowed in a program
    complexity: ['warn', 10],

    // This rule requires return statements to either always or never specify
    // values. It ignores function definitions where the name begins with an
    // uppercase letter because constructors, when invoked with the new
    // operator, return the instantiated object implicitly if they do not return
    // another object explicitly.
    'consistent-return': 'error',

    // This rule is aimed at preventing bugs and increasing code clarity by
    // ensuring that block statements are wrapped in curly braces. It will warn
    // when it encounters blocks that omit curly braces.
    curly: [
      'error',
      // Forces brace-less “if”, “else if”, “else”, “for”, “while” or “do” if
      // their body contains only one single-line statement. And forces braces
      // in all other cases.
      'multi-or-nest',
    ],

    // This rule aims to require default case in switch statements.
    'default-case': 'off',

    // This rule aims to enforce newline consistency in member expressions.
    'dot-location': ['error', 'property'],

    // This rule is aimed at maintaining code consistency and improving code
    // readability by encouraging use of the dot notation style whenever
    // possible.
    'dot-notation': 'error',

    // This rule is aimed at eliminating the type-unsafe equality operators.
    eqeqeq: ['error', 'always'],

    // This rule is aimed at preventing unexpected behavior that could arise
    // from using a “for in” loop without filtering the results in the loop. As
    // such, it will warn when “for in” loops do not filter their results with
    // an if statement.
    'guard-for-in': 'off',

    // This rule is aimed at catching debugging code that should be removed and
    // popup UI elements that should be replaced with less obtrusive custom UIs.
    // As such, it will warn when it encounters “alert”, “prompt”, and “confirm”
    // function calls which are not shadowed.
    'no-alert': 'warn',

    // This rule is aimed at discouraging the use of deprecated and sub-optimal
    // code, disallowing the use of arguments.caller and arguments.callee. As
    // such, it will warn when “arguments.caller” and “arguments.callee” are
    // used.
    'no-caller': 'error',

    // This rule aims to prevent access to uninitialized lexical bindings as
    // well as accessing hoisted functions across case clauses.
    'no-case-declarations': 'error',

    // This is used to disambiguate the division operator to not confuse users.
    // Note: https://github.com/borela/naomi can color the regex literals and
    // make it clear it is not a division operator.
    'no-div-regex': 'off',

    // This rule is aimed at highlighting an unnecessary block of code following
    // an if containing a return statement. As such, it will warn when it
    // encounters an “else” following a chain of “if”s, all of them containing a
    // return statement.
    'no-else-return': 'error',

    // This rule is aimed at eliminating empty functions. A function will not be
    // considered a problem if it contains a comment.
    'no-empty-function': 'error',

    // This rule aims to flag any empty patterns in destructured objects and
    // arrays, and as such, will report a problem whenever one is encountered.
    'no-empty-pattern': 'error',

    // This rule aims reduce potential bug and unwanted behavior by ensuring
    // that comparisons to “null” only match “null”, and not also “undefined”.
    // As such it will flag comparisons when using == and !=.
    'no-eq-null': 'error',

    // This rule is aimed at preventing potentially dangerous, unnecessary, and
    // slow code by disallowing the use of the “eval” function.
    'no-eval': 'warn',

    // Disallows directly modifying the prototype of builtin objects.
    'no-extend-native': 'warn',

    // This rule is aimed at avoiding the unnecessary use of “bind()”.
    'no-extra-bind': 'error',

    // This rule is aimed at eliminating unnecessary labels.
    'no-extra-label': 'error',

    // This rule is aimed at eliminating unintentional fallthrough of one case
    // to the other. Note: Some heretics might try to convince you that
    // fallthrough is bad but don’t listen to them, it is awesome!
    'no-fallthrough': 'off',

    // This rule is aimed at eliminating floating decimal points and will warn
    // whenever a numeric value has a decimal point but is missing a number
    // either before or after it. Note: The ambiguity can be solved by using a
    // good syntax highlighter and color scheme: https://github.com/borela/naomi
    'no-floating-decimal': 'off',

    // This rule disallows modifications to read-only global variables.
    'no-global-assign': 'error',

    // This rule is aimed to flag shorter notations for the type conversion,
    // then suggest a more self-explanatory notation.
    'no-implicit-coercion': 'off',

    // This rule disallows var and named function declarations at the top-level
    // script scope. This does not apply to ES and CommonJS modules since they
    // have a module scope.
    'no-implicit-globals': 'off',

    // This rule aims to eliminate implied “eval()” through the use of
    // “setTimeout()”, “setInterval()” or “execScript()”. As such, it will warn
    // when either function is used with a string as the first argument.
    'no-implied-eval': 'warn',

    // This rule aims to flag usage of this keywords outside of classes or
    // class-like objects.
    // 'no-invalid-this': 'off',
    'babel/no-invalid-this': 'off',

    // This rule is aimed at preventing errors that may arise from using the
    // __iterator__ property, which is not implemented in several browsers. As
    // such, it will warn whenever it encounters the __iterator__ property.
    'no-iterator': 'error',

    // This rule aims to eliminate the use of labeled statements in JavaScript.
    // It will warn whenever a labeled statement is encountered and whenever
    // break or continue are used with a label.
    'no-labels': 'off',

    // This rule aims to eliminate unnecessary and potentially confusing blocks
    // at the top level of a script or within other blocks.
    'no-lone-blocks': 'error',

    // This error is raised to highlight a piece of code that may not work as
    // you expect it to and could also indicate a misunderstanding of how the
    // language works. Your code may run without any problems if you do not fix
    // this error, but in some situations it could behave unexpectedly.
    'no-loop-func': 'off',

    // This rule aims to make code more readable and refactoring easier by
    // ensuring that special numbers are declared as constants to make their
    // meaning explicit.
    'no-magic-numbers': 'off',

    // This rule aims to disallow multiple whitespace around logical
    // expressions, conditional expressions, declarations, array elements,
    // object properties, sequences and function parameters.
    'no-multi-spaces': 'error',

    // This rule is aimed at preventing the use of multiline strings.
    'no-multi-str': 'off',

    // This rule is aimed at maintaining consistency and convention by
    // disallowing constructor calls using the new keyword that do not assign
    // the resulting object to a variable.
    'no-new': 'error',

    // This error is raised to highlight the use of a bad practice. By passing a
    // string to the Function constructor, you are requiring the engine to parse
    // that string much in the way it has to when you call the eval function.
    'no-new-func': 'off',

    // This rule aims to eliminate the use of “String”, “Number”, and “Boolean”
    // with the “new” operator. As such, it warns whenever it sees “new String”,
    // “new Number” or “new Boolean”.
    'no-new-wrappers': 'error',

    // Because the leading zero which identifies an octal literal has been a
    // source of confusion and error in JavaScript code, ECMAScript 5 deprecates
    // the use of octal numeric literals. In ES6 a new less confusing prefix
    // “0o” was added.
    'no-octal': 'error',

    // This rule disallows octal escape sequences in string literals.
    'no-octal-escape': 'error',

    // This rule aims to prevent unintended behavior caused by modification or
    // reassignment of function parameters.
    'no-param-reassign': 'off',

    // This rule aims to disallow the use of the __proto__ property as it has
    // been deprecated as of ECMAScript 3.1.
    'no-proto': 'error',

    // This rule is aimed at eliminating variables that have multiple
    // declarations in the same scope.
    'no-redeclare': 'error',

    // This rule looks for accessing a given property key on a given object
    // name, either when reading the property’s value or invoking it as a
    // function. You may specify an optional message to indicate an alternative
    // API or a reason for the restriction.
    'no-restricted-properties': 'off',

    // This rule aims to eliminate assignments from return statements. As such,
    // it will warn whenever an assignment is found as part of return.
    'no-return-assign': 'off',

    // This rule aims to prevent a likely common performance hazard due to a
    // lack of understanding of the semantics of async function.
    'no-return-await': 'error',

    // Using “javascript:” URLs is considered by some as a form of eval
    'no-script-url': 'warn',

    // This rule is aimed at eliminating self assignments.
    'no-self-assign': 'error',

    // This error is raised to highlight a potentially confusing and potentially
    // pointless piece of code.
    'no-self-compare': 'error',

    // This rule forbids the use of the comma operator, with the following
    // exceptions:
    //   * In the initialization or update portions of a for statement.
    //   * If the expression sequence is explicitly wrapped in parentheses.
    'no-sequences': 'off',

    // This rule is aimed at maintaining consistency when throwing exception by
    // disallowing to throw literals and other expressions which cannot possibly
    // be an Error object.
    'no-throw-literal': 'off',

    // This rule finds references which are inside of loop conditions, then
    // checks the variables of those references are modified in the loop.
    'no-unmodified-loop-condition': 'off',

    // This rule aims to eliminate unused expressions which have no effect on
    // the state of the program.
    // 'no-unused-expressions': 'error',
    'babel/no-unused-expressions': 'warn',

    // This rule is aimed at eliminating unused labels.
    'no-unused-labels': 'error',

    // This rule is aimed to flag usage of “Function.prototype.call()” and
    // “Function.prototype.apply()” that can be replaced with the normal
    // function invocation.
    'no-useless-call': 'error',

    // This rule aims to flag the concatenation of 2 literals when they could be
    // combined into a single literal.
    'no-useless-concat': 'off',

    // This rule flags escapes that can be safely removed without changing
    // behavior.
    'no-useless-escape': 'error',

    // This rule aims to report redundant return statements.
    'no-useless-return': 'error',

    // This rule aims to eliminate use of void operator.
    'no-void': 'off',

    // This rule reports comments that include any of the predefined terms
    // specified in its configuration.
    'no-warning-comments': [
      'warn', {
        location: 'start',
        terms: ['FIXME', 'TODO', 'XXX'],
      },
    ],

    // This rule disallows “with” statements. This statement is forbidden in
    // ECMAScript 5 strict mode.
    'no-with': 'error',

    // This rule aims to ensure that Promises are only rejected with Error
    // objects.
    'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],

    // This rule is aimed at preventing the unintended conversion of a string to
    // a number of a different base than the intended.
    radix: 'error',

    // This rule warns async functions which have no await expression.
    'require-await': 'off',

    // This rule aims to keep all variable declarations in the leading series of
    // statements. Allowing multiple declarations helps promote maintainability
    // and is thus allowed.
    'vars-on-top': 'error',

    // This rule requires all immediately-invoked function expressions to be
    // wrapped in parentheses.
    'wrap-iife': 'error',

    // This rule aims to enforce consistent style of conditions which compare a
    // variable to a literal value.
    yoda: ['error', 'never'],
  },
}
