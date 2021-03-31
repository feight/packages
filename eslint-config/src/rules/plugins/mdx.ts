

/*
 * ESLint Parser/Plugin for MDX
 *
 * https://www.npmjs.com/package/eslint-plugin-mdx
 */


export default {
    extends: ["plugin:mdx/recommended"],
    rules: {
        "mdx/noJsxHtmlComments": "error",
        "mdx/noUnusedExpressions": "error"
    }
};
