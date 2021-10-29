

/*
 * Stylistic issues Custom property
 *
 * https://stylelint.io/user-guide/rules/list/#stylistic-issues
 */


export default {
    rules: {

        /*
         * Require or disallow an empty line before custom properties (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/custom-property-empty-line-before/
         */
        "custom-property-empty-line-before": [
            "always",
            {
                except: ["after-custom-property"]
            }
        ]

    }
};
