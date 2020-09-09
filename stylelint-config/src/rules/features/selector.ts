

/*
 * Limit language features Selector
 *
 * https://stylelint.io/user-guide/rules/#limit-language-features
 */


import { idPattern } from "../../config";


export default {
    rules: {


        /*
         * Specify a allowed-list of allowed attribute operators.
         *
         * https://stylelint.io/user-guide/rules/selector-attribute-operator-allowed-list/
         */
        "selector-attribute-operator-allowed-list": null,


        /*
         * Specify a list of disallowed attribute operators.
         *
         * https://stylelint.io/user-guide/rules/selector-attribute-operator-disallowed-list/
         */
        "selector-attribute-operator-disallowed-list": null,

        /*
         * Specify a pattern for class selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-class-pattern/
         */
        "selector-class-pattern": idPattern,


        /*
         * Specify a allowed-list of allowed combinators.
         *
         * https://stylelint.io/user-guide/rules/selector-combinator-allowed-list/
         */
        "selector-combinator-allowed-list": null,


        /*
         * Specify a list of disallowed combinators.
         *
         * https://stylelint.io/user-guide/rules/selector-combinator-disallowed-list/
         */
        "selector-combinator-disallowed-list": null,

        /*
         * Specify a pattern for ID selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-id-pattern/
         */
        "selector-id-pattern": idPattern,

        /*
         * Limit the number of attribute selectors in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-attribute/
         */
        "selector-max-attribute": 3,

        /*
         * Limit the number of classes in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-class/
         */
        "selector-max-class": 10,

        /*
         * Limit the number of combinators in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-combinators/
         */
        "selector-max-combinators": 10,

        /*
         * Limit the number of compound selectors in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-compound-selectors/
         */
        "selector-max-compound-selectors": 10,

        /*
         * Limit the number of adjacent empty lines within selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-max-empty-lines/
         */
        "selector-max-empty-lines": 0,

        /*
         * Limit the number of ID selectors in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-id/
         */
        "selector-max-id": 1,

        /*
         * Limit the number of pseudo-classes in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-pseudo-class/
         */
        "selector-max-pseudo-class": 3,

        /*
         * Limit the specificity of selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-max-specificity/
         */
        "selector-max-specificity": "3,8,8",

        /*
         * Limit the number of type in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-type/
         */
        "selector-max-type": 12,

        /*
         * Limit the number of universal selectors in a selector.
         *
         * https://stylelint.io/user-guide/rules/selector-max-universal/
         */
        "selector-max-universal": 1,

        /*
         * Specify a pattern for the selectors of rules nested within rules.
         *
         * https://stylelint.io/user-guide/rules/selector-nested-pattern/
         */
        "selector-nested-pattern": null,

        /*
         * Disallow qualifying a selector by type.
         *
         * https://stylelint.io/user-guide/rules/selector-no-qualifying-type/
         */
        "selector-no-qualifying-type": null,

        /*
         * Disallow vendor prefixes for selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-no-vendor-prefix/
         */
        "selector-no-vendor-prefix": true,


        /*
         * Specify a allowed-list of allowed pseudo-class selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-pseudo-class-allowed-list/
         */
        "selector-pseudo-class-allowed-list": null,


        /*
         * Specify a list of disallowed pseudo-class selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-pseudo-class-disallowed-list/
         */
        "selector-pseudo-class-disallowed-list": null,


        /*
         * Specify a allowed-list of allowed pseudo-element selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-pseudo-element-allowed-list/
         */
        "selector-pseudo-element-allowed-list": null,


        /*
         * Specify a list of disallowed pseudo-element selectors.
         *
         * https://stylelint.io/user-guide/rules/selector-pseudo-element-disallowed-list/
         */
        "selector-pseudo-element-disallowed-list": null

    }
};
