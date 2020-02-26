

import { NewsTeamConfig } from "@newsteam/cli-config";
import { TestError } from "@newsteam/cli-errors";
import { logger } from "@newsteam/cli-logger";

import { testSettingsTask } from "./settings";

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

    errors.forEach((error) => {
        logger.error(error);
    });

};
