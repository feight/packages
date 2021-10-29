

/*
 * Possible errors General
 *
 * https://stylelint.io/user-guide/rules/list/#possible-errors
 */


export default {
    rules: {

        /*
         * Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
         *
         * https://stylelint.io/user-guide/rules/list/no-descending-specificity/
         */
        "no-descending-specificity": null,

        /*
         * Disallow duplicate @import rules within a stylesheet.
         *
         * https://stylelint.io/user-guide/rules/list/no-duplicate-at-import-rules/
         */
        "no-duplicate-at-import-rules": true,

        /*
         * Disallow duplicate selectors.
         *
         * https://stylelint.io/user-guide/rules/list/no-duplicate-selectors/
         */
        "no-duplicate-selectors": true,

        /*
         * Disallow empty sources.
         *
         * https://stylelint.io/user-guide/rules/list/no-empty-source/
         */
        "no-empty-source": true,

        /*
         * Disallow extra semicolons (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/no-extra-semicolons/
         */
        "no-extra-semicolons": true,

        /*
         * Disallow double-slash comments (//...) which are not supported by CSS.
         *
         * https://stylelint.io/user-guide/rules/list/no-invalid-double-slash-comments/
         */
        "no-invalid-double-slash-comments": null,

        /*
         * Disallow invalid position @import rules within a stylesheet.
         *
         * https://stylelint.io/user-guide/rules/list/no-invalid-position-at-import-rule/
         */
        "no-invalid-position-at-import-rule": true

    }
};
