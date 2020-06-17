

/*
 * SCSS specific linting rules: Dimension
 *
 * https://github.com/kristerkari/stylelint-scss#-dimension
 */


export default {
    rules: {

        /*
         * This rule requires that all interpolation for values should be in the format $value * 1<unit> instead of #{value}<unit>
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/dimension-no-non-numeric-values/README.md
         */
        "scss/dimension-no-non-numeric-values": true

    }
};
