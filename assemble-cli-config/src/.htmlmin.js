

module.exports = {
    collapseInlineTagWhitespace: false,
    collapseWhitespace: true,
    conservativeCollapse: true,
    ignoreCustomFragments: [
        /\{%[\S\s]*?%\}/gu,
        /\{\{[\S\s]*?\}\}/gu
    ],
    minifyJS: false,
    quoteCharacter: "\"",
    removeAttributeQuotes: true,
    removeComments: true,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: true,
    trimCustomFragments: false
};
