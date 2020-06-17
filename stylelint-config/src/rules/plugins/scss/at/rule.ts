

/*
 * SCSS specific linting rules: @rule
 *
 * https://github.com/kristerkari/stylelint-scss#-rule
 */


export default {
    rules: {

        /*
         * Disallow parentheses in conditional @ rules (if, elsif, while)
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/at-rule-conditional-no-parentheses/README.md
         */
        "scss/at-rule-conditional-no-parentheses": true,

        /*
         * Disallow unknown at-rules. Should be used instead of stylelint's at-rule-no-unknown.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules//README.md
         */
        "scss/at-rule-no-unknown": true

    }
};
