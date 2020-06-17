

/*
    eslint
    no-process-env: "off",
*/


const baseNodeVersion = 12;
const mjs = process.env.BUILD_MJS === "1";
const shebang = process.env.BUILD_SHEBANG === "1";


module.exports = function babelConfiguration(api){

    api.cache(false);

    return {
        presets: [
            [
                "@newsteam/babel-preset",
                {
                    addModuleExports: !mjs,
                    modules: !mjs,
                    shebang,
                    targets: {
                        node: mjs ? true : baseNodeVersion
                    }
                }
            ]
        ]
    };

};
