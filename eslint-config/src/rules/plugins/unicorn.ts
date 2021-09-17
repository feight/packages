

/*
 * Various awesome ESLint rules
 *
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 */


export default {
    plugins: ["unicorn"],
    rules: {

        /*
         * Enforce the use of regex shorthands to improve readability. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/better-regex.md
         */
        "unicorn/better-regex": "error",

        /*
         * Enforce a specific parameter name in catch clauses.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/catch-error-name.md
         */
        "unicorn/catch-error-name": [
            "error",
            {
                name: "error"
            }
        ],

        /*
         * Use destructured variables over properties
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/consistent-destructuring.md
         */

        "unicorn/consistent-destructuring": "error",

        /*
         * Move function definitions to the highest possible scope.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/consistent-function-scoping.md
         */
        "unicorn/consistent-function-scoping": "error",

        /*
         * Enforce correct Error subclassing. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/custom-error-definition.md
         */
        "unicorn/custom-error-definition": "error",

        /*
         * Enforce no spaces between braces. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/empty-brace-spaces.md
         */
        "unicorn/empty-brace-spaces": "error",

        /*
         * Enforce passing a message value when throwing a built-in error.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/error-message.md
         */
        "unicorn/error-message": "error",

        /*
         * Require escape sequences to use uppercase values. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/escape-case.md
         */
        "unicorn/escape-case": "error",

        /*
         * Add expiration conditions to TODO comments
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/expiring-todo-comments.md
         */
        "unicorn/expiring-todo-comments": "error",

        /*
         * Enforce explicitly comparing the length property of a value. (partly fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/explicit-length-check.md
         */
        "unicorn/explicit-length-check": "error",

        /*
         * Enforce a case style for filenames.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/filename-case.md
         */
        "unicorn/filename-case": [
            "error",
            {
                case: "kebabCase"
            }
        ],

        /*
         * Enforce importing index files with .. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/import-index.md
         */
        "unicorn/import-index": "error",

        /*
         * Enforce specific import styles per module
         *
         * Off for now...
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/import-style.md
         */
        "unicorn/import-style": "off",

        /*
         * Enforce the use of new for all builtins, except String, Number and Boolean. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/new-for-builtins.md
         */
        "unicorn/new-for-builtins": "error",

        /*
         * Enforce specifying rules to disable in eslint-disable comments.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-abusive-eslint-disable.md
         */
        "unicorn/no-abusive-eslint-disable": "error",

        /*
         * Prevent passing a function reference directly to iterator methods
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-array-callback-reference.md
         */
        "unicorn/no-array-callback-reference": "error",

        /*
         * Prefer for...of over Array#forEach(...)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-array-for-each.md
         */
        "unicorn/no-array-for-each": "error",

        /*
         * Disallow using the this argument in array methods
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-array-method-this-argument.md
         */
        "unicorn/no-array-method-this-argument": "error",

        /*
         * Enforce combining multiple Array#push() into one call
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-array-push-push.md
         */
        "unicorn/no-array-push-push": "error",

        /*
         * Disallow Array#reduce() and Array#reduceRight()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-array-reduce.md
         */
        "unicorn/no-array-reduce": "error",

        /*
         * Do not use leading/trailing space between console.log parameters. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-console-spaces.md
         */
        "unicorn/no-console-spaces": "error",

        /*
         * Do not use document.cookie directly
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-document-cookie.md
         */
        "unicorn/no-document-cookie": "error",

        /*
         * Do not use a for loop that can be replaced with a for-of loop
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-for-loop.md
         */
        "unicorn/no-for-loop": "error",

        /*
         * Enforce the use of unicode escapes instead of hexadecimal escapes. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-hex-escape.md
         */
        "unicorn/no-hex-escape": "error",

        /*
         * Require Array.isArray() instead of instanceof Array
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-instanceof-array.md
         */
        "unicorn/no-instanceof-array": "error",

        /*
         * Prevent calling EventTarget#removeEventListener() with the result of an expression
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-invalid-remove-event-listener.md
         */
        "unicorn/no-invalid-remove-event-listener": "error",

        /*
         * Disallow identifiers starting with new or class
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-keyword-prefix.md
         */
        "unicorn/no-keyword-prefix": "off",

        /*
         * Disallow if statements as the only statement in if blocks without else
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-lonely-if.md
         */
        "unicorn/no-lonely-if": "error",

        /*
         * Disallow nested ternary expressions. (partly fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-nested-ternary.md
         */
        "unicorn/no-nested-ternary": "error",

        /*
         * Disallow new Array()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-new-array.md
         */
        "unicorn/no-new-array": "error",

        /*
         * Enforce the use of Buffer.from() and Buffer.alloc() instead of the deprecated new Buffer(). (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-new-buffer.md
         */
        "unicorn/no-new-buffer": "error",

        /*
         * Disallow the use of the null literal, to encourage using undefined instead.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-null.md
         */
        "unicorn/no-null": "error",

        /*
         * Disallow the use of objects as default parameters
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/unicorn/no-object-as-default-parameter.md
         */
        "unicorn/no-object-as-default-parameter": "error",

        /*
         * Disallow process.exit().
         *
         * Handled by 'node/no-process-exit'
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-process-exit.md
         */
        "unicorn/no-process-exit": "off",

        /*
         * Forbid classes that only have static members
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-static-only-class.md
         */
        "unicorn/no-static-only-class": "error",

        /*
         * Disallow assigning this to a variable
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-this-assignment.md
         */
        "unicorn/no-this-assignment": "error",

        /*
         * Disallow unreadable array destructuring.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-unreadable-array-destructuring.md
         */
        "unicorn/no-unreadable-array-destructuring": "error",

        /*
         * Disallow unsafe regular expressions.
         *
         * Turned off here because 'security/detect-unsafe-regex' takes care of this
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-unsafe-regex.md
         */
        "unicorn/no-unsafe-regex": "off",

        /*
         * Disallow unused object properties.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-unused-properties.md
         */
        "unicorn/no-unused-properties": "error",

        /*
         * Forbid useless fallback when spreading in object literals
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-useless-fallback-in-spread.md
         */
        "unicorn/no-useless-fallback-in-spread": "error",

        /*
         * Disallow useless array length check
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-useless-length-check.md
         */
        "unicorn/no-useless-length-check": "error",

        /*
         * Disallow useless spread
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-useless-spread.md
         */
        "unicorn/no-useless-spread": "error",

        /*
         * Disallow useless undefined
         *
         * This conflicts with @typescript-eslint/init-declarations
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-useless-undefined.md
         */
        "unicorn/no-useless-undefined": "off",

        /*
         * Disallow number literals with zero fractions or dangling dots
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/no-zero-fractions.md
         */
        "unicorn/no-zero-fractions": "error",

        /*
         * Enforce lowercase identifier and uppercase value for number literals. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/number-literal-case.md
         */
        "unicorn/number-literal-case": "error",

        /*
         * Enforce the style of numeric separators by correctly grouping digits
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/numeric-separators-style.md
         */
        "unicorn/numeric-separators-style": "error",

        /*
         * Prefer addEventListener over on-functions. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-add-event-listener.md
         */
        "unicorn/prefer-add-event-listener": "error",

        /*
         * Prefer .find(...) over the first element from .filter(...)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-array-find.md
         */
        "unicorn/prefer-array-find": "error",

        /*
         * Prefer Array#flat() over legacy techniques to flatten arrays
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-array-flat.md
         */
        "unicorn/prefer-array-flat": "error",

        /*
         * Prefer .flatMap(...) over .map(...).flat()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-array-flat-map.md
         */
        "unicorn/prefer-array-flat-map": "error",

        /*
         * Prefer Array#indexOf() over Array#findIndex() when looking for the index of an item
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-array-index-of.md
         */
        "unicorn/prefer-array-index-of": "error",

        /*
         * Prefer .some(...) over .find(...).
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-array-some.md
         */
        "unicorn/prefer-array-some": "error",

        /*
         * Prefer .at() method for index access and String#charAt()
         *
         * This breaks typescript array typings at the moment
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-at.md
         */
        "unicorn/prefer-at": "off",

        /*
         * Prefer Date.now() to get the number of milliseconds since the Unix Epoch
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-date-now.md
         */
        "unicorn/prefer-date-now": "error",

        /*
         * Prefer default parameters over reassignment
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-default-parameters.md
         */
        "unicorn/prefer-default-parameters": "error",

        /*
         * Prefer Node#append() over Node#appendChild()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-dom-node-append.md
         */
        "unicorn/prefer-dom-node-append": "error",

        /*
         * Prefer using .dataset on DOM elements over .setAttribute(...)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-dom-node-dataset.md
         */
        "unicorn/prefer-dom-node-dataset": "error",

        /*
         * Prefer childNode.remove() over parentNode.removeChild(childNode)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-dom-node-remove.md
         */
        "unicorn/prefer-dom-node-remove": "error",

        /*
         * Prefer .textContent over .innerText
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-dom-node-text-content.md
         */
        "unicorn/prefer-dom-node-text-content": "error",

        /*
         * Prefer .includes() over .indexOf() when checking for existence or non-existence
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-includes.md
         */
        "unicorn/prefer-includes": "error",

        /*
         * Prefer KeyboardEvent#key over KeyboardEvent#keyCode
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-keyboard-event-key.md
         */
        "unicorn/prefer-keyboard-event-key": "error",

        /*
         * Enforce the use of Math.trunc instead of bitwise operators. (partly fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-math-trunc.md
         */
        "unicorn/prefer-math-trunc": "error",

        /*
         * Prefer modern DOM APIs
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-modern-dom-apis.md
         */
        "unicorn/prefer-modern-dom-apis": "error",

        /*
         * Prefer JavaScript modules (ESM) over CommonJS
         *
         * This is only a problem in node 16 - so it's off for now
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-module.md
         */
        "unicorn/prefer-module": "off",

        /*
         * Prefer negative index over .length - index for {String,Array,TypedArray}#slice() and Array#splice()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-negative-index.md
         */
        "unicorn/prefer-negative-index": "error",

        /*
         * Prefer using the node: protocol when importing Node.js builtin modules
         *
         * Off for now since this isn't supported in node < 16 in require() and we compile down to require()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-node-protocol.md
         */
        "unicorn/prefer-node-protocol": "off",

        /*
         * Prefer Number static properties over global ones.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-number-properties.md
         */
        "unicorn/prefer-number-properties": "error",

        /*
         * Prefer using Object.fromEntries(…) to transform a list of key-value pairs into an object
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-object-from-entries.md
         */
        "unicorn/prefer-object-from-entries": "error",

        /*
         * Prefer Object.hasOwn(...) over Object.prototype.hasOwnProperty.call(...)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-object-has-own.md
         */
        "unicorn/prefer-object-has-own": "error",

        /*
         * Prefer omitting the catch binding parameter
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-optional-catch-binding.md
         */
        "unicorn/prefer-optional-catch-binding": "error",

        /*
         * Prefer borrowing methods from the prototype instead of methods from an instance
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-prototype-methods.md
         */
        "unicorn/prefer-prototype-methods": "error",

        /*
         * Prefer String#replaceAll() over regex searches with the global flag
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-replace-all.md
         */
        "unicorn/prefer-query-selector": "error",

        /*
         * Prefer querySelector over getElementById, querySelectorAll over getElementsByClassName and getElementsByTagName. (partly fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-query-selector.md
         */
        "unicorn/prefer-reflect-apply": "error",

        /*
         * Prefer RegExp#test() over String#match() and RegExp#exec()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-regexp-test.md
         */
        "unicorn/prefer-regexp-test": "error",

        /*
         * Prefer Set#has() over Array#includes() when checking for existence or non-existenc (fixable)
         *
         * It's a bit heavy handed to use this right now.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-set-has.md
         */
        "unicorn/prefer-set-has": "off",

        /*
         * Prefer the spread operator over Array.from(). (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-spread.md
         */
        "unicorn/prefer-spread": "error",

        /*
         * Prefer String#replaceAll() over regex searches with the global flag
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-string-replace-all.md
         */
        "unicorn/prefer-string-replace-all": "error",

        /*
         * Prefer String#slice() over String#substr() and String#substring()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-string-slice.md
         */
        "unicorn/prefer-string-slice": "error",

        /*
         * Prefer String#startsWith() & String#endsWith() over more complex alternatives
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-string-starts-ends-with.md
         */
        "unicorn/prefer-string-starts-ends-with": "error",

        /*
         * Prefer String#trimStart() / String#trimEnd() over String#trimLeft() / String#trimRight()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-string-trim-start-end.md
         */
        "unicorn/prefer-string-trim-start-end": "error",

        /*
         * Prefer switch over multiple else-if
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-switch.md
         */
        "unicorn/prefer-switch": [
            "error",
            {
                emptyDefaultCase: "do-nothing-comment",
                minimumCases: 3
            }
        ],

        /*
         * Prefer ternary expressions over simple if-else statements
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-ternary.md
         */
        "unicorn/prefer-ternary": "error",

        /*
         * Prefer top-level await over top-level promises and async function calls
         *
         * Off for now because we don't have ESM yet
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-top-level-await.md
         */
        "unicorn/prefer-top-level-await": "off",

        /*
         * Enforce throwing TypeError in type checking conditions. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-type-error.md
         */
        "unicorn/prefer-type-error": "error",

        /*
         * Prevent abbreviations
         *
         * Heres a list of the defaults:
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/rules/prevent-abbreviations.js#L13
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prevent-abbreviations.md
         */
        "unicorn/prevent-abbreviations": [
            "error",
            {

                /*
                 * We disable this because of how often Objects are used to interface
                 * with third party code, and we don't want to eslint-ignore all of that.
                 */
                checkProperties: false,
                replacements: {
                    args: {
                        // This is a reserved keyword in some cases - don't replace into this
                        arguments: false
                    },
                    doc: {
                        // Term isn't overloaded - allow abbreviation
                        document: true
                    },
                    docs: {
                        // Term isn't overloaded - allow abbreviation
                        documents: true
                    },
                    env: {
                        // Term isn't overloaded - allow abbreviation
                        environment: true
                    },
                    envs: {
                        // Term isn't overloaded - allow abbreviation
                        environments: true
                    },
                    param: {
                        // This is used extremely frequently in react-router-dom and we don't want to change it
                        parameter: false
                    },
                    params: {
                        // This is used extremely frequently in react-router-dom and we don't want to change it
                        parameters: false
                    },
                    props: {
                        // This is used extremely frequently in react and we don't want to change it
                        properties: false
                    }
                }
            }
        ],

        /*
         * Enforce using the separator argument with Array#join()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/require-array-join-separator.md
         */
        "unicorn/require-array-join-separator": "error",

        /*
         * Enforce using the digits argument with Number#toFixed()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/require-number-to-fixed-digits-argument.md
         */
        "unicorn/require-number-to-fixed-digits-argument": "error",

        /*
         * Enforce using the targetOrigin argument with window.postMessage()
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/require-post-message-target-origin.md
         */
        "unicorn/require-post-message-target-origin": "error",

        /*
         * Enforce certain things about the contents of strings. For example, you
         * can enforce using ’ instead of ' to avoid escaping. Or you could block
         * some words. The possibilities are endless.
         *
         * Not using this for now because I can't think of a good use case.
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/string-content.md
         */
        "unicorn/string-content": "off",

        /*
         * Require new when throwing an error. (fixable)
         *
         * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/throw-new-error.md
         */
        "unicorn/throw-new-error": "error"

    }
};

