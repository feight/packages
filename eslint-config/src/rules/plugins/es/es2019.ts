

/*
 *
 *
 * https://eslint-plugin-es.mysticatea.dev/rules/#es2019
 */

export default {
    rules: {

        /*
         * Disallow \u2028 and \u2029 in string literals.
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-json-superset.html
         */
        "es/no-json-superset": "off",

        /*
         * Disallow the Object.fromEntries method
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-object-fromentries.html
         */
        "es/no-object-fromentries": "off",

        /*
         * Disallow optional catch binding.
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-optional-catch-binding.html
         */
        "es/no-optional-catch-binding": "off",

        /*
         * Disallow the new values of RegExp Unicode property escape sequences in ES2019
         *
         * https://eslint-plugin-es.mysticatea.dev/rules/no-regexp-unicode-property-escapes-2019.html
         */
        "es/no-regexp-unicode-property-escapes-2019": "off"

    }
};
