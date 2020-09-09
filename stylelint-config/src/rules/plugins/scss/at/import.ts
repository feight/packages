

/*
 * SCSS specific linting rules: @import
 *
 * https://github.com/kristerkari/stylelint-scss#-import
 */


export default {
    rules: {

        /*
         * Disallow leading underscore in partial names in @import.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/at-import-no-partial-leading-underscore/README.md
         */
        "scss/at-import-no-partial-leading-underscore": true,

        /*
         * Require or disallow extension in @import commands.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/at-import-partial-extension/README.md
         */
        "scss/at-import-partial-extension": null,


        /*
         * Specify disallowed-list of disallowed file extensions for partial names in @import commands.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/at-import-partial-extension-blacklist/README.md
         */
        "scss/at-import-partial-extension-blacklist": null,


        /*
         * Specify allowed-list of allowed file extensions for partial names in @import commands.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/at-import-partial-extension-whitelist/README.md
         */
        "scss/at-import-partial-extension-whitelist": null

    }
};
