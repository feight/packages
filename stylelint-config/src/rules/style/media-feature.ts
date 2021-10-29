

/*
 * Stylistic issues Media feature
 *
 * https://stylelint.io/user-guide/rules/list/#stylistic-issues
 */


export default {
    rules: {

        /*
         * Require a single space or disallow whitespace after the colon in media features (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/media-feature-colon-space-after/
         */
        "media-feature-colon-space-after": "always",

        /*
         * Require a single space or disallow whitespace before the colon in media features (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/media-feature-colon-space-before/
         */
        "media-feature-colon-space-before": "never",

        /*
         * Specify lowercase or uppercase for media feature names (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/media-feature-name-case/
         */
        "media-feature-name-case": "lower",

        /*
         * Require a single space or disallow whitespace on the inside of the parentheses within media features (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/media-feature-parentheses-space-inside/
         */
        "media-feature-parentheses-space-inside": "never",

        /*
         * Require a single space or disallow whitespace after the range operator in media features (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/media-feature-range-operator-space-after/
         */
        "media-feature-range-operator-space-after": "always",

        /*
         * Require a single space or disallow whitespace before the range operator in media features (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/media-feature-range-operator-space-before/
         */
        "media-feature-range-operator-space-before": "always"

    }
};
