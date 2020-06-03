
/*

    eslint

    require-await: "off",
    @typescript-eslint/no-misused-promises: "off",

    --

    We need to break these rules to make this simple

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
    modes
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
    production: boolean;
    publication: string;
}

interface LintOptions{
    all: boolean;
    fix: boolean;
    type: TestTaskLintType;
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
    lintAll: {
        default: config.lint.all,
        description: "lint all files, not just publication specific file",
        flags: "--all"
    },
    lintFix: {
        default: config.lint.fix,
        description: "attempt to fix lint issues automatically",
        flags: "--fix"
    },
    lintType: {
        default: undefined,
        description: "specify which lint type to run (eslint, stylelint, htmllint or flake8)",
        flags: "--type [type]"
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
    publication: {
        description: "target a publication by Assemble publication id",
        flags: "--pub --publication <publication>"
    }
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is dodgy, but the typing of this in globals.d.ts is kinda wierd
process.on("unhandledRejection", (error: any): void => logger.error(error));

process.on("uncaughtException", (error: Error): void => logger.error(error));


program.version(packageJson.version);


program
.command("build")
.option(option.mode.flags, option.mode.description, option.mode.fn, option.mode.default)
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.action(async (options: BuildOptions): Promise<void> => buildTask(config, {
    environment: options.environment,
    mode: options.mode,
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
.option(option.lintAll.flags, option.lintAll.description, option.lintAll.default)
.option(option.lintFix.flags, option.lintFix.description, option.lintFix.default)
.action(async (options: LintOptions): Promise<void> => testTask(config, {
    all: options.all,
    fix: options.fix,
    tests: false,
    type: options.type
}));

program
.command("local")
.option(option.mode.flags, option.mode.description, option.mode.fn, option.mode.default)
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.action(async (options: LocalOptions): Promise<void> => localTask(config, {
    environment: options.environment,
    mode: options.mode,
    publication: options.publication
}));

program
.command("setup")
.action(async (): Promise<void> => setupTask());

program
.command("test")
.option(option.lintType.flags, option.lintType.description, option.lintType.default)
.option(option.lintAll.flags, option.lintAll.description, option.lintAll.default)
.option(option.lintFix.flags, option.lintFix.description, option.lintFix.default)
.action(async (options: TestOptions): Promise<void> => testTask(config, {
    all: options.all,
    fix: options.fix,
    type: options.type
}));


program.parse(process.argv);
