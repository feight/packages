

export default {
    extends: [
        "./alpha",
        "./at-rule",
        "./color",
        "./comment",
        "./custom-media",
        "./custom-property",
        "./declaration-block",
        "./declaration",
        "./function",
        "./general",
        "./hue",
        "./keyframes",
        "./media-feature",
        "./number",
        "./property",
        "./selector",
        "./shorthand-property",
        "./time",
        "./unit",
        "./value"
    ].map((string: string): string => require.resolve(string))
};
