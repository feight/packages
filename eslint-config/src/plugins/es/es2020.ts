

/*
 *
 *
 * https://eslint-plugin-es.mysticatea.dev/rules/#es2020
 */

export default {
    rules: {

        /*
         * Disallow `bigint` syntax and built-ins
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-bigint.html
         */
        "es/no-bigint": "off",

        /*
         * Disallow `import()` syntax
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-dynamic-import.html
         */
        "es/no-dynamic-import": "off",

        /*
         * Disallow export * as ns
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-export-ns-from.html
         */
        "es/no-export-ns-from": "off",

        /*
         * Disallow the globalThis variable
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-global-this.html
         */
        "es/no-global-this": "off",

        /*
         * Disallow import.meta meta property
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-import-meta.html
         */
        "es/no-import-meta": "off",

        /*
         * Disallow nullish coalescing operators
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-nullish-coalescing-operators.html
         */
        "es/no-nullish-coalescing-operators": "off",

        /*
         * Disallow optional chaining
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-optional-chaining.html
         */
        "es/no-optional-chaining": "off",

        /*
         * Disallow 'Promise.allSettled' function
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-promise-all-settled.html
         */
        "es/no-promise-all-settled": "off"

    }
};
