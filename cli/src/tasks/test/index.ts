

import { NewsTeamConfig } from "@newsteam/cli-config";
import { TestError } from "@newsteam/cli-errors";
import { logger } from "@newsteam/cli-logger";

import { testSettingsTask } from "./settings";
import { testSharedSettingsTask } from "./settings/shared";

import { configurator } from "../configurator";


export const label = "test";


export const testTask = async function(config: NewsTeamConfig): Promise<void>{

    const configs = configurator(config);
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

    errors.forEach((error) => {

        logger.error(error);

    });

    if(errors.length > 0){

        process.stdout.write("\u0007");

        process.exit();

    }

};
