

import path from "path";

import fs from "fs-extra";
import gulp from "gulp";
import install from "gulp-install";
import cache from "gulp-cache";
import { logger } from "@newsteam/cli-logger";


const label = "npm";


export const npmInstallTask = async function(...manifests: string[]): Promise<void>{

    for(const manifest of manifests){

        const exists = fs.existsSync(manifest);

        if(exists){

            logger.log(`install ${ path.resolve(manifest) }`, { label });

            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => {

                gulp.src([`./${ manifest }`])
                .pipe(cache(
                    install(),
                    {
                        name: "install"
                    }
                ))
                .pipe(gulp.dest(path.dirname(manifest)))
                .on("finish", (): void => {

                    resolve();

                });

            });

        }else{

            logger.log(`Could not find npm manifest ${ manifest }`, { label });

        }

    }

};

