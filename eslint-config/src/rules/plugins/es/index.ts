

/*
 * ESLint rules which disallow each ECMAScript syntax.
 *
 * https://eslint-plugin-es.mysticatea.dev/
 */


export default {
    extends: [
        "./es5",
        "./es2015",
        "./es2016",
        "./es2017",
        "./es2018",
        "./es2019",
        "./es2020",
        "./es2021"
    ].map((string: string) => require.resolve(string)),
    plugins: ["es"]
};
