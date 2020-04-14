

import path from "path";

import fs from "fs-extra";
import cache from "gulp-cache";
import { logger } from "@newsteam/cli-logger";


const label = "clean";


export const cleanCacheTask = async function(): Promise<void>{

    await new Promise((resolve) => {

        const cachePath = path.join(process.cwd(), ".local/cache");

        if(fs.existsSync(cachePath)){

            fs.removeSync(cachePath);

            logger.log(cachePath, { label });

        }

        cache.clearAll();

        logger.log("gulp-cache", { label });

        resolve();

    });

};

