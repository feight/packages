

/*
 * Limit language features Function
 *
 * https://stylelint.io/user-guide/rules/#limit-language-features
 */


export default {
    rules: {


        /*
         * Specify a allowed-list of allowed functions.
         *
         * https://stylelint.io/user-guide/rules/function-allowed-list/
         */
        "function-allowed-list": null,


        /*
         * Specify a list of disallowed functions.
         *
         * https://stylelint.io/user-guide/rules/function-disallowed-list/
         */
        "function-disallowed-list": null,


        /*
         * Disallow scheme-relative urls.
         *
         * https://stylelint.io/user-guide/rules/function-url-no-scheme-relative/
         */
        "function-url-no-scheme-relative": null,


        /*
         * Specify a allowed-list of allowed url schemes.
         *
         * https://stylelint.io/user-guide/rules/function-url-scheme-allowed-list/
         */
        "function-url-scheme-allowed-list": [
            "data",
            "/^http/"
        ],


        /*
         * Specify a list of disallowed url schemes.
         *
         * https://stylelint.io/user-guide/rules/function-url-scheme-disallowed-list/
         */
        "function-url-scheme-disallowed-list": null

    }
};
