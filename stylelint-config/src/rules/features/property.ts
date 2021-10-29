

/*
 * Limit language features Property
 *
 * https://stylelint.io/user-guide/rules/list/#limit-language-features
 */


export default {
    rules: {


        /*
         * Specify a allowed-list of allowed properties.
         *
         * https://stylelint.io/user-guide/rules/list/property-allowed-list/
         */
        "property-allowed-list": null,


        /*
         * Specify a list of disallowed properties.
         *
         * https://stylelint.io/user-guide/rules/list/property-disallowed-list/
         */
        "property-disallowed-list": null,


        /*
         * Disallow vendor prefixes for properties.
         *
         * https://stylelint.io/user-guide/rules/list/property-no-vendor-prefix/
         */
        "property-no-vendor-prefix": true

    }
};
