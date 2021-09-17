

import { declare } from "@babel/helper-plugin-utils";
import type {
    ConfigAPI,
    PluginItem,
    TransformOptions
} from "@babel/core";


export interface TamlandBabelPresetOptions{
    addModuleExports: boolean;
    comments: boolean;
    debug: boolean;
    development: boolean | undefined;
    modules: boolean | "auto" | undefined;
    plugins?: PluginItem[];
    shebang: boolean;
    reactHotLoader: boolean;
    targets: Record<string, string> | string[] | string;
    typescript: boolean;
}


export default declare((
    api: ConfigAPI,
    options: TamlandBabelPresetOptions
): TransformOptions => {

    // See docs about api at https://babeljs.io/docs/en/config-files#apicache
    api.assertVersion("^7.2.0");

    const {
        addModuleExports = false,
        comments = false,
        modules,
        plugins = [],
        shebang = false,
        reactHotLoader = false,
        targets,
        typescript = true
    } = options;

    if(
        modules !== "auto" &&
        typeof modules !== "undefined" &&
        typeof modules !== "boolean"
    ){
        throw new TypeError("@newsteam/babel-preset only accepts `true`, `false`, or `\"auto\"` as the value of the \"modules\" option");
    }

    const debug = typeof options.debug === "boolean" ? options.debug : false;
    const development = typeof options.development === "boolean" ? options.development : api.cache.using(() => process.env.NODE_ENV === "development");

    plugins.push(
        [
            "module-resolver",
            {
                alias: {
                    "@src": "./src"
                }
            }
        ],
        "babel-plugin-transform-typescript-metadata",
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ],
        [
            "@babel/plugin-proposal-class-properties",
            {
                loose: true
            }
        ],
        [
            "@babel/plugin-proposal-private-methods",
            {
                loose: true
            }
        ],
        [
            "@babel/plugin-proposal-private-property-in-object",
            {
                loose: true
            }
        ],
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-named-capturing-groups-regex",
        "@loadable/babel-plugin",
        "jsx-control-statements"
    );

    if(reactHotLoader){
        plugins.push("react-hot-loader/babel");
    }

    if(addModuleExports){
        plugins.push("add-module-exports");
    }

    if(shebang){

        plugins.push([
            "shebang",
            {
                force: true,
                replacement: "#!/usr/bin/env node"
            }
        ]);

    }

    const presets = [];

    if(typescript){
        presets.push("@babel/preset-typescript");
    }

    presets.push([
        "@babel/preset-env",
        {
            debug,
            modules: modules === false ? false : "auto",
            targets
        }
    ], [
        "@babel/preset-react",
        { development }
    ]);

    return {
        comments,
        plugins,
        presets
    };

});
