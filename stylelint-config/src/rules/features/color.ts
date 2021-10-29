

/*
 * Limit language features Color
 *
 * https://stylelint.io/user-guide/rules/list/#limit-language-features
 */


export default {
    rules: {

        /*
         * Specify modern or legacy notation for applicable color-functions.
         *
         * https://stylelint.io/user-guide/rules/list/color-function-notation/
         */
        "color-function-notation": "modern",

        /*
         * Require or disallow alpha channel for hex colors.
         *
         * https://stylelint.io/user-guide/rules/list/color-hex-alpha/
         */
        "color-hex-alpha": null,

        /*
         * Require (where possible) or disallow named colors.
         *
         * https://stylelint.io/user-guide/rules/list/color-named/
         */
        "color-named": "never",

        /*
         * Disallow hex colors.
         *
         * Off for now because we like hex colors
         *
         * https://stylelint.io/user-guide/rules/list/color-no-hex/
         */
        "color-no-hex": null

    }
};
