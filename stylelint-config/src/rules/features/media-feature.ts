

/*
 * Limit language features Media feature
 *
 * https://stylelint.io/user-guide/rules/#limit-language-features
 */


export default {
    rules: {


        /*
         * Specify a allowed-list of allowed media feature names.
         *
         * https://stylelint.io/user-guide/rules/media-feature-name-allowed-list/
         */
        "media-feature-name-allowed-list": null,


        /*
         * Specify a list of disallowed media feature names.
         *
         * https://stylelint.io/user-guide/rules/media-feature-name-disallowed-list/
         */
        "media-feature-name-disallowed-list": null,


        /*
         * Disallow vendor prefixes for media feature names.
         *
         * https://stylelint.io/user-guide/rules/media-feature-name-no-vendor-prefix/
         */
        "media-feature-name-no-vendor-prefix": true,


        /*
         * Specify a allowed-list of allowed media feature name and value pairs.
         *
         * https://stylelint.io/user-guide/rules/media-feature-name-value-allowed-list/
         */
        "media-feature-name-value-allowed-list": null

    }
};
