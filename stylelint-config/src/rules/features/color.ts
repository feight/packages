

/*
 * Limit language features Color
 *
 * https://stylelint.io/user-guide/rules/#limit-language-features
 */


export default {
    rules: {

        /*
         * Specify modern or legacy notation for applicable color-functions.
         *
         * https://stylelint.io/user-guide/rules/color-function-notation/
         */
        "color-function-notation": "modern",

        /*
         * Require (where possible) or disallow named colors.
         *
         * https://stylelint.io/user-guide/rules/color-named/
         */
        "color-named": "never",

        /*
         * Disallow hex colors.
         *
         * Off for now because we like hex colors
         *
         * https://stylelint.io/user-guide/rules/color-no-hex/
         */
        "color-no-hex": null

    }
};
