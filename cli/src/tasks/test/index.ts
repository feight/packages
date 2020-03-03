

import { TestError } from "@newsteam/cli-errors";
import { logger } from "@newsteam/cli-logger";
import { eslintLintTask } from "@newsteam/cli-tasks";

import { testSettingsTask } from "./settings";
import { testSharedSettingsTask } from "./settings/shared";

import { NewsTeamConfig } from "../../config";
import { configurator } from "../configurator";


export const label = "test";


export interface TestTaskOptions{
    lints?: boolean;
    tests?: boolean;
    fix?: boolean;
}


export const testTask = async function(config: NewsTeamConfig, options: TestTaskOptions): Promise<void>{

    const configs = configurator(config);
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

    }

    errors.forEach((error) => {

        logger.error(error);

    });

    if(errors.length > 0){

        process.stdout.write("\u0007");

        process.exit();

    }

};
