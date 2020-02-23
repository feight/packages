

import { logger } from "@newsteam/cli-logger";
import del from "del";


const label = "clean";


export const cleanTask = async function(...paths: string[]): Promise<void>{

    await del(paths);

    paths.forEach((path) => {

        logger.log(path, { label });

    });

};

