

/*
 * Stylistic issues Function
 *
 * https://stylelint.io/user-guide/rules/list/#stylistic-issues
 */


export default {
    rules: {

        /*
         * Require a newline or disallow whitespace after the commas of functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-comma-newline-after/
         */
        "function-comma-newline-after": "always-multi-line",

        /*
         * Require a newline or disallow whitespace before the commas of functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-comma-newline-before/
         */
        "function-comma-newline-before": "never-multi-line",

        /*
         * Require a single space or disallow whitespace after the commas of functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-comma-space-after/
         */
        "function-comma-space-after": "always",

        /*
         * Require a single space or disallow whitespace before the commas of functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-comma-space-before/
         */
        "function-comma-space-before": "never",

        /*
         * Limit the number of adjacent empty lines within functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-max-empty-lines/
         */
        "function-max-empty-lines": 0,

        /*
         * Specify lowercase or uppercase for function names (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-name-case/
         */
        "function-name-case": "lower",

        /*
         * Require a newline or disallow whitespace on the inside of the parentheses of functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-parentheses-newline-inside/
         */
        "function-parentheses-newline-inside": "always-multi-line",

        /*
         * Require a single space or disallow whitespace on the inside of the parentheses of functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-parentheses-space-inside/
         */
        "function-parentheses-space-inside": "never-single-line",

        /*
         * Require or disallow quotes for urls.
         *
         * https://stylelint.io/user-guide/rules/list/function-url-quotes/
         */
        "function-url-quotes": "always",

        /*
         * Require or disallow whitespace after functions (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/function-whitespace-after/
         */
        "function-whitespace-after": "always"

    }
};
