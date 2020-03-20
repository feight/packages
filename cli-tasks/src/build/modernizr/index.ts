

import path from "path";

import fs from "fs-extra";
import modernizr from "modernizr";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";

import { ModernizrConfig } from "./types";


export interface BuildModernizrTaskOptions extends WatchOptions{
    config: ModernizrConfig;
    destination: string;
    filename: string;
    label?: string;
}


export const buildModernizrTask = async function(options: BuildModernizrTaskOptions): Promise<void>{

    const {
        config,
        destination,
        filename,
        label = "build"
    } = options;

    const bar = logger.progress({
        label,
        tag: "modernizr",
        total: 1
    });

    await watch(options, async (): Promise<void> => {

        await new Promise((resolve) => {

            /*
             * These parens are necessary and the modernizr typing is broken so
             * we need to treat it as any until that gets resolved
             */
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            (modernizr as any).build(config, async (result: string) => {

                await fs.ensureDir(destination);
                await fs.writeFile(path.join(destination, filename), result);

                if(options.watch){

                    logger.log(`built modernizr ${ path.resolve(path.join(destination, filename)) }`, { label });

                }else{

                    bar.tick();

                }

                resolve();

            });

        });

    });

};
