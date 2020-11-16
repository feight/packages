

import "core-js/stable";
import "regenerator-runtime/runtime";

import path from "path";

import chalk from "chalk";
import fs from "fs-extra";
import program from "commander";
import table from "text-table";

import { setCache } from "../cache";
import {
    installDependencies,
    updateDependencies
} from "../dependency";
import { getInstallMap } from "../install-map";


process.on("unhandledRejection", (error: Error): void => {
    console.error(error);
});
process.on("uncaughtException", (error: Error): void => {
    console.error(error);
});


const packageJsonRaw = fs.readFileSync(path.join(__dirname, "../../package.json"));
const packageJson = JSON.parse(packageJsonRaw.toString()) as { version: string };


program.version(packageJson.version);

program.parse(process.argv);


// eslint-disable-next-line @typescript-eslint/no-floating-promises -- Need a floating promise here so we run async code from the root of the code
(async (): Promise<void> => {

    const {
        dependencies,
        pipeline
    } = await getInstallMap();

    console.log("");
    console.log(table([
        ...pipeline.install.map((item) => [chalk.cyan(item.packageName), ">", chalk.red("installing")]),
        ...pipeline.update.map((item) => [chalk.cyan(item.packageName), ">", chalk.yellow("updating")]),
        ...pipeline.updated.map((item) => [chalk.cyan(item.packageName), ">", chalk.gray("unchanged")])
    ], {
        align: ["l", "c", "l"]
    }));

    if(pipeline.install.length > 0 || pipeline.update.length > 0){

        console.log("");

        await installDependencies(pipeline.install);
        await updateDependencies(pipeline.update);

        console.log("");
        console.log(table([
            ...pipeline.install.map((item) => [chalk.cyan(item.packageName), ">", chalk.green("installed")]),
            ...pipeline.update.map((item) => [chalk.cyan(item.packageName), ">", chalk.green("updated")]),
            ...pipeline.updated.map((item) => [chalk.cyan(item.packageName), ">", chalk.gray("unchanged")])
        ], {
            align: ["l", "c", "l"]
        }));

    }

    await setCache(dependencies);

})();
