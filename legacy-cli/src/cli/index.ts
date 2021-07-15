

import path from "path";

import "core-js/stable";
import "regenerator-runtime/runtime";

import fs from "fs-extra";
import { program } from "commander";
import { logger } from "@newsteam/legacy-cli-logger";

import { assembleCommand } from "./assemble";


const packageJsonRaw = fs.readFileSync(path.join(__dirname, "../../package.json"));
const packageJson = JSON.parse(packageJsonRaw.toString()) as { version: string };


process.on("unhandledRejection", (error: Error): void => {
    logger.error(error);
});
process.on("uncaughtException", (error: Error): void => {
    logger.error(error);
});


program.version(packageJson.version);


program.addCommand(assembleCommand("assemble", program));


program.parse(process.argv);
