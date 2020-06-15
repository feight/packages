
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
import {
    cleanCacheTask,
    optimizeTask
} from "@newsteam/cli-tasks";

import {
    config,
    Mode,
    modes
} from "../config";
import {
    buildTask,
    BuildTaskOptions
} from "../tasks/build";
import { cleanTask } from "../tasks/clean";
import {
    deployTask,
    DeployTaskOptions
} from "../tasks/deploy";
import { linkTask } from "../tasks/link";
import {
    localTask,
    LocalTaskOptions
} from "../tasks/local";
import {
    promoteTask,
    PromoteTaskOptions
} from "../tasks/promote";
import {
    setupTask,
    SetupTaskOptions
} from "../tasks/setup";
import {
    testTask,
    TestTaskLintType
} from "../tasks/test";
import { action } from "../utils/action";


interface LintOptions{
    all: boolean;
    fix: boolean;
    type: TestTaskLintType;
}

type TestOptions = LintOptions;


const packageJsonRaw = fs.readFileSync(path.join(__dirname, "../../package.json"));
const packageJson = JSON.parse(packageJsonRaw.toString()) as { version: string };


const option = {
    environment: {
        description: "target a publication environment by Assemble publication environment id",
        flags: "--env --environment <environment>"
    },
    link: {
        default: false,
        description: "link to a publication before the build",
        flags: "--link"
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
    },
    setupType: {
        description: "specify which type of setup you want to execute.",
        flags: "--type [type]"
    },
    versionId: {
        default: undefined,
        description: "target a deployment version",
        flags: "--version <versionId>"
    }
};


process.on("unhandledRejection", (error: Error): void => logger.error(error));
process.on("uncaughtException", (error: Error): void => logger.error(error));


program.version(packageJson.version);


program
.command("build")
.option(option.mode.flags, option.mode.description, option.mode.fn, option.mode.default)
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.option(option.link.flags, option.link.description, option.link.default)
.action(async (options: BuildTaskOptions): Promise<void> => action(() => buildTask(config, {
    environment: options.environment,
    link: options.link,
    mode: options.mode,
    publication: options.publication
})));

program
.command("clean")
.action(async (): Promise<void> => action(() => cleanTask(config, { cache: true })));


program
.command("clean-cache")
.action(async (): Promise<void> => action(() => cleanCacheTask()));

program
.command("deploy")
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.option(option.versionId.flags, option.versionId.description, option.versionId.default)
.action(async (options: DeployTaskOptions): Promise<void> => action(() => deployTask(config, {
    environment: options.environment,
    publication: options.publication,
    versionId: options.versionId
})));

program
.command("link")
.action(async (): Promise<void> => action(() => linkTask(true)));

program
.command("lint")
.option(option.lintType.flags, option.lintType.description, option.lintType.default)
.option(option.lintAll.flags, option.lintAll.description, option.lintAll.default)
.option(option.lintFix.flags, option.lintFix.description, option.lintFix.default)
.action(async (options: LintOptions): Promise<void> => action(() => testTask(config, {
    all: options.all,
    fix: options.fix,
    tests: false,
    type: options.type
})));

program
.command("local")
.option(option.mode.flags, option.mode.description, option.mode.fn, option.mode.default)
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.option(option.link.flags, option.link.description, option.link.default)
.action(async (options: LocalTaskOptions): Promise<void> => action(() => localTask(config, {
    environment: options.environment,
    link: options.link,
    mode: options.mode,
    publication: options.publication
})));

program
.command("optimize")
.action(async (): Promise<void> => action(() => optimizeTask({
    glob: config.paths.entries.glob
})));

program
.command("promote")
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.action(async (options: PromoteTaskOptions): Promise<void> => action(() => promoteTask(config, {
    environment: options.environment,
    publication: options.publication
})));

program
.command("setup")
.option(option.publication.flags, option.publication.description)
.option(option.environment.flags, option.environment.description)
.option(option.setupType.flags, option.setupType.description)
.action(async (options: SetupTaskOptions): Promise<void> => action(() => setupTask({
    environment: options.environment,
    publication: options.publication,
    type: options.type
})));

program
.command("test")
.option(option.lintType.flags, option.lintType.description, option.lintType.default)
.option(option.lintAll.flags, option.lintAll.description, option.lintAll.default)
.option(option.lintFix.flags, option.lintFix.description, option.lintFix.default)
.action(async (options: TestOptions): Promise<void> => action(() => testTask(config, {
    all: options.all,
    fix: options.fix,
    type: options.type
})));


program.parse(process.argv);
