

/*
 * Limit language features Declaration
 *
 * https://stylelint.io/user-guide/rules/#limit-language-features
 */


export default {
    rules: {

        /*
         * Disallow longhand properties that can be combined into one shorthand property.
         *
         * https://stylelint.io/user-guide/rules/declaration-block-no-redundant-longhand-properties/
         */
        "declaration-block-no-redundant-longhand-properties": true,

        /*
         * Disallow !important within declarations.
         *
         * https://stylelint.io/user-guide/rules/declaration-no-important/
         */
        "declaration-no-important": true,

        /*
         * Specify a allowed-list of allowed property and unit pairs within declarations.
         *
         * https://stylelint.io/user-guide/rules/declaration-property-unit-allowed-list/
         */
        "declaration-property-unit-allowed-list": null,

        /*
         * Specify a list of disallowed property and unit pairs within declarations.
         *
         * https://stylelint.io/user-guide/rules/declaration-property-unit-disallowed-list/
         */
        "declaration-property-unit-disallowed-list": null,

        /*
         * Specify a allowed-list of allowed property and value pairs within declarations.
         *
         * https://stylelint.io/user-guide/rules/declaration-property-value-allowed-list/
         */
        "declaration-property-value-allowed-list": null,

        /*
         * Specify a list of disallowed property and value pairs within declarations.
         *
         * https://stylelint.io/user-guide/rules/declaration-property-value-disallowed-list/
         */
        "declaration-property-value-disallowed-list": null

    }
};
