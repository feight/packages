

import path from "path";

import { logger } from "@newsteam/cli-logger";
import fs from "fs-extra";
import glob from "glob-promise";
import chokidar from "chokidar";

import { label } from ".";


const buildStatic = async function(options: BuildStaticAssetsTaskOptions): Promise<void>{

    const base = await glob("src/publication/base/static/**/*.*");
    const custom = await glob("src/publication/custom/static/**/*.*");
    const shared = await glob("src/publication/shared/static/**/*.*");

    const mapper = (files: string[], level: string): Promise<void>[] => files.map((file) => {

        const relative = file.replace(`src/publication/${ level }/static`, "");

        logger.log(`copy ${ path.resolve(file) }`, { label: options.label ?? label });

        return fs.copy(file, path.join(options.destination, "static", relative));

    });

    await Promise.all(mapper(base, "base"));
    await Promise.all(mapper(shared, "shared"));
    await Promise.all(mapper(custom, "custom"));

};


export interface BuildStaticAssetsTaskOptions{
    destination: string;
    ignoreInitial?: boolean;
    label?: string;
    watch?: boolean;
}


export const buildStaticAssetsTask = async function(options: BuildStaticAssetsTaskOptions): Promise<void>{

    if(options.watch){

        await new Promise(() => {

            const watchCallback = (): void => {

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                buildStatic(options);

            };

            const watcher = chokidar.watch([
                "src/publication/base/static/**/*.*",
                "src/publication/custom/static/**/*.*",
                "src/publication/shared/static/**/*.*"
            ], {
                ignoreInitial: options.ignoreInitial ?? false,
                persistent: true,
                useFsEvents: false
            });

            watcher
            .on("add", watchCallback)
            .on("change", watchCallback)
            .on("unlink", watchCallback);

        });

    }else{

        await buildStatic(options);

    }

};
