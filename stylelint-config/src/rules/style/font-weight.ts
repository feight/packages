

/*
 * Stylistic issues Font weight
 *
 * https://stylelint.io/user-guide/rules/list/#stylistic-issues
 */


export default {
    rules: {

        /*
         * Require numeric or named (where possible) font-weight values.
         *
         * https://stylelint.io/user-guide/rules/list/font-weight-notation/
         */
        "font-weight-notation": [
            "named-where-possible",
            {
                ignore: ["relative"]
            }
        ]

    }
};
