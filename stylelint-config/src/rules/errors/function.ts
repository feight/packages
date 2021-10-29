

/*
 * Possible errors Function
 *
 * https://stylelint.io/user-guide/rules/list/#possible-errors
 */


export default {
    rules: {

        /*
         * Disallow an unspaced operator within calc functions.
         *
         * https://stylelint.io/user-guide/rules/list/function-calc-no-unspaced-operator/
         */
        "function-calc-no-unspaced-operator": true,

        /*
         * Disallow direction values in linear-gradient() calls that are not
         * valid according to the standard syntax.
         *
         * https://stylelint.io/user-guide/rules/list/function-linear-gradient-no-nonstandard-direction/
         */
        "function-linear-gradient-no-nonstandard-direction": true

    }
};
