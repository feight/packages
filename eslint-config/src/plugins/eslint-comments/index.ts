

/*
 * Additional ESLint rules for ESLint directive comments
 * (e.g. //eslint-disable-line).
 *
 * https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/
 */


export default {
    extends: [
        "./best-practices",
        "./style"
    ].map((string: string) => require.resolve(string)),
    plugins: ["eslint-comments"]
};
