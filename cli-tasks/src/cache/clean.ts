

import path from "path";

import del from "del";
import cache from "gulp-cache";


export const cleanCacheTask = async function(): Promise<void>{

    await Promise.all([
        ".newsteam/cache/virtualenv.json",
        ".newsteam/cache/webpack"
    ].map(async (cachePath) => {

        await del(path.join(process.cwd(), cachePath));

    }));

    cache.clearAll();

};

