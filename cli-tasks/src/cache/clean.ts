

import path from "path";

import del from "del";
import cache from "gulp-cache";


export const cleanCacheTask = async function(): Promise<void>{

    await Promise.all([
        ".local/cache/@newsteam/cli-tasks/virtualenv.json",
        ".local/cache/@newsteam/webpack"
    ].map(async (cachePath) => {

        await del(path.join(process.cwd(), cachePath));

    }));

    cache.clearAll();

};

