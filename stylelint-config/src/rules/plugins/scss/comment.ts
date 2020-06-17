

/*
 * SCSS specific linting rules: Comments
 *
 * https://github.com/kristerkari/stylelint-scss#comment
 */


export default {
    rules: {

        /*
         * Disallow empty comments.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/comment-no-empty/README.md
         */
        "scss/comment-no-empty": true,

        /*
         * Disallow /*-comments.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/comment-no-loud/README.md
         */
        "scss/comment-no-loud": null

    }
};
