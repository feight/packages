

/*
 * Limit language features At rule
 *
 * https://stylelint.io/user-guide/rules/#limit-language-features
 */


import { atRules } from "../../config";


export default {
    rules: {

        /*
         * Specify a whitelist of allowed at-rules.
         *
         * https://stylelint.io/user-guide/rules/at-rule-allowed-list/
         */
        "at-rule-allowed-list": atRules,

        /*
         * Specify a list of disallowed at-rules.
         *
         * https://stylelint.io/user-guide/rules/at-rule-disallowed-list/
         */
        "at-rule-disallowed-list": ["extend"],

        /*
         * Disallow vendor prefixes for at-rules.
         *
         * https://stylelint.io/user-guide/rules/at-rule-no-vendor-prefix/
         */
        "at-rule-no-vendor-prefix": true,

        /*
         * Specify a requirelist of properties for an at-rule.
         *
         * https://stylelint.io/user-guide/rules/at-rule-property-required-list/
         */
        "at-rule-property-required-list": {
            "font-face": [
                "font-display",
                "font-family",
                "font-style"
            ]
        }

    }
};
