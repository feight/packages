

import { logger } from "@newsteam/cli-logger";


export const action = async function(task: Promise<void>): Promise<void>{

    logger.log("");

    await task;

    logger.log("");

};
