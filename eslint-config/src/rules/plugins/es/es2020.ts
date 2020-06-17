

/*
 *
 *
 * https://mysticatea.github.io/eslint-plugin-es/rules/#es2020
 */

export default {
    rules: {

        /*
         * Disallow `bigint` syntax and built-ins
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-bigint.html
         */
        "es/no-bigint": "off",

        /*
         * Disallow `import()` syntax
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-dynamic-import.html
         */
        "es/no-dynamic-import": "off",

        /*
         * Disallow the globalThis variable
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-global-this.html
         */
        "es/no-global-this": "off",

        /*
         * Disallow 'Promise.allSettled' function
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-promise-all-settled.html
         */
        "es/no-promise-all-settled": "off"

    }
};
