

import gulp from "gulp";
import type { WatchOptions } from "@newsteam/cli-utils";
import { watch } from "@newsteam/cli-utils";
import { logger } from "@newsteam/legacy-cli-logger";


export interface BuildRSSTaskOptions extends WatchOptions{
    destination: string;
    source: string;
    label?: string;
}


export const buildRSSTask = async function(options: BuildRSSTaskOptions): Promise<void>{

    const label = options.label ?? "build";

    await watch(options, async (files: string[]): Promise<void> => {

        const bar = logger.progress({
            label,
            tag: "rss",
            total: files.length
        });

        await new Promise((resolve) => {

            gulp.src(files, { base: options.source })
            .pipe(options.watch ? logger.gulp({
                label,
                tag: "built rss"
            }) : bar.gulpTick(bar))
            .pipe(gulp.dest(options.destination))
            .on("end", resolve);

        });

    });

};

