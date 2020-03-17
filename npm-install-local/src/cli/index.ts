

import "core-js/stable";
import "regenerator-runtime/runtime";

import program from "commander";
import chalk from "chalk";
import table from "text-table";

import {
    getCache,
    setCache
} from "../cache";
import cliPackageJson from "../../package.json";
import {
    getDependenciesHash,
    getSourceCodeHash
} from "../hash";
import {
    Dependency,
    getDependencyMap,
    installDependencies,
    updateDependencies
} from "../dependency";


// This is dodgy, but the typing of this in globals.d.ts is kinda wierd
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (error: any): void => console.error(error));

process.on("uncaughtException", (error: Error): void => console.error(error));


program.version(cliPackageJson.version);


interface Pipeline{
    install: Dependency[];
    update: Dependency[];
    updated: Dependency[];
}


program.parse(process.argv);


// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {

    const root = process.cwd();
    const dependencies = await getDependencyMap(root);

    const pipeline: Pipeline = {
        install: [],
        update: [],
        updated: []
    };

    const cache = await getCache(dependencies);

    const depsHash = await getDependenciesHash(dependencies);
    const depsCache = cache.dependencies;

    for(const {
        directory,
        packageName
    } of dependencies){

        const codeHash = await getSourceCodeHash(directory);
        const codeCache = (cache?.sourceCode ?? {})[packageName];

        if(
            depsCache === depsHash &&
            codeCache === codeHash
        ){

            pipeline.updated.push({
                directory,
                packageName
            });

        }else if(depsCache !== depsHash){

            pipeline.install.push({
                directory,
                packageName
            });

        }else if(codeCache !== codeHash){

            pipeline.update.push({
                directory,
                packageName
            });

        }

    }

    console.log("");
    console.log(table([
        ...pipeline.install.map((item) => [chalk.cyan(item.packageName), ">", chalk.red("installing")]),
        ...pipeline.update.map((item) => [chalk.cyan(item.packageName), ">", chalk.yellow("updating")]),
        ...pipeline.updated.map((item) => [chalk.cyan(item.packageName), ">", chalk.gray("unchanged")])
    ], {
        align: ["l", "c", "l"]
    }));

    if(pipeline.install.length !== 0 || pipeline.update.length !== 0){

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
