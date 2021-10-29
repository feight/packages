

/*
 * Possible errors Selector
 *
 * https://stylelint.io/user-guide/rules/list/#possible-errors
 */


export default {
    rules: {

        /*
         * Disallow unknown pseudo-class selectors.
         *
         * https://stylelint.io/user-guide/rules/list/selector-pseudo-class-no-unknown/
         */
        "selector-pseudo-class-no-unknown": [
            true,
            {
                ignorePseudoClasses: [

                    /*
                     * Used by css-loader when css modules are enabled.
                     *
                     * https://github.com/webpack-contrib/css-loader#scope
                     */
                    "global",
                    "local"
                ]
            }
        ],

        /*
         * Disallow unknown pseudo-element selectors.
         *
         * https://stylelint.io/user-guide/rules/list/selector-pseudo-element-no-unknown/
         */
        "selector-pseudo-element-no-unknown": true,

        /*
         * Disallow unknown type selectors.
         *
         * https://stylelint.io/user-guide/rules/list/selector-type-no-unknown/
         */
        "selector-type-no-unknown": [
            true,
            {
                ignore: [
                    "custom-elements",
                    "default-namespace"
                ],
                ignoreTypes: [
                    "page",
                    "aside",
                    "sidebar"
                ]
            }
        ]

    }
};
