
/*

    eslint

    max-lines: "off",

    --

    Splitting this file up would make things worse

*/

/*
 * These rules relate to better ways of doing things to help you avoid problems
 *
 * https://eslint.org/docs/rules/#best-practices
 */

import confusingBrowserGlobals from "confusing-browser-globals";

import {
    maximumCyclomaticComplexity,
    noMagicNumbersConfig,
    indentSpaces,
    maximumFileLineCount,
    maximumLineLength
} from "./settings";

export default {
    env: {
        es6: true
    },
    rules: {

        /*
         * Enforce getter and setter pairs in objects
         *
         * https://eslint.org/docs/rules/accessor-pairs
         */
        "accessor-pairs": "error",

        /*
         * Enforce linebreaks after opening and before closing array brackets
         *
         * https://eslint.org/docs/rules/array-bracket-newline
         */
        "array-bracket-newline": [
            "error",
            "consistent"
        ],

        /*
         * Enforce consistent spacing inside array brackets
         *
         * https://eslint.org/docs/rules/array-bracket-spacing
         */
        "array-bracket-spacing": "error",

        /*
         * Enforce return statements in callbacks of array methods
         *
         * https://eslint.org/docs/rules/array-callback-return
         */
        "array-callback-return": [
            "error",
            {
                allowImplicit: true
            }
        ],

        /*
         * Enforce line breaks after each array element
         *
         * https://eslint.org/docs/rules/array-element-newline
         */
        "array-element-newline": [
            "error",
            "consistent"
        ],

        /*
         * Require braces around arrow function bodies
         *
         * https://eslint.org/docs/rules/arrow-body-style
         */
        "arrow-body-style": "error",

        /*
         * Require parentheses around arrow function arguments
         *
         * https://eslint.org/docs/rules/arrow-parens
         */
        "arrow-parens": "error",

        /*
         * Enforce consistent spacing before and after the arrow in arrow functions
         *
         * https://eslint.org/docs/rules/arrow-spacing
         */
        "arrow-spacing": "error",

        /*
         * Enforce the use of variables within the scope they are defined
         *
         * https://eslint.org/docs/rules/block-scoped-var
         */
        "block-scoped-var": "error",

        /*
         * Disallow or enforce spaces inside of blocks after opening block and
         * before closing block
         *
         * https://eslint.org/docs/rules/block-spacing
         */
        "block-spacing": "error",

        /*
         * Enforce consistent brace style for blocks
         *
         * https://eslint.org/docs/rules/brace-style
         */
        "brace-style": "error",

        /*
         * Enforce camelcase naming convention
         *
         * https://eslint.org/docs/rules/camelcase
         */
        camelcase: "error",

        /*
         * Enforce or disallow capitalization of the first letter of a comment
         *
         * https://eslint.org/docs/rules/capitalized-comments
         */
        "capitalized-comments": [
            "error",
            "always",
            {
                ignoreConsecutiveComments: true,
                ignorePattern: "webpackChunkName|http|https|eslint"
            }
        ],

        /*
         * Enforce that class methods utilize this
         *
         * Off for now because we"re ok with this and it"s irritating when you
         * start writing a new class
         *
         * https://eslint.org/docs/rules/class-methods-use-this
         */
        "class-methods-use-this": "off",

        /*
         * Require or disallow trailing commas
         *
         * https://eslint.org/docs/rules/comma-dangle
         */
        "comma-dangle": "error",

        /*
         * Enforce consistent spacing before and after commas
         *
         * https://eslint.org/docs/rules/comma-spacing
         */
        "comma-spacing": "error",

        /*
         * Enforce consistent comma style
         *
         * https://eslint.org/docs/rules/comma-style
         */
        "comma-style": "error",

        /*
         * Enforce a maximum cyclomatic complexity allowed in a program
         *
         * https://eslint.org/docs/rules/complexity
         */
        complexity: [
            "error",
            {
                max: maximumCyclomaticComplexity
            }
        ],

        /*
         * Enforce consistent spacing inside computed property brackets
         *
         * https://eslint.org/docs/rules/computed-property-spacing
         */
        "computed-property-spacing": "error",

        /*
         * Require return statements to either always or never specify values
         *
         * https://eslint.org/docs/rules/consistent-return
         */
        "consistent-return": "error",

        /*
         * Enforce consistent naming when capturing the current execution context
         *
         * https://eslint.org/docs/rules/consistent-this
         */
        "consistent-this": ["error", "self"],

        /*
         * Require super() calls in constructors
         *
         * https://eslint.org/docs/rules/constructor-super
         */
        "constructor-super": "error",

        /*
         * Enforce consistent brace style for all control statements
         *
         * https://eslint.org/docs/rules/curly
         */
        curly: "error",

        /*
         * Require default cases in switch statements
         *
         * https://eslint.org/docs/rules/default-case
         */
        "default-case": "error",

        /*
         * Enforce default clauses in switch statements to be last
         *
         * https://eslint.org/docs/rules/default-case-last
         */
        "default-case-last": "error",

        /*
         * Enforce default parameters to be last
         *
         * https://eslint.org/docs/rules/default-case
         */
        "default-param-last": "error",

        /*
         * Enforce consistent newlines before and after dots
         *
         * https://eslint.org/docs/rules/dot-location
         */
        "dot-location": [
            "error",
            "property"
        ],

        /*
         * Enforce dot notation whenever possible
         *
         * https://eslint.org/docs/rules/dot-notation
         */
        "dot-notation": "error",

        /*
         * Require or disallow newline at the end of files
         *
         * https://eslint.org/docs/rules/eol-last
         */
        "eol-last": "error",

        /*
         * Require the use of === and !==
         *
         * https://eslint.org/docs/rules/eqeqeq
         */
        eqeqeq: "error",

        /*
         * Enforce “for” loop update clause moving the counter in the right direction.
         *
         * https://eslint.org/docs/rules/for-direction
         */
        "for-direction": "error",

        /*
         * Require or disallow spacing between function identifiers and their
         * invocations
         *
         * https://eslint.org/docs/rules/func-call-spacing
         */
        "func-call-spacing": "error",

        /*
         * Require function names to match the name of the variable or property
         * to which they are assigned
         *
         * https://eslint.org/docs/rules/func-name-matching
         */
        "func-name-matching": "error",

        /*
         * Require or disallow named function expressions
         *
         * https://eslint.org/docs/rules/func-names
         */
        "func-names": ["error", "as-needed"],

        /*
         * Enforce the consistent use of either function declarations or expressions
         *
         * https://eslint.org/docs/rules/func-style
         */
        "func-style": "error",

        /*
         * Enforce line breaks between arguments of a function call
         *
         * https://eslint.org/docs/rules/function-call-argument-newline
         */
        "function-call-argument-newline": [
            "error",
            "consistent"
        ],

        /*
         * Enforce consistent line breaks inside function parentheses
         *
         * https://eslint.org/docs/rules/function-paren-newline
         */
        "function-paren-newline": ["error", "consistent"],

        /*
         * Enforce consistent spacing around * operators in generator functions
         *
         * https://eslint.org/docs/rules/generator-star-spacing
         */
        "generator-star-spacing": "error",

        /*
         * Enforce return statements in getters
         *
         * https://eslint.org/docs/rules/getter-return
         */
        "getter-return": "error",

        /*
         * Require grouped accessor pairs in object literals and classes
         *
         * https://eslint.org/docs/rules/grouped-accessor-pairs
         */
        "grouped-accessor-pairs": "error",

        /*
         * Require for-in loops to include an if statement
         *
         * https://eslint.org/docs/rules/guard-for-in
         */
        "guard-for-in": "error",

        /*
         * Disallow specified identifiers
         *
         * https://eslint.org/docs/rules/id-denylist
         */
        "id-denylist": [
            "error",
            "e",
            "i",
            "j"
        ],

        /*
         * Enforce minimum and maximum identifier lengths
         *
         * https://eslint.org/docs/rules/id-length
         */
        "id-length": "error",

        /*
         * Require identifiers to match a specified regular expression
         *
         * https://eslint.org/docs/rules/id-match
         */
        "id-match": "error",

        /*
         * Enforce the location of arrow function bodies
         *
         * https://eslint.org/docs/rules/implicit-arrow-linebreak
         */
        "implicit-arrow-linebreak": "error",

        /*
         * Enforce consistent indentation
         *
         * https://eslint.org/docs/rules/indent
         */
        indent: [
            "error",
            indentSpaces,
            {
                MemberExpression: 0,
                SwitchCase: 1
            }
        ],

        /*
         * Require or disallow initialization in variable declarations
         *
         * https://eslint.org/docs/rules/init-declarations
         */
        "init-declarations": "error",

        /*
         * Enforce the consistent use of either double or single quotes in JSX attributes
         *
         * https://eslint.org/docs/rules/jsx-quotes
         */
        "jsx-quotes": "error",

        /*
         * Enforce consistent spacing between keys and values in object literal properties
         *
         * https://eslint.org/docs/rules/key-spacing
         */
        "key-spacing": [
            "error",
            {
                afterColon: true,
                beforeColon: false,
                mode: "strict"
            }
        ],

        /*
         * Enforce consistent spacing before and after keywords
         *
         * https://eslint.org/docs/rules/keyword-spacing
         */
        "keyword-spacing": [
            "error",
            {
                after: false,
                before: false,
                overrides: {
                    as: {
                        after: true,
                        before: true
                    },
                    case: {
                        after: true
                    },
                    class: {
                        after: true
                    },
                    const: {
                        after: true
                    },
                    default: {
                        after: true,
                        before: true
                    },
                    export: {
                        after: true
                    },
                    extends: {
                        after: true,
                        before: true
                    },
                    from: {
                        after: true,
                        before: true
                    },
                    import: {
                        after: true
                    },
                    let: {
                        after: true
                    },
                    of: {
                        after: true,
                        before: true
                    },
                    return: {
                        after: true
                    },
                    this: {
                        before: true
                    }
                }
            }
        ],

        /*
         * Enforce position of line comments
         *
         * https://eslint.org/docs/rules/line-comment-position
         */
        "line-comment-position": "error",

        /*
         * Enforce consistent linebreak style
         *
         * https://eslint.org/docs/rules/linebreak-style
         */
        "linebreak-style": "error",

        /*
         * Require empty lines around comments
         *
         * https://eslint.org/docs/rules/lines-around-comment
         */
        "lines-around-comment": "error",

        /*
         * Require or disallow an empty line between class members
         *
         * https://eslint.org/docs/rules/lines-between-class-members
         */
        "lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterSingleLine: true
            }
        ],

        /*
         * Enforce a maximum number of classes per file
         *
         * https://eslint.org/docs/rules/max-classes-per-file
         */
        "max-classes-per-file": "error",

        /*
         * Enforce a maximum depth that blocks can be nested
         *
         * https://eslint.org/docs/rules/max-depth
         */
        "max-depth": "error",

        /*
         * Enforce a maximum line length
         *
         * https://eslint.org/docs/rules/max-len
         */
        "max-len": [
            "error",
            {
                code: maximumLineLength,
                ignoreComments: true
            }
        ],

        /*
         * Enforce a maximum number of lines per file
         *
         * https://eslint.org/docs/rules/max-lines
         */
        "max-lines": [
            "error",
            {
                max: maximumFileLineCount
            }
        ],

        /*
         * Enforce a maximum number of line of code in a function
         *
         * https://eslint.org/docs/rules/max-lines-per-function
         */
        "max-lines-per-function": [
            "error",
            {
                max: 200
            }
        ],

        /*
         * Enforce a maximum depth that callbacks can be nested
         *
         * https://eslint.org/docs/rules/max-nested-callbacks
         */
        "max-nested-callbacks": [
            "error",
            {
                max: 3
            }
        ],

        /*
         * Enforce a maximum number of parameters in function definitions
         *
         * https://eslint.org/docs/rules/max-params
         */
        "max-params": [
            "error",
            {
                max: 5
            }
        ],

        /*
         * Enforce a maximum number of statements allowed in function blocks
         *
         * https://eslint.org/docs/rules/max-statements
         */
        "max-statements": [
            "error",
            {
                max: 40
            }
        ],

        /*
         * Enforce a maximum number of statements allowed per line
         *
         * https://eslint.org/docs/rules/max-statements-per-line
         */
        "max-statements-per-line": [
            "error",
            {
                max: 1
            }
        ],

        /*
         * Enforce a particular style for multiline comments
         *
         * https://eslint.org/docs/rules/multiline-comment-style
         */
        "multiline-comment-style": "error",

        /*
         * Enforce newlines between operands of ternary expressions
         *
         * https://eslint.org/docs/rules/multiline-ternary
         */
        "multiline-ternary": ["error", "never"],

        /*
         * Require constructor names to begin with a capital letter
         *
         * https://eslint.org/docs/rules/new-cap
         */
        "new-cap": [
            "error",
            {
                properties: false
            }
        ],

        /*
         * Require parentheses when invoking a constructor with no arguments
         *
         * https://eslint.org/docs/rules/new-parens
         */
        "new-parens": "error",

        /*
         * Require a newline after each call in a method chain
         *
         * https://eslint.org/docs/rules/newline-per-chained-call
         */
        "newline-per-chained-call": [
            "error",
            {
                ignoreChainWithDepth: 3
            }
        ],

        /*
         * Disallow the use of alert, confirm, and prompt
         *
         * https://eslint.org/docs/rules/no-alert
         */
        "no-alert": "error",

        /*
         * Disallow Array constructors
         *
         * https://eslint.org/docs/rules/no-array-constructor
         */
        "no-array-constructor": "error",

        /*
         * Disallow using an async function as a Promise executor
         *
         * https://eslint.org/docs/rules/no-async-promise-executor
         */
        "no-async-promise-executor": "error",

        /*
         * Disallow await inside of loops
         *
         * https://eslint.org/docs/rules/no-await-in-loop
         */
        "no-await-in-loop": "error",

        /*
         * Disallow bitwise operators
         *
         * https://eslint.org/docs/rules/no-bitwise
         */
        "no-bitwise": "error",

        /*
         * Disallow the use of arguments.caller or arguments.callee
         *
         * https://eslint.org/docs/rules/no-caller
         */
        "no-caller": "error",

        /*
         * Disallow lexical declarations in case clauses
         *
         * https://eslint.org/docs/rules/no-case-declarations
         */
        "no-case-declarations": "error",

        /*
         * Disallow reassigning class members
         *
         * https://eslint.org/docs/rules/no-class-assign
         */
        "no-class-assign": "error",

        /*
         * Disallow comparing against -0
         *
         * https://eslint.org/docs/rules/no-compare-neg-zero
         */
        "no-compare-neg-zero": "error",

        /*
         * Disallow assignment operators in conditional expressions
         *
         * https://eslint.org/docs/rules/no-cond-assign
         */
        "no-cond-assign": "error",

        /*
         * Disallow arrow functions where they could be confused with comparisons
         *
         * Off for now because I believe in myself
         *
         * https://eslint.org/docs/rules/no-confusing-arrow
         */
        "no-confusing-arrow": "off",

        /*
         * Disallow the use of console
         *
         * Off for now, because I tried turning this on and I wanted to kill myself
         *
         * https://eslint.org/docs/rules/no-console
         */
        "no-console": "off",

        /*
         * Disallow reassigning const variables
         *
         * https://eslint.org/docs/rules/no-const-assign
         */
        "no-const-assign": "error",

        /*
         * Disallow constant expressions in conditions
         *
         * https://eslint.org/docs/rules/no-constant-condition
         */
        "no-constant-condition": "error",

        /*
         * Disallow returning value from constructor
         *
         * https://eslint.org/docs/rules/no-constructor-return
         */
        "no-constructor-return": "error",

        /*
         * Disallow continue statements
         *
         * https://eslint.org/docs/rules/no-continue
         */
        "no-continue": "error",

        /*
         * Disallow control characters in regular expressions
         *
         * https://eslint.org/docs/rules/no-control-regex
         */
        "no-control-regex": "error",

        /*
         * Disallow the use of debugger
         *
         * https://eslint.org/docs/rules/no-debugger
         */
        "no-debugger": "error",

        /*
         * Disallow deleting variables
         *
         * https://eslint.org/docs/rules/no-delete-var
         */
        "no-delete-var": "error",

        /*
         * Disallow division operators explicitly at the beginning of regular expressions
         *
         * https://eslint.org/docs/rules/no-div-regex
         */
        "no-div-regex": "error",

        /*
         * Disallow duplicate arguments in function definitions
         *
         * https://eslint.org/docs/rules/no-dupe-args
         */
        "no-dupe-args": "error",

        /*
         * Disallow duplicate class members
         *
         * https://eslint.org/docs/rules/no-dupe-class-members
         */
        "no-dupe-class-members": "error",

        /*
         * Disallow duplicate conditions in if-else-if chains
         *
         * https://eslint.org/docs/rules/no-dupe-else-if
         */
        "no-dupe-else-if": "error",

        /*
         * Disallow duplicate keys in object literals
         *
         * https://eslint.org/docs/rules/no-dupe-keys
         */
        "no-dupe-keys": "error",

        /*
         * Disallow duplicate case labels
         *
         * https://eslint.org/docs/rules/no-duplicate-case
         */
        "no-duplicate-case": "error",

        /*
         * Disallow duplicate module imports
         *
         * https://eslint.org/docs/rules/no-duplicate-imports
         */
        "no-duplicate-imports": "error",

        /*
         * Disallow else blocks after return statements in if statements
         *
         * https://eslint.org/docs/rules/no-else-return
         */
        "no-else-return": "error",

        /*
         * Disallow empty block statements
         *
         * https://eslint.org/docs/rules/no-empty
         */
        "no-empty": [
            "error",
            {
                allowEmptyCatch: true
            }
        ],

        /*
         * Disallow empty character classes in regular expressions
         *
         * https://eslint.org/docs/rules/no-empty-character-class
         */
        "no-empty-character-class": "error",

        /*
         * Disallow empty functions
         *
         * https://eslint.org/docs/rules/no-empty-function
         */
        "no-empty-function": "error",

        /*
         * Disallow empty destructuring patterns
         *
         * https://eslint.org/docs/rules/no-empty-pattern
         */
        "no-empty-pattern": "error",

        /*
         * Disallow null comparisons without type-checking operators
         *
         * https://eslint.org/docs/rules/no-eq-null
         */
        "no-eq-null": "error",

        /*
         * Disallow the use of eval()
         *
         * https://eslint.org/docs/rules/no-eval
         */
        "no-eval": "error",

        /*
         * Disallow reassigning exceptions in catch clauses
         *
         * https://eslint.org/docs/rules/no-ex-assign
         */
        "no-ex-assign": "error",

        /*
         * Disallow extending native types
         *
         * https://eslint.org/docs/rules/no-extend-native
         */
        "no-extend-native": "error",

        /*
         * Disallow unnecessary calls to .bind()
         *
         * https://eslint.org/docs/rules/no-extra-bind
         */
        "no-extra-bind": "error",

        /*
         * Disallow unnecessary boolean casts
         *
         * https://eslint.org/docs/rules/no-extra-boolean-cast
         */
        "no-extra-boolean-cast": "error",

        /*
         * Disallow unnecessary labels
         *
         * https://eslint.org/docs/rules/no-extra-label
         */
        "no-extra-label": "error",

        /*
         * Disallow unnecessary parentheses
         *
         * https://eslint.org/docs/rules/no-extra-parens
         */
        "no-extra-parens": [
            "error",
            "all",
            {
                ignoreJSX: "multi-line"
            }
        ],

        /*
         * Disallow unnecessary semicolons
         *
         * https://eslint.org/docs/rules/no-extra-semi
         */
        "no-extra-semi": "error",

        /*
         * Disallow fallthrough of case statements
         *
         * https://eslint.org/docs/rules/no-fallthrough
         */
        "no-fallthrough": "error",

        /*
         * Disallow leading or trailing decimal points in numeric literals
         *
         * https://eslint.org/docs/rules/no-floating-decimal
         */
        "no-floating-decimal": "error",

        /*
         * Disallow reassigning function declarations
         *
         * https://eslint.org/docs/rules/no-func-assign
         */
        "no-func-assign": "error",

        /*
         * Disallow assignments to native objects or read-only global variables
         *
         * https://eslint.org/docs/rules/no-global-assign
         */
        "no-global-assign": "error",

        /*
         * Disallow shorthand type conversions
         *
         * https://eslint.org/docs/rules/no-implicit-coercion
         */
        "no-implicit-coercion": "error",

        /*
         * Disallow variable and function declarations in the global scope
         *
         * https://eslint.org/docs/rules/no-implicit-globals
         */
        "no-implicit-globals": "error",

        /*
         * Disallow the use of eval()-like methods
         *
         * https://eslint.org/docs/rules/no-implied-eval
         */
        "no-implied-eval": "error",

        /*
         * Disallow assigning to imported bindings
         *
         * https://eslint.org/docs/rules/no-import-assign
         */
        "no-import-assign": "error",

        /*
         * Disallow inline comments after code
         *
         * https://eslint.org/docs/rules/no-inline-comments
         */
        "no-inline-comments": [
            "error",
            {
                ignorePattern: "webpackChunkName:\\s.+"
            }
        ],

        /*
         * Disallow variable or function declarations in nested blocks
         *
         * https://eslint.org/docs/rules/no-inner-declarations
         */
        "no-inner-declarations": "error",

        /*
         * Disallow invalid regular expression strings in RegExp constructors
         *
         * https://eslint.org/docs/rules/no-invalid-regexp
         */
        "no-invalid-regexp": "error",

        /*
         * Disallow this keywords outside of classes or class-like objects
         *
         * https://eslint.org/docs/rules/no-invalid-this
         */
        "no-invalid-this": "error",

        /*
         * Disallow irregular whitespace
         *
         * https://eslint.org/docs/rules/no-irregular-whitespace
         */
        "no-irregular-whitespace": "error",

        /*
         * Disallow the use of the __iterator__ property
         *
         * https://eslint.org/docs/rules/no-iterator
         */
        "no-iterator": "error",

        /*
         * Disallow labels that share a name with a variable
         *
         * https://eslint.org/docs/rules/no-label-var
         */
        "no-label-var": "error",

        /*
         * Disallow labeled statements
         *
         * https://eslint.org/docs/rules/no-labels
         */
        "no-labels": "error",

        /*
         * Disallow unnecessary nested blocks
         *
         * https://eslint.org/docs/rules/no-lone-blocks
         */
        "no-lone-blocks": "error",

        /*
         * Disallow if statements as the only statement in else blocks
         *
         * https://eslint.org/docs/rules/no-lonely-if
         */
        "no-lonely-if": "error",

        /*
         * Disallow function declarations and expressions inside loop statements
         *
         * https://eslint.org/docs/rules/no-loop-func
         */
        "no-loop-func": "error",

        /*
         * Disallow Number Literals That Lose Precision
         *
         * https://eslint.org/docs/rules/no-loss-of-precision
         */
        "no-loss-of-precision": "error",

        /*
         * Disallow magic numbers
         *
         * https://eslint.org/docs/rules/no-magic-numbers
         */
        "no-magic-numbers": [
            "error",
            noMagicNumbersConfig
        ],

        /*
         * Disallow characters which are made with multiple code points in
         * character class syntax
         *
         * https://eslint.org/docs/rules/no-misleading-character-class
         */
        "no-misleading-character-class": "error",

        /*
         * Disallow mixed binary operators
         *
         * Using mixed operators is chilled
         *
         * https://eslint.org/docs/rules/no-mixed-operators
         */
        "no-mixed-operators": "off",

        /*
         * Disallow mixed spaces and tabs for indentation
         *
         * https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
         */
        "no-mixed-spaces-and-tabs": "error",

        /*
         * Disallow use of chained assignment expressions
         *
         * https://eslint.org/docs/rules/no-multi-assign
         */
        "no-multi-assign": "error",

        /*
         * Disallow multiple spaces
         *
         * https://eslint.org/docs/rules/no-multi-spaces
         */
        "no-multi-spaces": "error",

        /*
         * Disallow multiline strings
         *
         * https://eslint.org/docs/rules/no-multi-str
         */
        "no-multi-str": "error",

        /*
         * Disallow multiple empty lines
         *
         * https://eslint.org/docs/rules/no-multiple-empty-lines
         */
        "no-multiple-empty-lines": "error",

        /*
         * Disallow negated conditions
         *
         * https://eslint.org/docs/rules/no-negated-condition
         */
        "no-negated-condition": "error",

        /*
         * Disallow nested ternary expressions
         *
         * Taken care of by unicorn/no-nested-ternary
         *
         * https://eslint.org/docs/rules/no-nested-ternary
         */
        "no-nested-ternary": "off",

        /*
         * Disallow new operators outside of assignments or comparisons
         *
         * https://eslint.org/docs/rules/no-new
         */
        "no-new": "error",

        /*
         * Disallow new operators with the Function object
         *
         * https://eslint.org/docs/rules/no-new-func
         */
        "no-new-func": "error",

        /*
         * Disallow Object constructors
         *
         * https://eslint.org/docs/rules/no-new-object
         */
        "no-new-object": "error",

        /*
         * Disallow new operators with the Symbol object
         *
         * https://eslint.org/docs/rules/no-new-symbol
         */
        "no-new-symbol": "error",

        /*
         * Disallow new operators with the String, Number, and Boolean objects
         *
         * https://eslint.org/docs/rules/no-new-wrappers
         */
        "no-new-wrappers": "error",

        /*
         * Disallow \8 and \9 escape sequences in string literals (no-nonoctal-decimal-escape)
         *
         * https://eslint.org/docs/rules/no-nonoctal-decimal-escape
         */
        "no-nonoctal-decimal-escape": "error",

        /*
         * Disallow calling global object properties as functions
         *
         * https://eslint.org/docs/rules/no-obj-calls
         */
        "no-obj-calls": "error",

        /*
         * Disallow octal literals
         *
         * https://eslint.org/docs/rules/no-octal
         */
        "no-octal": "error",

        /*
         * Disallow octal escape sequences in string literals
         *
         * https://eslint.org/docs/rules/no-octal-escape
         */
        "no-octal-escape": "error",

        /*
         * Disallow reassigning function parameters
         *
         * https://eslint.org/docs/rules/no-param-reassign
         */
        "no-param-reassign": [
            "error",
            {
                ignorePropertyModificationsFor: [
                    // Reduce accumulators
                    "acc",
                    // Reduce accumulators
                    "accumulator",
                    // Express requests
                    "req",
                    // Express requests
                    "request",
                    // Express responses
                    "res",
                    // Express responses
                    "response"
                ],
                props: true
            }
        ],

        /*
         * Disallow the unary operators ++ and --
         *
         * https://eslint.org/docs/rules/no-plusplus
         */
        "no-plusplus": [
            "error",
            {
                allowForLoopAfterthoughts: true
            }
        ],

        /*
         * Disallow returning values from Promise executor functions
         *
         * https://eslint.org/docs/rules/no-promise-executor-return
         */
        "no-promise-executor-return": "error",

        /*
         * Disallow the use of the __proto__ property
         *
         * https://eslint.org/docs/rules/no-proto
         */
        "no-proto": "error",

        /*
         * Disallow calling some Object.prototype methods directly on objects
         *
         * https://eslint.org/docs/rules/no-prototype-builtins
         */
        "no-prototype-builtins": "error",

        /*
         * Disallow variable redeclaration
         *
         * https://eslint.org/docs/rules/no-redeclare
         */
        "no-redeclare": "error",

        /*
         * Disallow multiple spaces in regular expressions
         *
         * https://eslint.org/docs/rules/no-regex-spaces
         */
        "no-regex-spaces": "error",

        /*
         * This rule disallows specified names from being used as exported names.
         *
         * By default, this rule doesn't disallow any names. Only the names you specify in the configuration will be disallowed.
         *
         * Off for now because I haven't thought of any names that should be restricted
         *
         * https://eslint.org/docs/rules/no-restricted-exports
         */
        "no-restricted-exports": "off",

        /*
         * Disallow specified global variables
         *
         * https://eslint.org/docs/rules/no-restricted-globals
         */
        "no-restricted-globals": [
            "error",
            "isFinite",
            "isNaN",
            ...confusingBrowserGlobals
        ],

        /*
         * Disallow specified modules when loaded by import
         *
         * By default, this rule doesn't disallow any names. Only the names you specify in the configuration will be disallowed.
         *
         * Off for now because I haven't thought of any names that should be restricted
         *
         * https://eslint.org/docs/rules/no-restricted-imports
         */
        "no-restricted-imports": "off",

        /*
         * Disallow certain properties on certain objects
         *
         * https://eslint.org/docs/rules/no-restricted-properties
         */
        "no-restricted-properties": [
            "error",
            {
                message: "arguments.callee is deprecated",
                object: "arguments",
                property: "callee"
            },
            {
                message: "Please use Number.isFinite instead",
                object: "global",
                property: "isFinite"
            },
            {
                message: "Please use Number.isFinite instead",
                object: "self",
                property: "isFinite"
            },
            {
                message: "Please use Number.isFinite instead",
                object: "window",
                property: "isFinite"
            },
            {
                message: "Please use Number.isNaN instead",
                object: "global",
                property: "isNaN"
            },
            {
                message: "Please use Number.isNaN instead",
                object: "self",
                property: "isNaN"
            },
            {
                message: "Please use Number.isNaN instead",
                object: "window",
                property: "isNaN"
            },
            {
                message: "Please use Object.defineProperty instead.",
                property: "__defineGetter__"
            },
            {
                message: "Please use Object.defineProperty instead.",
                property: "__defineSetter__"
            },
            {
                message: "Use the exponentiation operator (**) instead.",
                object: "Math",
                property: "pow"
            }
        ],

        /*
         * Disallow specified syntax
         *
         * https://eslint.org/docs/rules/no-restricted-syntax
         */
        "no-restricted-syntax": "error",

        /*
         * Disallow assignment operators in return statements
         *
         * https://eslint.org/docs/rules/no-return-assign
         */
        "no-return-assign": "error",

        /*
         * Disallow unnecessary return await
         *
         * https://eslint.org/docs/rules/no-return-await
         */
        "no-return-await": "error",

        /*
         * Disallow javascript: urls
         *
         * https://eslint.org/docs/rules/no-script-url
         */
        "no-script-url": "error",

        /*
         * Disallow assignments where both sides are exactly the same
         *
         * https://eslint.org/docs/rules/no-self-assign
         */
        "no-self-assign": "error",

        /*
         * Disallow comparisons where both sides are exactly the same
         *
         * https://eslint.org/docs/rules/no-self-compare
         */
        "no-self-compare": "error",

        /*
         * Disallow comma operators
         *
         * https://eslint.org/docs/rules/no-sequences
         */
        "no-sequences": "error",

        /*
         * Disallow returning values from setters
         *
         * https://eslint.org/docs/rules/no-setter-return
         */
        "no-setter-return": "error",

        /*
         * Disallow variable declarations from shadowing variables declared in
         * the outer scope
         *
         * https://eslint.org/docs/rules/no-shadow
         */
        "no-shadow": "error",

        /*
         * Disallow identifiers from shadowing restricted names
         *
         * https://eslint.org/docs/rules/no-shadow-restricted-names
         */
        "no-shadow-restricted-names": "error",

        /*
         * Disallow sparse arrays
         *
         * https://eslint.org/docs/rules/no-sparse-arrays
         */
        "no-sparse-arrays": "error",

        /*
         * Disallow all tabs
         *
         * https://eslint.org/docs/rules/no-tabs
         */
        "no-tabs": "error",

        /*
         * Disallow template literal placeholder syntax in regular strings
         *
         * https://eslint.org/docs/rules/no-template-curly-in-string
         */
        "no-template-curly-in-string": "error",

        /*
         * Disallow ternary operators
         *
         * This is turned of for now because ternaries aren't that scary
         *
         * https://eslint.org/docs/rules/no-ternary
         */
        "no-ternary": "off",

        /*
         * Disallow this/super before calling super() in constructors
         *
         * https://eslint.org/docs/rules/no-this-before-super
         */
        "no-this-before-super": "error",

        /*
         * Disallow throwing literals as exceptions
         *
         * https://eslint.org/docs/rules/no-throw-literal
         */
        "no-throw-literal": "error",

        /*
         * Disallow trailing whitespace at the end of lines
         *
         * https://eslint.org/docs/rules/no-trailing-spaces
         */
        "no-trailing-spaces": "error",

        /*
         * Disallow the use of undeclared variables unless mentioned in
         * \/* global *\/ comments.
         *
         * https://eslint.org/docs/rules/no-undef
         */
        "no-undef": "error",

        /*
         * Disallow initializing variables to undefined
         *
         * https://eslint.org/docs/rules/no-undef-init
         */
        "no-undef-init": "error",

        /*
         * Disallow the use of undefined as an identifier
         *
         * https://eslint.org/docs/rules/no-undefined
         */
        "no-undefined": "error",

        /*
         * Disallow dangling underscores in identifiers
         *
         * https://eslint.org/docs/rules/no-underscore-dangle
         */
        "no-underscore-dangle": "error",

        /*
         * Disallow confusing multiline expressions
         *
         * https://eslint.org/docs/rules/no-unexpected-multiline
         */
        "no-unexpected-multiline": "error",

        /*
         * Disallow unmodified loop conditions
         *
         * https://eslint.org/docs/rules/no-unmodified-loop-condition
         */
        "no-unmodified-loop-condition": "error",

        /*
         * Disallow ternary operators when simpler alternatives exist
         *
         * https://eslint.org/docs/rules/no-unneeded-ternary
         */
        "no-unneeded-ternary": "error",

        /*
         * Disallow unreachable code after return, throw, continue, and break statements
         *
         * https://eslint.org/docs/rules/no-unreachable
         */
        "no-unreachable": "error",

        /*
         * Disallow loops with a body that allows only one iteration
         *
         * https://eslint.org/docs/rules/no-unreachable-loop
         */
        "no-unreachable-loop": "error",

        /*
         * Disallow control flow statements in finally blocks
         *
         * https://eslint.org/docs/rules/no-unsafe-finally
         */
        "no-unsafe-finally": "error",

        /*
         * Disallow negating the left operand of relational operators
         *
         * https://eslint.org/docs/rules/no-unsafe-negation
         */
        "no-unsafe-negation": "error",

        /*
         * Disallow use of optional chaining in contexts where the undefined value is not allowed
         *
         * https://eslint.org/docs/rules/no-unsafe-optional-chaining
         */
        "no-unsafe-optional-chaining": "error",

        /*
         * Disallow unused expressions
         *
         * https://eslint.org/docs/rules/no-unused-expressions
         */
        "no-unused-expressions": "error",

        /*
         * Disallow unused labels
         *
         * https://eslint.org/docs/rules/no-unused-labels
         */
        "no-unused-labels": "error",

        /*
         * Disallow Unused Private Class Members
         *
         * https://eslint.org/docs/rules/no-unused-private-class-members
         */
        "no-unused-private-class-members": "error",

        /*
         * Disallow unused variables
         *
         * https://eslint.org/docs/rules/no-unused-vars
         */
        "no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "h"
            }
        ],

        /*
         * Disallow the use of variables before they are defined
         *
         * https://eslint.org/docs/rules/no-use-before-define
         */
        "no-use-before-define": "error",

        /*
         * Disallow useless backreferences in regular expressions
         *
         * https://eslint.org/docs/rules/no-useless-backreference
         */
        "no-useless-backreference": "error",

        /*
         * Disallow unnecessary calls to .call() and .apply()
         *
         * https://eslint.org/docs/rules/no-useless-call
         */
        "no-useless-call": "error",

        /*
         * Disallow unnecessary catch clauses
         *
         * https://eslint.org/docs/rules/no-useless-catch
         */
        "no-useless-catch": "error",

        /*
         * Disallow unnecessary computed property keys in object literals
         *
         * https://eslint.org/docs/rules/no-useless-computed-key
         */
        "no-useless-computed-key": "error",

        /*
         * Disallow unnecessary concatenation of literals or template literals
         *
         * https://eslint.org/docs/rules/no-useless-concat
         */
        "no-useless-concat": "error",

        /*
         * Disallow unnecessary constructors
         *
         * https://eslint.org/docs/rules/no-useless-constructor
         */
        "no-useless-constructor": "error",

        /*
         * Disallow unnecessary escape characters
         *
         * https://eslint.org/docs/rules/no-useless-escape
         */
        "no-useless-escape": "error",

        /*
         * Disallow renaming import, export, and destructured assignments to the
         * same name
         *
         * https://eslint.org/docs/rules/no-useless-rename
         */
        "no-useless-rename": "error",

        /*
         * Disallow redundant return statements
         *
         * https://eslint.org/docs/rules/no-useless-return
         */
        "no-useless-return": "error",

        /*
         * Require let or const instead of var
         *
         * https://eslint.org/docs/rules/no-var
         */
        "no-var": "error",

        /*
         * Disallow void operators
         *
         * https://eslint.org/docs/rules/no-void
         */
        "no-void": [
            "error",
            {
                allowAsStatement: true
            }
        ],

        /*
         * Disallow specified warning terms in comments
         *
         * This is off for now because unicorn/expiring-todo-comments is taking
         * care of keeping these comments time locked.
         *
         * https://eslint.org/docs/rules/no-warning-comments
         */
        "no-warning-comments": "off",

        /*
         * Disallow whitespace before properties
         *
         * https://eslint.org/docs/rules/no-whitespace-before-property
         */
        "no-whitespace-before-property": "error",

        /*
         * Disallow with statements
         *
         * https://eslint.org/docs/rules/no-with
         */
        "no-with": "error",

        /*
         * Enforce the location of single-line statements
         *
         * https://eslint.org/docs/rules/nonblock-statement-body-position
         */
        "nonblock-statement-body-position": "error",

        /*
         * Enforce consistent line breaks inside braces
         *
         * https://eslint.org/docs/rules/object-curly-newline
         */
        "object-curly-newline": [
            "error",
            {
                consistent: true,
                minProperties: 2,
                multiline: true
            }
        ],

        /*
         * Enforce consistent spacing inside braces
         *
         * https://eslint.org/docs/rules/object-curly-spacing
         */
        "object-curly-spacing": ["error", "always"],

        /*
         * Enforce placing object properties on separate lines
         *
         * https://eslint.org/docs/rules/object-property-newline
         */
        "object-property-newline": "error",

        /*
         * Require or disallow method and property shorthand syntax for object literals
         *
         * https://eslint.org/docs/rules/object-shorthand
         */
        "object-shorthand": "error",

        /*
         * Enforce variables to be declared either together or separately in functions
         *
         * https://eslint.org/docs/rules/one-var
         */
        "one-var": [
            "error",
            "never"
        ],

        /*
         * Require or disallow newlines around variable declarations
         *
         * https://eslint.org/docs/rules/one-var-declaration-per-line
         */
        "one-var-declaration-per-line": "error",

        /*
         * Require or disallow assignment operator shorthand where possible
         *
         * https://eslint.org/docs/rules/operator-assignment
         */
        "operator-assignment": "error",

        /*
         * Enforce consistent linebreak style for operators
         *
         * https://eslint.org/docs/rules/operator-linebreak
         */
        "operator-linebreak": "error",

        /*
         * Require or disallow padding within blocks
         *
         * https://eslint.org/docs/rules/padded-blocks
         */
        "padded-blocks": [
            "error",
            {
                classes: "always",
                switches: "always"
            }
        ],

        /*
         * Require or disallow padding lines between statements
         *
         * https://eslint.org/docs/rules/padding-line-between-statements
         */
        "padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                next: [
                    "return",
                    "directive",
                    "multiline-block-like",
                    "const",
                    "let",
                    "var"
                ],
                prev: [
                    "return",
                    "directive",
                    "multiline-block-like"
                ]
            }
        ],

        /*
         * Require using arrow functions for callbacks
         *
         * https://eslint.org/docs/rules/prefer-arrow-callback
         */
        "prefer-arrow-callback": "error",

        /*
         * Require const declarations for variables that are never reassigned
         * after declared
         *
         * https://eslint.org/docs/rules/prefer-const
         */
        "prefer-const": "error",

        /*
         * Require destructuring from arrays and/or objects
         *
         * https://eslint.org/docs/rules/prefer-destructuring
         */
        "prefer-destructuring": [
            "error",
            {
                array: true,
                object: false
            }
        ],

        /*
         * Disallow the use of Math.pow in favor of the ** operator
         *
         * https://eslint.org/docs/rules/prefer-exponentiation-operator
         */
        "prefer-exponentiation-operator": "error",

        /*
         * Enforce using named capture group in regular expression
         *
         * This is off for now because it clashes with no-template-curly-in-string
         * since when you use this in String.replace functions the replacement
         * string has the same format as a template curly and triggers that lint
         *
         * https://eslint.org/docs/rules/prefer-named-capture-group
         */
        "prefer-named-capture-group": "off",

        /*
         * Disallow parseInt() and Number.parseInt() in favor of binary, octal,
         * and hexadecimal literals
         *
         * https://eslint.org/docs/rules/prefer-numeric-literals
         */
        "prefer-numeric-literals": "error",

        /*
         * Prefer Object.hasOwn() over Object.prototype.hasOwnProperty.call()
         *
         * https://eslint.org/docs/rules/prefer-object-has-own
         */
        "prefer-object-has-own": "error",

        /*
         * Disallow using Object.assign with an object literal as the first
         * argument and prefer the use of object spread instead.
         *
         * https://eslint.org/docs/rules/prefer-object-spread
         */
        "prefer-object-spread": "error",

        /*
         * Require using Error objects as Promise rejection reasons
         *
         * https://eslint.org/docs/rules/prefer-promise-reject-errors
         */
        "prefer-promise-reject-errors": "error",

        /*
         * Disallow use of the RegExp constructor in favor of regular expression literals
         *
         * https://eslint.org/docs/rules/prefer-promise-reject-errors
         */
        "prefer-regex-literals": "error",

        /*
         * Require rest parameters instead of arguments
         *
         * https://eslint.org/docs/rules/prefer-rest-params
         */
        "prefer-rest-params": "error",

        /*
         * Require spread operators instead of .apply()
         *
         * https://eslint.org/docs/rules/prefer-spread
         */
        "prefer-spread": "error",

        /*
         * Require template literals instead of string concatenation
         *
         * https://eslint.org/docs/rules/prefer-template
         */
        "prefer-template": "error",

        /*
         * Require quotes around object literal property names
         *
         * https://eslint.org/docs/rules/quote-props
         */
        "quote-props": ["error", "as-needed"],

        /*
         * Enforce the consistent use of either backticks, double, or single quotes
         *
         * https://eslint.org/docs/rules/quotes
         */
        quotes: "error",

        /*
         * Enforce the consistent use of the radix argument when using parseInt()
         *
         * https://eslint.org/docs/rules/radix
         */
        radix: "error",

        /*
         * Disallow assignments that can lead to race conditions due to usage of await or yield
         *
         * https://eslint.org/docs/rules/require-atomic-updates
         */
        "require-atomic-updates": "error",

        /*
         * Disallow async functions which have no await expression
         *
         * https://eslint.org/docs/rules/equire-awa1it
         */
        "require-await": "error",

        /*
         * Enforce the use of u flag on RegExp
         *
         * https://eslint.org/docs/rules/require-unicode-regexp
         */
        "require-unicode-regexp": "error",

        /*
         * Require generator functions to contain yield
         *
         * https://eslint.org/docs/rules/require-yield
         */
        "require-yield": "error",

        /*
         * Enforce spacing between rest and spread operators and their expressions
         *
         * https://eslint.org/docs/rules/rest-spread-spacing
         */
        "rest-spread-spacing": "error",

        /*
         * Require or disallow semicolons instead of ASI
         *
         * https://eslint.org/docs/rules/semi
         */
        semi: "error",

        /*
         * Enforce consistent spacing before and after semicolons
         *
         * https://eslint.org/docs/rules/semi-spacing
         */
        "semi-spacing": "error",

        /*
         * Enforce location of semicolons
         *
         * https://eslint.org/docs/rules/semi-style
         */
        "semi-style": [
            "error",
            "last"
        ],

        /*
         * Enforce sorted import declarations within modules
         *
         * Off for now because we handle this with 'import/order' because it has
         * more fine grained control
         *
         * https://eslint.org/docs/rules/sort-imports
         */
        "sort-imports": "off",

        /*
         * Require object keys to be sorted
         *
         * This is currently being overwritten by eslint-plugin-sort-key-fix
         * to enable autofixing of this error
         *
         * https://eslint.org/docs/rules/sort-keys
         */
        "sort-keys": [
            "error",
            "asc",
            {
                caseSensitive: false
            }
        ],

        /*
         * Require variables within the same declaration block to be sorted
         *
         * https://eslint.org/docs/rules/sort-vars
         */
        "sort-vars": "error",

        /*
         * Enforce consistent spacing before blocks
         *
         * https://eslint.org/docs/rules/space-before-blocks
         */
        "space-before-blocks": [
            "error",
            {
                classes: "never",
                functions: "never",
                keywords: "never"
            }
        ],

        /*
         * Enforce consistent spacing before function definition opening parenthesis
         *
         * https://eslint.org/docs/rules/space-before-function-paren
         */
        "space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                asyncArrow: "always",
                named: "never"
            }
        ],

        /*
         * Enforce consistent spacing inside parentheses
         *
         * https://eslint.org/docs/rules/space-in-parens
         */
        "space-in-parens": ["error", "never"],

        /*
         * Require spacing around infix operators
         *
         * https://eslint.org/docs/rules/space-infix-ops
         */
        "space-infix-ops": "error",

        /*
         * Enforce consistent spacing before or after unary operators
         *
         * https://eslint.org/docs/rules/space-unary-ops
         */
        "space-unary-ops": "error",

        /*
         * Enforce consistent spacing after the // or /* in a comment
         *
         * https://eslint.org/docs/rules/spaced-comment
         */
        "spaced-comment": "error",

        /*
         * Require or disallow strict mode directives
         *
         * https://eslint.org/docs/rules/strict
         */
        strict: [
            "error",
            "never"
        ],

        /*
         * Enforce spacing around colons of switch statements
         *
         * https://eslint.org/docs/rules/switch-colon-spacing
         */
        "switch-colon-spacing": [
            "error",
            {
                after: false,
                before: true
            }
        ],

        /*
         * Require symbol descriptions
         *
         * https://eslint.org/docs/rules/symbol-description
         */
        "symbol-description": "error",

        /*
         * Require or disallow spacing around embedded expressions of template strings
         *
         * https://eslint.org/docs/rules/template-curly-spacing
         */
        "template-curly-spacing": [
            "error",
            "always"
        ],

        /*
         * Require or disallow spacing between template tags and their literals
         *
         * https://eslint.org/docs/rules/template-tag-spacing
         */
        "template-tag-spacing": "error",

        /*
         * Require or disallow Unicode byte order mark (BOM)
         *
         * https://eslint.org/docs/rules/unicode-bom
         */
        "unicode-bom": "error",

        /*
         * Require calls to isNaN() when checking for NaN
         *
         * https://eslint.org/docs/rules/use-isnan
         */
        "use-isnan": "error",

        /*
         * Enforce comparing typeof expressions against valid strings
         *
         * https://eslint.org/docs/rules/valid-typeof
         */
        "valid-typeof": "error",

        /*
         * Require var declarations be placed at the top of their containing scope
         *
         * https://eslint.org/docs/rules/vars-on-top
         */
        "vars-on-top": "error",

        /*
         * Require parentheses around immediate function invocations
         *
         * https://eslint.org/docs/rules/wrap-iife
         */
        "wrap-iife": "error",

        /*
         * Require parenthesis around regex literals
         *
         * https://eslint.org/docs/rules/wrap-regex
         */
        "wrap-regex": "error",

        /*
         * Require or disallow spacing around the * in yield* Expressions
         *
         * https://eslint.org/docs/rules/yield-star-spacing
         */
        "yield-star-spacing": "error",

        /*
         * Require or disallow "Yoda" conditions
         *
         * https://eslint.org/docs/rules/yoda
         */
        yoda: "error"

    }
};
