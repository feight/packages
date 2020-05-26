
/*

    eslint

    require-await: "off",
    @typescript-eslint/no-misused-promises: "off",

*/

import path from "path";

import "core-js/stable";
import "regenerator-runtime/runtime";

import fs from "fs-extra";
import program from "commander";
import { logger } from "@newsteam/cli-logger";
import { cleanCacheTask } from "@newsteam/cli-tasks";

import {
    config,
    Mode,
    modes,
    Platform,
    platforms
} from "../config";
import { buildTask } from "../tasks/build";
import { cleanTask } from "../tasks/clean";
import { linkTask } from "../tasks/link";
import { localTask } from "../tasks/local";
import { setupTask } from "../tasks/setup";
import {
    testTask,
    TestTaskLintType
} from "../tasks/test";


interface BuildOptions{
    environment: string;
    mode: Mode;
    platform: Platform;
    production: boolean;
    publication: string;
}

interface LintOptions{
    lintType: TestTaskLintType;
    fix: boolean;
}

type LocalOptions = BuildOptions;

type TestOptions = LintOptions;


const packageJsonRaw = fs.readFileSync(path.join(__dirname, "../../package.json"));
const packageJson = JSON.parse(packageJsonRaw.toString()) as { version: string };


const option = {
    environment: {
        description: "target a publication environment by Assemble publication environment id",
        flags: "--env --environment <environment>"
    },
    fix: {
        default: false,
        description: "attempt to fix lint issues automatically",
        flags: "--fix"
    },
    lintType: {
        default: undefined,
        description: "specify which lints to run (eslint, stylelint, htmllint or flake8)",
        flags: "--lint-type [lintType]"
    },
    mode: {
        default: "development",
        description: "run the build in 'development' or 'production' mode",
        flags: "--mode <mode>",
        fn: (value: string): Mode => {

            if(modes.includes(value as Mode)){
                return value as Mode;
            }

            return "development";

        }
    },
    platform: {
        default: "web",
        description: "device platform",
        flags: "--platform <platform>",
        fn: (value: string): Platform => {

            if(platforms.includes(value as Platform)){
                return platforms.includes(value as Platform) ? value as Platform : "web";
            }

            return "web";

        }
    },
    publication: {
        description: "target a publication by Assemble publication id",
        flags: "--pub --publication <publication>"
    }
};


// This is dodgy, but the typing of this in globals.d.ts is kinda wierd
// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (error: any): void => logger.error(error));

process.on("uncaughtException", (error: Error): void => logger.error(error));


program.version(packageJson.version);


program
.command("build")
.option(option.mode.flags, option.mode.description, option.mode.fn, option.mode.default)
.option(option.platform.flags, option.platform.description, option.platform.fn, option.platform.default)
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.action(async (options: BuildOptions): Promise<void> => buildTask(config, {
    environment: options.environment,
    mode: options.mode,
    platform: options.platform,
    publication: options.publication
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
.option(option.lintType.flags, option.lintType.description, option.lintType.default)
.option(option.fix.flags, option.fix.description, option.fix.default)
.action(async (options: LintOptions): Promise<void> => testTask(config, {
    fix: options.fix,
    lintType: options.lintType,
    tests: false
}));

program
.command("local")
.option(option.mode.flags, option.mode.description, option.mode.fn, option.mode.default)
.option(option.platform.flags, option.platform.description, option.platform.fn, option.platform.default)
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.action(async (options: LocalOptions): Promise<void> => localTask(config, {
    environment: options.environment,
    mode: options.mode,
    platform: options.platform,
    publication: options.publication
}));

program
.command("setup")
.action(async (): Promise<void> => setupTask());

program
.command("test")
.option(option.fix.flags, option.fix.description, option.fix.default)
.action(async (options: TestOptions): Promise<void> => testTask(config, {
    fix: options.fix
}));


program.parse(process.argv);
