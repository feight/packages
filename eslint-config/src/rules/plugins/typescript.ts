

import { noMagicNumbersConfig } from "../../settings";

/*
 * Lint rules for the TypeScript language.
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
 */


const rules = {

    /*
     * Require that member overloads be consecutive (adjacent-overload-signatures from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
     */
    "@typescript-eslint/adjacent-overload-signatures": "error",

    /*
     * Requires using either T[] or Array<T> for arrays (array-type from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
     */
    "@typescript-eslint/array-type": "error",

    /*
     * Disallows awaiting a value that is not a Promise (await-thenable)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
     */
    "@typescript-eslint/await-thenable": "error",

    /*
     * Bans // @ts-<directive> comments from being used
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
     */
    "@typescript-eslint/ban-ts-comment": "error",

    /*
     * Bans // tslint:<rule-flag> comments from being used
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
     */
    "@typescript-eslint/ban-tslint-comment": "error",

    /*
     * Enforces that types will not to be used (ban-types from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
     */
    "@typescript-eslint/ban-types": "error",

    /*
     * Enforce consistent brace style for blocks
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
     */
    "@typescript-eslint/brace-style": "error",

    /*
     * Ensures that literals on classes are exposed in a consistent style
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md
     */
    "@typescript-eslint/class-literal-property-style": "error",

    /*
     * Enforces consistent spacing before and after commas
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
     */
    "@typescript-eslint/comma-spacing": "error",

    /*
     * Enforces consistent usage of type assertions.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
     */
    "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "allow"
        }
    ],

    /*
     * Consistent with type definition either interface or type
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
     */
    "@typescript-eslint/consistent-type-definitions": [
        "error",
        "interface"
    ],

    /*
     * Enforce default parameters to be last
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
     */
    "@typescript-eslint/default-param-last": "error",

    /*
     * Enforce dot notation whenever possible
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
     */
    "@typescript-eslint/dot-notation": "error",

    /*
     * Require explicit return types on functions and class methods
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
     */
    "@typescript-eslint/explicit-function-return-type": "error",

    /*
     * Require explicit accessibility modifiers on class properties and methods (member-access from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
     */
    "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
            accessibility: "no-public"
        }
    ],

    /*
     * Require explicit return and argument types on exported functions' and classes' public class methods
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     */
    "@typescript-eslint/explicit-module-boundary-types": "error",

    /*
     * Require or disallow spacing between function identifiers and their invocations (func-call-spacing)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
     */
    "@typescript-eslint/func-call-spacing": "error",

    /*
     * Enforce consistent indentation (indent from TSLint)
     *
     * This is off because it's handled by the built in eslint indent rule,
     * and in some cases it can conflict.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
     */
    "@typescript-eslint/indent": "off",

    /*
     * Require or disallow initialization in variable declarations
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
     */
    "@typescript-eslint/init-declarations": [
        "error",
        "always"
    ],

    /*
     * Enforce consistent spacing before and after keywords
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
     */
    "@typescript-eslint/keyword-spacing": [
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
     * Require or disallow an empty line between class members
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
     */
    "@typescript-eslint/lines-between-class-members": [
        "error",
        "always",
        {
            exceptAfterSingleLine: true
        }
    ],

    /*
     * Require a specific member delimiter style for interfaces and type literals
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
     */
    "@typescript-eslint/member-delimiter-style": "error",

    /*
     * Require a consistent member declaration order (member-ordering from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
     */
    "@typescript-eslint/member-ordering": [
        "error",
        {
            default: [
                "public-static-field",
                "protected-static-field",
                "private-static-field",
                "public-instance-field",
                "protected-instance-field",
                "private-instance-field",
                "public-field",
                "protected-field",
                "private-field",
                "static-field",
                "instance-field",
                "field",
                "constructor",
                "public-static-method",
                "protected-static-method",
                "private-static-method",
                "public-instance-method",
                "protected-instance-method",
                "private-instance-method",
                "public-method",
                "protected-method",
                "private-method",
                "static-method",
                "instance-method",
                "method"
            ]
        }
    ],

    /*
     * Enforces using a particular method signature syntax.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
     */
    "@typescript-eslint/method-signature-style": "error",

    /*
     * Enforces naming conventions for everything across a codebase
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
     */
    "@typescript-eslint/naming-convention": [
        "error",
        {
            format: [
                "camelCase"
            ],
            selector: "default"
        },
        {
            format: [
                "camelCase",
                "PascalCase",
                "UPPER_CASE"
            ],
            selector: "variable"
        },
        {
            format: [
                "camelCase",
                "PascalCase"
            ],
            selector: "property"
        },
        {
            format: [
                "camelCase",
                "PascalCase"
            ],
            leadingUnderscore: "forbid",
            selector: "parameter"
        },
        {
            format: ["camelCase"],
            leadingUnderscore: "forbid",
            modifiers: ["private"],
            selector: "memberLike"
        },
        {
            format: ["PascalCase"],
            selector: "typeLike"
        },
        {
            format: ["PascalCase"],
            selector: "class"
        }
    ],

    /*
     * Disallow generic Array constructors
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
     */
    "@typescript-eslint/no-array-constructor": "error",

    /*
     * Requires that .toString() is only called on objects which provide useful information when stringified (no-base-to-string)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
     */
    "@typescript-eslint/no-base-to-string": "error",

    /*
     * Disallow non-null assertion in locations that may be confusing
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
     */
    "@typescript-eslint/no-confusing-non-null-assertion": "error",

    /*
     * Disallow duplicate class members
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
     */
    "@typescript-eslint/no-dupe-class-members": "error",

    /*
     * Disallow the delete operator with computed key expressions
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
     */
    "@typescript-eslint/no-dynamic-delete": "error",

    /*
     * Disallow Empty Functions
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
     */
    "@typescript-eslint/no-empty-function": "error",

    /*
     * Disallow the declaration of empty interfaces (no-empty-interface from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
     */
    "@typescript-eslint/no-empty-interface": "error",

    /*
     * Disallow usage of the any type (no-any from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
     */
    "@typescript-eslint/no-explicit-any": "error",

    /*
     * Disallow extra non-null assertion
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
     */
    "@typescript-eslint/no-extra-non-null-assertion": "error",

    /*
     * Disallow unnecessary parentheses
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
     */
    "@typescript-eslint/no-extra-parens": [
        "error",
        "all",
        {
            ignoreJSX: "multi-line"
        }
    ],

    /*
     * Disallow unnecessary semicolons
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
     */
    "@typescript-eslint/no-extra-semi": "error",

    /*
     * Forbids the use of classes as namespaces (no-unnecessary-class from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
     */
    "@typescript-eslint/no-extraneous-class": "error",

    /*
     * Requires Promise-like values to be handled appropriately
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
     */
    "@typescript-eslint/no-floating-promises": "error",

    /*
     * Disallow iterating over an array with a for-in loop (no-for-in-array)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
     */
    "@typescript-eslint/no-for-in-array": "error",

    /*
     * Disallow the use of eval()-like methods
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
     */
    "@typescript-eslint/no-implied-eval": "error",

    /*
     * Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean. (no-inferrable-types from TSLint)
     *
     * This is off for now
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
     */
    "@typescript-eslint/no-inferrable-types": "error",

    /*
     * Disallow this keywords outside of classes or class-like objects
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
     */
    "@typescript-eslint/no-invalid-this": "error",

    /*
     * Disallows usage of void type outside of return types or generic type arguments.
     * If void is used as return type, it shouldn’t be a part of intersection/union type.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
     */
    "@typescript-eslint/no-invalid-void-type": "error",

    /*
     * Disallow literal numbers that lose precision
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
     */
    "@typescript-eslint/no-loss-of-precision": "error",

    /*
     * Disallow Magic Numbers
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
     */
    "@typescript-eslint/no-magic-numbers": [
        "error",
        noMagicNumbersConfig
    ],

    /*
     * Enforce valid definition of new and constructor. (no-misused-new from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
     */
    "@typescript-eslint/no-misused-new": "error",

    /*
     * Avoid using promises in places not designed to handle them
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
     */
    "@typescript-eslint/no-misused-promises": "error",

    /*
     * Disallow the use of custom TypeScript modules and namespaces (no-namespace from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
     */
    "@typescript-eslint/no-namespace": "error",

    /*
     * Disallows using a non-null assertion after an optional chain expression
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
     */
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

    /*
     * Disallows non-null assertions using the ! postfix operator (no-non-null-assertion from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
     */
    "@typescript-eslint/no-non-null-assertion": "error",

    /*
     * Disallow the use of parameter properties in class constructors. (no-parameter-properties from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
     */
    "@typescript-eslint/no-parameter-properties": "error",

    /*
     * Prefer the newer ES6-style imports over require().
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
     */
    "@typescript-eslint/no-require-imports": "error",

    /*
     * Disallow aliasing this (no-this-assignment from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
     */
    "@typescript-eslint/no-this-alias": "error",

    /*
     * Disallow throwing literals as exceptions
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
     */
    "@typescript-eslint/no-throw-literal": "error",

    /*
     * Disallow the use of type aliases (interface-over-type-literal from TSLint)
     *
     * Off for now because these seem like they're too useful to pass up
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
     */
    "@typescript-eslint/no-type-alias": "off",

    /*
     * Flags unnecessary equality comparisons against boolean literals
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
     */
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

    /*
     * Condition expressions must be necessary
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
     */
    "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
            allowConstantLoopConditions: true
        }
    ],

    /*
     * Warns when a namespace qualifier is unnecessary.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
     */
    "@typescript-eslint/no-unnecessary-qualifier": "error",

    /*
     * Enforces that types will not to be used
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
     */
    "@typescript-eslint/no-unnecessary-type-arguments": "error",

    /*
     * Warns if a type assertion does not change the type of an expression (no-unnecessary-type-assertion from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
     */
    "@typescript-eslint/no-unnecessary-type-assertion": "error",

    /*
     * Disallows assigning any to variables and properties
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
     */
    "@typescript-eslint/no-unsafe-assignment": "error",

    /*
     * Disallows calling an any type value
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
     */
    "@typescript-eslint/no-unsafe-call": "error",

    /*
     * Disallows member access on any typed variables
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
     */
    "@typescript-eslint/no-unsafe-member-access": "error",

    /*
     * Disallows returning any from a function
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
     */
    "@typescript-eslint/no-unsafe-return": "error",

    /*
     * Disallow unused expressions
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
     */
    "@typescript-eslint/no-unused-expressions": "error",

    /*
     * Disallow unused variables (no-unused-variable from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
     */
    "@typescript-eslint/no-unused-vars": "error",

    /*
     * Disallow unused variables and arguments
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md
     */
    "@typescript-eslint/no-unused-vars-experimental": [
        "error",
        {
            ignoreArgsIfArgsAfterAreUsed: true
        }
    ],

    /*
     * Disallow the use of variables before they are defined
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
     */
    "@typescript-eslint/no-use-before-define": "error",

    /*
     * Disallow unnecessary constructors
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
     */
    "@typescript-eslint/no-useless-constructor": "error",

    /*
     * Disallows the use of require statements except in import statements (no-var-requires from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
     */
    "@typescript-eslint/no-var-requires": "error",

    /*
     * Prefer usage of as const over literal type
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
     */
    "@typescript-eslint/prefer-as-const": "error",

    /*
     * Use for-of loops instead of standard for loops over arrays
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
     */
    "@typescript-eslint/prefer-for-of": "error",

    /*
     * Use function types instead of interfaces with call signatures
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
     */
    "@typescript-eslint/prefer-function-type": "error",

    /*
     * Enforce includes method over indexOf method
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
     */
    "@typescript-eslint/prefer-includes": "error",

    /*
     * Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules. (no-internal-module from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
     */
    "@typescript-eslint/prefer-namespace-keyword": "error",

    /*
     * Enforce the usage of the nullish coalescing operator instead of logical chaining
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
     */
    "@typescript-eslint/prefer-nullish-coalescing": "error",

    /*
     * Prefer using concise optional chain expressions instead of chained logical ands
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
     */
    "@typescript-eslint/prefer-optional-chain": "error",

    /*
     * Require never-modified private members be marked as readonly
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
     */
    "@typescript-eslint/prefer-readonly": "error",

    /*
     * Requires that function parameters are typed as readonly to prevent accidental mutation of inputs
     *
     * Appears like there are bugs in the rule and it's covered by no-param-reassign.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
     */
    "@typescript-eslint/prefer-readonly-parameter-types": "off",

    /*
     * Prefer using type parameter when calling Array#reduce instead of casting
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
     */
    "@typescript-eslint/prefer-reduce-type-parameter": "error",

    /*
     * Enforce to use RegExp#exec over String#match
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
     */
    "@typescript-eslint/prefer-regexp-exec": "error",

    /*
     * Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
     */
    "@typescript-eslint/prefer-string-starts-ends-with": "error",

    /*
     * Recommends using // @ts-expect-error over // @ts-ignore
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
     */
    "@typescript-eslint/prefer-ts-expect-error": "error",

    /*
     * Functions that return promises must be async
     *
     * This is off for now because it conflicts with require-await in some cases
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
     */
    "@typescript-eslint/promise-function-async": "off",

    /*
     * Enforce the consistent use of either backticks, double, or single quotes
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
     */
    "@typescript-eslint/quotes": "error",

    /*
     * Enforce giving compare argument to Array#sort
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
     */
    "@typescript-eslint/require-array-sort-compare": "error",

    /*
     * Disallow async functions which have no await expression
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
     */
    "@typescript-eslint/require-await": "error",

    /*
     * When adding two variables, operands must both be of type number or of type string. (restrict-plus-operands from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
     */
    "@typescript-eslint/restrict-plus-operands": "error",

    /*
     * Enforce template literal expressions to be of string type.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
     */
    "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
            allowBoolean: true,
            allowNullable: false,
            allowNumber: true
        }
    ],

    /*
     * Require/Disallow returning awaited values in specific contexts
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
     */
    "@typescript-eslint/return-await": "error",

    /*
     * Require or disallow semicolons instead of ASI
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
     */
    "@typescript-eslint/semi": "error",

    /*
     * Require or disallow a space before function parenthesis
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
     */
    "@typescript-eslint/space-before-function-paren": [
        "error",
        {
            anonymous: "never",
            asyncArrow: "always",
            named: "never"
        }
    ],

    /*
     * Boolean expressions are limited to booleans
     *
     * Off until ignoreRhs lands
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
     */
    "@typescript-eslint/strict-boolean-expressions": "off",

    /*
     * Exhaustiveness checking in switch with union type
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
     */
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    /*
     * Sets preference level for triple slash directives versus ES6-style import declarations.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
     */
    "@typescript-eslint/triple-slash-reference": [
        "error",
        {
            lib: "never",
            path: "never",
            types: "never"
        }
    ],

    /*
     * Require consistent spacing around type annotations (typedef-whitespace from TSLint)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
     */
    "@typescript-eslint/type-annotation-spacing": "error",

    /*
     * Require type annotations to exist
     *
     * Off for now because requiring type annotations unnecessarily can be cumbersome
     * to maintain and generally reduces code readability. TypeScript is often
     * better at inferring types than easily written type annotations would allow.
     * Instead of enabling typedef, it is generally recommended to use the --noImplicitAny
     * and/or --strictPropertyInitialization compiler options to enforce type
     * annotations only when useful. (we do this)
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
     */
    "@typescript-eslint/typedef": "off",

    /*
     * Enforces unbound methods are called with their expected scope.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
     */
    "@typescript-eslint/unbound-method": "error",

    /*
     * Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter.
     *
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
     */
    "@typescript-eslint/unified-signatures": "error"

};


export default {
    rules
};
