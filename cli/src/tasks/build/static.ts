

import path from "path";

import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import fs from "fs-extra";
import glob from "globby";

import { label } from ".";


export interface BuildStaticAssetsTaskOptions extends WatchOptions{
    destination: string;
    label?: string;
}


export const buildStaticAssetsTask = async function(options: BuildStaticAssetsTaskOptions): Promise<void>{

    const mapper = (files: string[], level: string): Promise<void>[] => files.map((file) => {

        const relative = file.replace(`src/publication/${ level }/static`, "");

        logger.log(`copy ${ path.resolve(file) }`, { label: options.label ?? label });

        return fs.copy(file, path.join(options.destination, "static", relative));

    });

    await watch(options, async (): Promise<void> => {

        const base = await glob("src/publication/base/static/**/*.*");
        const custom = await glob("src/publication/custom/static/**/*.*");
        const shared = await glob("src/publication/shared/static/**/*.*");

        await Promise.all(mapper(base, "base"));
        await Promise.all(mapper(shared, "shared"));
        await Promise.all(mapper(custom, "custom"));

    });

};
