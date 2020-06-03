

import path from "path";

import fs from "fs-extra";
import gulp from "gulp";
import install from "gulp-install";
import cache from "gulp-cache";
import { logger } from "@newsteam/cli-logger";
import { getPackageJson } from "@newsteam/package-json";


const label = "npm";


export const npmInstallTask = async function(...manifests: string[]): Promise<void>{

    const bar = logger.progress({
        label,
        tag: "install",
        total: manifests.length
    });

    const warnings: string[] = [];

    for(const manifest of manifests){

        const exists = fs.existsSync(manifest);

        if(exists){

            // eslint-disable-next-line no-await-in-loop -- This is the only way to execute a series of promises sequentially
            const packageJson = await getPackageJson(manifest);

            if(packageJson.localDependencies){

                warnings.push(`Local dependencies found in ${ path.resolve(manifest) }. Please install dependencies manually`);

            }else{

                // eslint-disable-next-line no-await-in-loop -- This is the only way to execute a series of promises sequentially
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

            }

        }else{

            warnings.push(`Could not find npm manifest ${ manifest }`);

        }

        bar.tick();

    }

    if(warnings.length > 0){

        logger.log("", { label });

    }

    warnings.forEach((warning) => {

        logger.warn(warning, { label });

    });

};

