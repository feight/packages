

/*
 *
 *
 * https://mysticatea.github.io/eslint-plugin-es/rules/#es2019
 */

export default {
    rules: {

        /*
         * Disallow \u2028 and \u2029 in string literals.
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-json-superset.html
         */
        "es/no-json-superset": "off",

        /*
         * Disallow optional catch binding.
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-optional-catch-binding.html
         */
        "es/no-optional-catch-binding": "off",

        /*
         * Disallow the new values of RegExp Unicode property escape sequences in ES2019
         *
         * https://mysticatea.github.io/eslint-plugin-es/rules/no-regexp-unicode-property-escapes-2019.html
         */
        "es/no-regexp-unicode-property-escapes-2019": "off"

    }
};
