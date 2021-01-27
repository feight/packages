
/*

    eslint

    no-await-in-loop: "off",

    --

    This is the only way to execute a series of promises sequentially

*/

import path from "path";

import fs from "fs-extra";
import gulp from "gulp";
import install from "gulp-install";
import cache from "gulp-cache";
import { logger } from "@newsteam/legacy-cli-logger";
import { getPackageJson } from "@newsteam/package-json";
import { getInstallMap } from "@newsteam/npm-install-local";

const label = "npm";


export const npmInstallTask = async function(...manifests: string[]): Promise<void>{

    const bar = logger.progress({
        label,
        total: manifests.length
    });

    const errors: string[] = [];
    const warnings: string[] = [];

    for(const manifest of manifests){

        const exists = fs.existsSync(manifest);

        if(exists){

            const packageJson = await getPackageJson(manifest);

            if(packageJson.localDependencies){

                const localInstallMap = await getInstallMap();

                const dependencies = [
                    ...localInstallMap.pipeline.install,
                    ...localInstallMap.pipeline.update
                ];

                if(dependencies.length > 0){

                    warnings.push(`local dependencies out of date in ${ path.resolve(manifest) } `, "");

                    // eslint-disable-next-line max-depth -- I'll allow this for now
                    for(const dependency of dependencies){

                        warnings.push(logger.colorizeText(`  ${ dependency.packageName }`, "#ffa500"));

                    }

                    warnings.push("", `to update run ${ logger.colorizeText("npm run npm-install-local", "#0f0") }`);

                }

            }else{

                await new Promise<void>((resolve) => {

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

            errors.push(`Could not find npm manifest ${ manifest }`);

        }

        bar.tick();

    }

    if(warnings.length > 0){

        logger.log("", { label });

    }

    for(const error of errors){

        logger.error(error, { label });

    }

    for(const warning of warnings){

        logger.log(warning, { label });

    }

};

