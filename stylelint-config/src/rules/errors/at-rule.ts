

/*
 * Possible errors At rules
 *
 * https://stylelint.io/user-guide/rules/list/#possible-errors
 */


import { atRules } from "../../config";


export default {
    rules: {

        /*
         * Disallow unknown at-rules.
         *
         * https://stylelint.io/user-guide/rules/list/at-rule-no-unknown/
         */
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: atRules
            }
        ]

    }
};
