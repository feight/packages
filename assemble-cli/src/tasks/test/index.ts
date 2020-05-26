

import { TestError } from "@newsteam/cli-errors";
import { logger } from "@newsteam/cli-logger";
import { notify } from "@newsteam/cli-notify";
import {
    eslintLintTask,
    EslintLintTaskOptions,
    flake8LintTask,
    Flake8LintTaskOptions,
    htmllintLintTask,
    HtmllintLintTaskOptions,
    stylelintLintTask,
    StylelintLintTaskOptions
} from "@newsteam/cli-tasks";

import {
    testSettingsTask,
    TestSettingsTaskOptions
} from "./settings";
import { testSharedSettingsTask } from "./settings/shared";

import { NewsTeamConfig } from "../../config";


const lintErrors = async function(configs: TestTaskConfigurations, fix: boolean, type?: TestTaskLintType): Promise<TestError[]>{

    const errors: TestError[] = [];

    if(!type || type === "eslint"){

        try{
            await eslintLintTask({
                ...configs.eslintLintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

    }

    if(!type || type === "htmllint"){

        try{
            await htmllintLintTask({
                ...configs.htmllintLintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

    }

    if(!type || type === "stylelint"){

        try{
            await stylelintLintTask({
                ...configs.stylelintLintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

    }

    if(!type || type === "flake8"){

        try{
            await flake8LintTask({
                ...configs.flake8LintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

    }

    return errors;

};

const testErrors = async function(configs: TestTaskConfigurations): Promise<TestError[]>{

    const errors: TestError[] = [];

    try{
        await testSettingsTask({ ...configs.testSettingsTask });
    }catch(error){
        errors.push(error);
    }

    try{
        await testSharedSettingsTask();
    }catch(error){
        errors.push(error);
    }

    return errors;

};


export const label = "test";


export type TestTaskLintType = "eslint" | "stylelint" | "htmllint" | "flake8";


export interface TestTaskOptions{
    lintType?: TestTaskLintType;
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


export const generateTestTaskConfigs = function(config: NewsTeamConfig): TestTaskConfigurations{

    const destination = config.paths.build;
    const source = config.paths.source;

    return {
        eslintLintTask: {
            destination,
            glob: config.paths.scripts.glob,
            ignore: config.paths.scripts.ignore,
            source
        },
        flake8LintTask: {
            destination,
            glob: config.paths.python.glob,
            ignore: config.paths.python.ignore,
            source
        },
        htmllintLintTask: {
            destination,
            glob: config.paths.html.glob,
            ignore: config.paths.html.ignore,
            options: config.htmllint.options,
            source
        },
        stylelintLintTask: {
            destination,
            glob: config.paths.styles.glob,
            ignore: config.paths.styles.ignore,
            source
        },
        testSettingsTask: {
            validations: config.paths.settings.validations
        }
    };

};


export const testTask = async function(config: NewsTeamConfig, options: TestTaskOptions): Promise<void>{

    const configs = generateTestTaskConfigs(config);
    const {
        lintType,
        tests = true,
        fix = false
    } = options;

    let errors: TestError[] = [];

    errors = errors.concat(tests ? await testErrors(configs) : []);
    errors = errors.concat(await lintErrors(configs, fix, lintType));

    errors.forEach((error) => {

        logger.error(error);

    });

    let totalErrors = 0;

    errors.forEach((file) => {

        file.data.forEach((error) => {

            totalErrors += error.errors.length;

        });

    });

    await notify({
        message: `${ totalErrors } error${ totalErrors === 1 ? "" : "s" } found`,
        title: `${ tests ? "Testing" : "Linting" } Complete`
    });

    if(errors.length > 0){

        process.stdout.write("\u0007");

        process.exit();

    }

};
