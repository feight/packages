

/*
 * Linting of ES2015+ (ES6+) import/export syntax. Helps prevent issues with
 * misspelling of file paths and import names.
 *
 * https://www.npmjs.com/package/eslint-plugin-import
 */


export default {
    extends: [
        "./module-systems",
        "./static-analysis",
        "./style",
        "./warnings"
    ].map((string: string) => require.resolve(string)),
    plugins: ["import"],
    settings: {
        "import/extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
        ],
        "import/parsers": {
            "@typescript-eslint/parser": [
                ".ts",
                ".tsx"
            ]
        },
        "import/resolver": {
            node: {
                extensions: [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx"
                ]
            },
            typescript: {
                project: "."
            }
        }
    }
};
