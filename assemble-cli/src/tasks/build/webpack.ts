

import path from "path";

import webpack from "webpack";
import { logger } from "@newsteam/cli-logger";
import {
    kill,
    spawn
} from "@newsteam/cli-utils";

import {
    Mode,
    Platform
} from "../../config";


const statsOptions = {
    builtAt: false,
    colors: true,
    entrypoints: false,
    hash: false,
    modules: false,
    timings: false,
    version: false
};


const log = (
    label: string,
    tag: string
): (
    error?: Error,
    stats?: webpack.Stats
) => void => (error, stats): void => {

    if(error){

        logger.error(error);

        process.exit();

    }else{

        if(stats){

            logger.log("", { label });
            logger.log(stats.toString(statsOptions), { label });
            logger.log("", { label });

        }

        logger.log(`${ tag }`, { label });
        logger.log("", { label });

    }

};


export interface BuildWebpackTaskOptions{
    config: string;
    mode?: Mode;
    platform?: Platform;
    watch?: boolean;
}


export const buildWebpackTask = async function(options: BuildWebpackTaskOptions): Promise<void>{

    const {
        config,
        mode = "production",
        platform = "web",
        watch = false
    } = options;

    // We'll allow this for now
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    await new Promise(async (resolve): Promise<void> => {

        const label = "webpack";

        // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
        require("ts-node").register({
            project: "./tsconfig.json"
        });

        // This doesn't present any danger and is necessary in this case.
        // eslint-disable-next-line max-len
        // eslint-disable-next-line import/no-dynamic-require, security/detect-non-literal-require, global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        const webpackConfig = require(path.relative(__dirname, path.resolve(config))).default({
            platform
        }, {
            mode,
            watch
        });

        // This doesn't present any danger and is necessary in this case.
        // eslint-disable-next-line max-len
        // eslint-disable-next-line import/no-dynamic-require, security/detect-non-literal-require, global-require, @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
        const webpackConfigX = require(path.relative(__dirname, path.resolve("automation/config/webpack.js")))({
            platform
        }, {
            mode,
            watch
        });

        console.log(webpackConfigX);
        console.log(webpackConfig);

        const compiler = webpack(webpackConfig);

        if(watch){

            if(webpackConfig.devServer){

                await kill("webpack-dev-server");

                await spawn({
                    command: [
                        "webpack-dev-server",
                        `--mode=${ mode }`,
                        "--watch",
                        `--env.platform=${ platform }`
                    ].join(" "),
                    label
                });

            }else{

                compiler.watch({
                    aggregateTimeout: 600,
                    ignored: [
                        "node_modules"
                    ],
                    poll: false
                },
                (error, stats): void => {

                    log(label, `Watching ${ path.resolve(config) }`)(error, stats);

                    logger.log("");

                });

            }

        }else{

            logger.log(`Building ${ path.resolve(config) }`, {
                label
            });

            compiler.run((error, stats): void => {

                log(label, `Completed ${ path.resolve(config) }`)(error, stats);

                resolve();

            });

        }

    });

};
