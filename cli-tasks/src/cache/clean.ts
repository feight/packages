

import path from "path";

import fs from "fs-extra";
import cache from "gulp-cache";


export const cleanCacheTask = async function(): Promise<void>{

    await new Promise((resolve) => {

        const cachePath = path.join(process.cwd(), ".local/cache");

        if(fs.existsSync(cachePath)){

            fs.removeSync(cachePath);

        }

        cache.clearAll();

        resolve();

    });

};

