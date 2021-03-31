

export const mdxOverrides = {
    extends: ["plugin:mdx/overrides"],
    files: ["*.mdx"],
    // Overridden by eslint-plugin-mdx
    rules: {
        "no-unused-expressions": 0
    }
};
