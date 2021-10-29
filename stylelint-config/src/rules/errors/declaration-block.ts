

/*
 * Possible errors Declaration block
 *
 * https://stylelint.io/user-guide/rules/list/#possible-errors
 */


export default {
    rules: {

        /*
         * Disallow duplicate custom properties within declaration blocks.
         *
         * https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-custom-properties/
         */
        "declaration-block-no-duplicate-custom-properties": true,

        /*
         * Disallow duplicate properties within declaration blocks.
         *
         * https://stylelint.io/user-guide/rules/list/declaration-block-no-duplicate-properties/
         */
        "declaration-block-no-duplicate-properties": true,

        /*
         * Disallow shorthand properties that override related longhand
         * properties within declaration blocks.
         *
         * https://stylelint.io/user-guide/rules/list/declaration-block-no-shorthand-property-overrides/
         */
        "declaration-block-no-shorthand-property-overrides": true

    }
};
