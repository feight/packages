

/*
 * SCSS specific linting rules.
 *
 * https://github.com/kristerkari/stylelint-scss
 */


export default {
    extends: [
        "./at/each",
        "./at/else",
        "./at/extend",
        "./at/function",
        "./at/import",
        "./at/mixin",
        "./at/rule",
        "./comment",
        "./comment-double-slash",
        "./declaration",
        "./dimension",
        "./function",
        "./general",
        "./at/if",
        "./map",
        "./media-feature",
        "./operator",
        "./partial",
        "./placeholder",
        "./selector",
        "./variable"
    ].map((string: string): string => require.resolve(string)),
    plugins: [
        "stylelint-scss"
    ]
};
