

/*
 * Additional ESLint's rules for Node.js
 *
 * https://github.com/mysticatea/eslint-plugin-node
 */


export default {
    env: {
        node: true
    },
    extends: [
        "./best-practices",
        "./errors",
        "./style"
    ].map((string: string) => require.resolve(string)),
    globals: {
        /* eslint-disable @typescript-eslint/naming-convention -- These are node globals, we don't choose them. */
        __dirname: false,
        __filename: false,
        Buffer: false,
        global: false,
        module: false,
        process: false,
        Promise: false,
        require: false,
        System: false
        /* eslint-enable @typescript-eslint/naming-convention */
    },
    plugins: ["node"],
    settings: {
        node: {
            allowModules: ["jasmine"]
        }
    }
};
