

import { logger } from "@newsteam/legacy-cli-logger";
import { notify } from "@newsteam/cli-notify";
import {
    eslintLintTask,
    flake8LintTask,
    htmllintLintTask,
    stylelintLintTask
} from "@newsteam/cli-tasks";

import { testSettingsTask } from "./settings";
import { testSharedSettingsTask } from "./settings/shared";

import type {
    EslintLintTaskOptions,
    Flake8LintTaskOptions,
    HtmllintLintTaskOptions,
    StylelintLintTaskOptions
} from "@newsteam/cli-tasks";
import type { NewsTeamConfig } from "@newsteam/legacy-cli-config";
import type { TestError } from "@newsteam/legacy-cli-errors";
import type { TestSettingsTaskOptions } from "./settings";


const lintErrors = async function(configs: TestTaskConfigurations, fix: boolean, type?: TestTaskLintType): Promise<TestError[]>{

    const errors: TestError[] = [];

    if(!type || type === "eslint"){

        try{
            await eslintLintTask({
                ...configs.eslintLintTask,
                fix
            });
        }catch(error: unknown){
            errors.push(error as TestError);
        }

    }

    if(!type || type === "htmllint"){

        try{
            await htmllintLintTask({
                ...configs.htmllintLintTask,
                fix
            });
        }catch(error: unknown){
            errors.push(error as TestError);
        }

    }

    if(!type || type === "stylelint"){

        try{
            await stylelintLintTask({
                ...configs.stylelintLintTask,
                fix
            });
        }catch(error: unknown){
            errors.push(error as TestError);
        }

    }

    if(!type || type === "flake8"){

        try{
            await flake8LintTask({
                ...configs.flake8LintTask,
                fix
            });
        }catch(error: unknown){
            errors.push(error as TestError);
        }

    }

    return errors;

};

const testErrors = async function(configs: TestTaskConfigurations): Promise<TestError[]>{

    const errors: TestError[] = [];

    try{
        await testSettingsTask({ ...configs.testSettingsTask });
    }catch(error: unknown){
        errors.push(error as TestError);
    }

    try{
        await testSharedSettingsTask();
    }catch(error: unknown){
        errors.push(error as TestError);
    }

    return errors;

};


export const label = "test";


export type TestTaskLintType = "eslint" | "flake8" | "htmllint" | "stylelint";


export interface TestTaskOptions{
    all?: boolean;
    type?: TestTaskLintType;
    tests?: boolean;
    fix?: boolean;
}


export interface TestTaskConfigurations{

    eslintLintTask: EslintLintTaskOptions;

    flake8LintTask: Flake8LintTaskOptions;

    htmllintLintTask: HtmllintLintTaskOptions;

    stylelintLintTask: StylelintLintTaskOptions;

    testSettingsTask: TestSettingsTaskOptions;

}


export const generateTestTaskConfigs = function(config: NewsTeamConfig, options: TestTaskOptions): TestTaskConfigurations{

    const base = {
        destination: config.paths.build,
        label,
        source: config.paths.source
    };

    return {
        eslintLintTask: {
            ...base,
            ...config.lint.glob(["js", "jsx", "ts", "tsx"], options.all)
        },
        flake8LintTask: {
            ...base,
            ...config.lint.glob("py", options.all)
        },
        htmllintLintTask: {
            ...base,
            ...config.lint.glob("html", options.all),
            options: config.htmllint.options
        },
        stylelintLintTask: {
            ...base,
            ...config.lint.glob(["css", "scss"], options.all)
        },
        testSettingsTask: {
            validations: config.paths.settings.validations
        }
    };

};


export const testTask = async function(config: NewsTeamConfig, options: TestTaskOptions): Promise<void>{

    const configs = generateTestTaskConfigs(config, options);
    const {
        type,
        tests = true,
        fix = false
    } = options;

    let errors: TestError[] = [];

    errors = [
        ...errors,
        ...tests ? await testErrors(configs) : [],
        ...await lintErrors(configs, fix, type)
    ];

    for(const error of errors){

        logger.error(error);

    }

    let totalErrors = 0;

    for(const file of errors){

        for(const error of file.data){

            totalErrors += error.errors.length;

        }

    }

    const message = `${ totalErrors } error${ totalErrors === 1 ? "" : "s" } found`;
    const title = `${ tests ? "Testing" : "Linting" } Complete`;

    await notify({
        message,
        title
    });

    logger.log("");
    logger.log(title, { label });
    logger.log(message, { label });

    if(errors.length > 0){

        process.stdout.write("\u0007");

        process.exit();

    }

};
