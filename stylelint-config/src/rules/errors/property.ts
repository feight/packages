

/*
 * Possible errors Property
 *
 * https://stylelint.io/user-guide/rules/list/#possible-errors
 */


export default {
    rules: {

        /*
         * Disallow unknown properties.
         *
         * https://stylelint.io/user-guide/rules/list/property-no-unknown/
         */
        "property-no-unknown": [
            true,
            {
                ignoreProperties: [
                    "box-align",
                    "box-pack",
                    "composes",
                    "font-feature-settings",
                    "font-smoothing",
                    "tap-highlight-color",
                    "user-drag"
                ]
            }
        ]

    }
};

