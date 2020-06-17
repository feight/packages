

/*

    eslint

    node/global-require: "off",
    @typescript-eslint/no-require-imports: "off",
    @typescript-eslint/no-var-requires: "off",
    import/no-dynamic-require: "off",
    security/detect-non-literal-require: "off",
    max-lines-per-function: "off",
    @typescript-eslint/no-unsafe-call: "off",
    @typescript-eslint/no-unsafe-member-access: "off",
    @typescript-eslint/no-unsafe-assignment: "off",

    --

    We're going to skip these rules to keep this simple

*/


import path from "path";

import asciichart from "asciichart";
import fs from "fs-extra";
import glob from "globby";
import { logger } from "@newsteam/cli-logger";
import SpeedMeasurePlugin, { SpeedMeasureWebpackPluginData } from "speed-measure-webpack-plugin";
import webpack, { Configuration } from "webpack";
import {
    config as assembleCliConfig, Mode
} from "@newsteam/assemble-cli-config";
import { kill } from "@newsteam/cli-utils";


const label = "webpack";

const buildStatsFolder = path.join(process.cwd(), ".local/@newsteam/webpack/build/stats");

const printBuildStatistics = function(): void{

    const files = glob.sync(path.join(buildStatsFolder, "*.json"));
    const max = 50;

    files.sort((fileA: string, fileB: string) => fileA > fileB ? 1 : -1);

    const data = files.map((file): SpeedMeasureWebpackPluginData => {

        const raw = fs.readFileSync(file).toString();

        return JSON.parse(raw) as SpeedMeasureWebpackPluginData;

    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- This is converting compileTime in milliseconds to seconds
    const compileTimes = data.map((item) => item.misc.compileTime / 1000).slice(Math.max(data.length - max, 0));

    if(compileTimes.length > 0){

        logger.log("", { label });
        logger.log(asciichart.plot(compileTimes), { label });
        logger.log("", { label });

    }

};


const zeroPad = (number: number, places: number): string => String(number).padStart(places, "0");


export interface BuildWebpackTaskOptions{
    config: string;
    mode?: Mode;
    profile?: boolean;
    watch?: boolean;
}


export const buildWebpackTask = async function(options: BuildWebpackTaskOptions): Promise<void>{

    const {
        config,
        mode = "production",
        profile = false,
        watch = false
    } = options;

    await kill(assembleCliConfig.webpack.bundleAnalyzerPort);
    await kill(assembleCliConfig.webpack.devServerPort);

    await new Promise((resolve, reject): void => {

        require("ts-node").register({
            project: "./tsconfig.json"
        });

        const webpackBasePath = "./config.js";
        const webpackCustomPath = path.relative(__dirname, path.resolve(config));
        const webpackCustomExists = fs.existsSync(path.resolve(config));
        const webpackImport = webpackCustomExists ? require(webpackCustomPath) : require(webpackBasePath);

        if(!webpackImport.config){
            throw new Error(`${ webpackCustomPath } has no exported member 'config'`);
        }

        const webpackConfig: Configuration = webpackImport.config({
            platform: "web"
        }, {
            mode,
            watch
        });

        // If things go tits up try this: path.resolve("automation/config/webpack.js") instead of path.resolve(config)

        const compiler = webpack(profile ? new SpeedMeasurePlugin({
            disable: mode !== "development",
            outputFormat: (blob: SpeedMeasureWebpackPluginData): void => {

                const date = new Date();
                const year = date.getFullYear();
                const month = zeroPad(date.getMonth() + 1, 2);
                const day = zeroPad(date.getDate(), 2);
                const hours = zeroPad(date.getHours(), 2);
                const minutes = zeroPad(date.getMinutes(), 2);
                const seconds = zeroPad(date.getSeconds(), 2);

                fs.ensureDirSync(buildStatsFolder);

                fs.writeFileSync(
                    path.join(buildStatsFolder, `${ year }-${ month }-${ day }-${ hours }:${ minutes }:${ seconds }.json`),
                    JSON.stringify(blob, undefined, 2)
                );

            }
        }).wrap(webpackConfig) : webpackConfig);

        const output = (
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

                    const statsString = stats.toString(webpackConfig.stats);

                    if(statsString){

                        logger.log("", { label });
                        logger.log(statsString, { label });
                        logger.log("", { label });

                    }

                }

                logger.log(`${ tag }`, { label });

            }

        };

        if(watch){

            compiler.watch({
                aggregateTimeout: 600,
                ignored: [
                    "node_modules"
                ],
                poll: false
            },
            (error, stats): void => {

                output(`Watching ${ path.resolve(config) }`)(error, stats);

                logger.log("");

            });

        }else{

            compiler.run((error, stats): void => {

                if(profile){

                    printBuildStatistics();

                }

                // Unique compilation errors
                const compilationErrors = stats.compilation.errors.filter((compilationError, index, self) => self.indexOf(compilationError) === index);

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- The types are lying here
                if(error){

                    output(`Build ${ path.resolve(config) }`)(error, stats);

                }else if(compilationErrors.length > 0){

                    compilationErrors.forEach((compilationError) => {

                        logger.log("", { label });
                        logger.error(compilationError, { label });
                        logger.log("", { label });

                    });

                    reject(compilationErrors);

                }else{

                    resolve("");

                }

            });

        }

    });

};
