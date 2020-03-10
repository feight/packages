
/*

    eslint

    require-await: "off",
    @typescript-eslint/no-misused-promises: "off",

*/

import "core-js/stable";
import "regenerator-runtime/runtime";

import program from "commander";
import { logger } from "@newsteam/cli-logger";
import { cleanCacheTask } from "@newsteam/cli-tasks";

import { config } from "../config";
import packageJSON from "../../package.json";
import { buildTask } from "../tasks/build";
import { cleanTask } from "../tasks/clean";
import { linkTask } from "../tasks/link";
import { localTask } from "../tasks/local";
import { setupTask } from "../tasks/setup";
import { testTask } from "../tasks/test";


// This is dodgy, but the typing of this in globals.d.ts is kinda wierd
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (error: any): void => logger.error(error));

process.on("uncaughtException", (error: Error): void => logger.error(error));


program.version(packageJSON.version);


program
.command("build")
.option("-p, --platform [platform]", "device platform (defaults to 'web')")
.option("--production", "run the build in production mode")
.action(async (options): Promise<void> => buildTask(config, {
    mode: options.production ? "production" : "development",
    platform: options.platform || "web"
}));

program
.command("clean")
.action(async (): Promise<void> => cleanTask(config, { cache: true }));

program
.command("clean-cache")
.action(async (): Promise<void> => cleanCacheTask());

program
.command("link")
.action(async (): Promise<void> => linkTask(true));

program
.command("lint")
.option("--fix", "attempt to fix lint issues automatically (defaults to false)")
.action(async (options): Promise<void> => testTask(config, {
    fix: options.fix,
    tests: false
}));

program
.command("local")
.option("-p, --platform [platform]", "device platform (defaults to 'web')")
.option("--production", "run the local server as close to production as possible (defaults to false)")
.action(async (options): Promise<void> => localTask(config, {
    mode: options.production ? "production" : "development",
    platform: options.platform || "web",
    watch: !options.production
}));

program
.command("setup")
.action(async (): Promise<void> => setupTask());

program
.command("test")
.option("--fix", "attempt to fix lint issues automatically (defaults to false)")
.action(async (options): Promise<void> => testTask(config, {
    fix: options.fix
}));


program.parse(process.argv);
