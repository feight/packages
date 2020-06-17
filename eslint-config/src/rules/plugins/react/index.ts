

/*
 * React specific linting rules for ESLint
 *
 * https://github.com/yannickcr/eslint-plugin-react
 */


export default {
    extends: [
        "./base",
        "./jsx"
    ].map((string: string) => require.resolve(string)),
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ["react"],
    settings: {
        react: {
            version: "latest"
        }
    }
};
