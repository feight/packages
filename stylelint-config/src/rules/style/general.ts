

/*
 * Stylistic issues General
 *
 * https://stylelint.io/user-guide/rules/list/#stylistic-issues
 */


export default {
    rules: {

        /*
         * Specify indentation (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/indentation/
         */
        indentation: 4,

        /*
         * Specify unix or windows linebreaks (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/linebreaks/
         */
        linebreaks: "unix",

        /*
         * Limit the number of adjacent empty lines.
         *
         * https://stylelint.io/user-guide/rules/list/max-empty-lines/
         */
        "max-empty-lines": [
            1,
            {
                ignore: ["comments"]
            }
        ],

        /*
         * Limit the length of a line.
         *
         * https://stylelint.io/user-guide/rules/list/max-line-length/
         */
        "max-line-length": 320,

        /*
         * Disallow empty first lines. (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/no-empty-first-line/
         */
        "no-empty-first-line": null,

        /*
         * Disallow end-of-line whitespace (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/no-eol-whitespace/
         */
        "no-eol-whitespace": true,

        /*
         * Disallow irregular whitespace.
         *
         * https://stylelint.io/user-guide/rules/list/no-irregular-whitespace/
         */
        "no-irregular-whitespace": true,

        /*
         * Disallow missing end-of-source newlines (Autofixable).
         *
         * https://stylelint.io/user-guide/rules/list/no-missing-end-of-source-newline/
         */
        "no-missing-end-of-source-newline": true,

        /*
         * Require or disallow the Unicode Byte Order Mark.
         *
         * https://stylelint.io/user-guide/rules/list/unicode-bom
         */
        "unicode-bom": "never"

    }
};
