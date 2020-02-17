
/*

    eslint

    @typescript-eslint/no-misused-promises: "off"

*/

import "core-js/stable";
import "regenerator-runtime/runtime";

import program from "commander";
import { config } from "@newsteam/cli-config";
import { logger } from "@newsteam/cli-logger";

import packageJSON from "../../package.json";
import { localTask } from "../tasks/local";
import { setupTask } from "../tasks/setup";


// This is dodgy, but the typing of this in globals.d.ts is kinda wierd
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (error: any): void => logger.error(error));

process.on("uncaughtException", (error: Error): void => logger.error(error));


program.version(packageJSON.version);


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
.action(async (): Promise<void> => {

    await setupTask();

    // Needed because this often hangs
    process.exit();

});

program.parse(process.argv);
