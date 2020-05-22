

import { TestError } from "@newsteam/cli-errors";
import { logger } from "@newsteam/cli-logger";
import { notify } from "@newsteam/cli-notify";
import {
    eslintLintTask,
    EslintLintTaskOptions,
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


export const label = "test";


export interface TestTaskOptions{
    lints?: boolean;
    tests?: boolean;
    fix?: boolean;
}


export interface TestTaskConfigurations{

    eslintLintTask: EslintLintTaskOptions;

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
    const errors: TestError[] = [];

    const {
        lints = true,
        tests = true,
        fix = false
    } = options;

    if(tests){

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

    }

    if(lints){

        try{
            await eslintLintTask({
                ...configs.eslintLintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

        try{
            await htmllintLintTask({
                ...configs.htmllintLintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

        try{
            await stylelintLintTask({
                ...configs.stylelintLintTask,
                fix
            });
        }catch(error){
            errors.push(error);
        }

    }

    errors.forEach((error) => {

        logger.error(error);

    });

    await notify({
        message: `${ errors.length } error${ errors.length === 1 ? "" : "s" } found`,
        title: `${ lints && !tests ? "Linting" : "Testing" } Complete`
    });

    if(errors.length > 0){

        process.stdout.write("\u0007");

        process.exit();

    }

};
