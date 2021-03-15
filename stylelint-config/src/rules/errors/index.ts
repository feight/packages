

export default {
    extends: [
        "./at-rule",
        "./block",
        "./color",
        "./comment",
        "./declaration-block",
        "./font-family",
        "./function",
        "./general",
        "./keyframe-declaration",
        "./media-feature",
        "./named-grid-areas",
        "./property",
        "./selector",
        "./string",
        "./unit"
    ].map((string: string): string => require.resolve(string))
};
