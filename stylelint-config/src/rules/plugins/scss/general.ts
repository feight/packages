

/*
 * SCSS specific linting rules: General / Sheet
 *
 * https://github.com/kristerkari/stylelint-scss#general--sheet
 */


export default {
    rules: {

        /*
         * Disallow dollar variables within a stylesheet.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-dollar-variables/README.md
         */
        "scss/no-dollar-variables": null,

        /*
         * Disallow duplicate dollar variables within a stylesheet.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-duplicate-dollar-variables/README.md
         */
        "scss/no-duplicate-dollar-variables": true,

        /*
         * Disallow duplicate mixins within a stylesheet.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-duplicate-mixins/README.md
         */
        "scss/no-duplicate-mixins": true,

        /*
         * Disallows the use of global function names, as these global functions are now located inside built-in Sass modules.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md
         */
        "scss/no-global-function-names": true

    }
};
