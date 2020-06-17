

/*
 * SCSS specific linting rules: @if
 *
 * https://github.com/kristerkari/stylelint-scss#-if
 */


export default {
    rules: {

        /*
         * Require or disallow a newline after the closing brace of @if statements (Autofixable).
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules//README.md
         */
        "scss/at-if-closing-brace-newline-after": "always-last-in-chain",

        /*
         * Require a single space or disallow whitespace after the closing brace of @if statements (Autofixable).
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules//README.md
         */
        "scss/at-if-closing-brace-space-after": "never-intermediate",

        /*
         * Check for equality to null is unnecessarily explicit since null is falsey in Sass.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/at-if-no-null/README.md
         */
        "scss/at-if-no-null": true

    }
};
