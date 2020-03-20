

import { logger } from "@newsteam/cli-logger";
import del from "del";


const label = "clean";


export const cleanTask = async function(...paths: string[]): Promise<void>{

    const progress = logger.progress({
        label,
        total: paths.length
    });

    await Promise.all(paths.map(async (path) => {

        await del(path);

        progress.tick();

    }));

};

