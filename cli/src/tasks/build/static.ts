

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

    await watch(options, async (): Promise<void> => {

        const base = await glob("src/publication/base/static/**/*.*");
        const custom = await glob("src/publication/custom/static/**/*.*");
        const shared = await glob("src/publication/shared/static/**/*.*");

        const bar = logger.progress({
            label,
            tag: "static assets",
            total: base.length + custom.length + shared.length
        });

        const mapper = (files: string[], level: string): Promise<void>[] => files.map((file) => {

            const relative = file.replace(`src/publication/${ level }/static`, "");

            if(options.watch){

                logger.log(`built static asset ${ path.resolve(file) }`, { label: options.label ?? label });

            }else{

                bar.tick();

            }

            return fs.copy(file, path.join(options.destination, "static", relative));

        });

        const promises = [
            ...mapper(base, "base"),
            ...mapper(shared, "shared"),
            ...mapper(custom, "custom")
        ];

        await Promise.all(promises);

    });

};
