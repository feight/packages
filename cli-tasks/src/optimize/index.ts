

import path from "path";

import { imagemin } from "@newsteam/imagemin";
import { logger } from "@newsteam/legacy-cli-logger";
import { watch } from "@newsteam/cli-utils";
import fs from "fs-extra";
import filesize from "filesize";

import type { WatchOptions } from "@newsteam/cli-utils";


export interface OptimizeTaskOptions extends WatchOptions{
    label?: string;
}


export const optimizeTask = async function(options: OptimizeTaskOptions): Promise<void>{

    const label = options.label ?? "optimize";

    await watch(options, async (files: string[]): Promise<void> => {

        const stats = await Promise.all(files.map((pth): Promise<fs.Stats> => fs.stat(pth)));
        const sizes = stats.map((stat): number => stat.size);

        const bar = logger.progress({
            label,
            tag: `images ${ logger.colorizeText(`${ files.length }`, "#444") }`,
            total: files.length + 1
        });

        bar.tick();

        // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises -- We're try catching into the rejection, so we'll catch any errors
        const savings = await Promise.all(files.map((pth, index): Promise<number> => new Promise(async (resolve, reject): Promise<void> => {

            try{

                const [file] = await imagemin([pth], path.dirname(pth));

                const percentageBase = 100;
                const diff = sizes[index] - file.data.byteLength;
                const arrow = `${ filesize(sizes[index]) } > ${ filesize(file.data.byteLength) }`;
                const percentage = logger.colorizeText(`${ (diff / sizes[index] * percentageBase).toFixed(1) }%`, diff < 0 ? "#ff0000" : "#00ff00");

                if(options.watch){

                    logger.log(`${ percentage } ${ arrow } ${ logger.colorizeText(pth, "#666") }`, { label });

                }else{

                    bar.tick();

                }

                resolve(diff);

            }catch(error: unknown){

                reject(error);

            }

        })));

        if(savings.length > 0){

            const saved = filesize(savings.reduce((accumulator, current): number => Number(current) + Number(accumulator)));

            logger.log(`Saved a total of ${ logger.colorizeText(saved, "#00ff00") }`, { label });

        }else{

            logger.log("No images found", { label });

        }

    });

};
