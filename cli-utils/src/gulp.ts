

import type stream from "stream";

import gulpWatch from "gulp-watch";
import through from "through2";
import { logger } from "@newsteam/legacy-cli-logger";
import type vinyl from "vinyl";


export const fail = function(label: string, message: string): void{

    if(message && typeof message === "string"){
        logger.log(message, { label });
    }

    // Make it beep beep, like a jeep jeep
    process.stdout.write("\u0007");

};


export const skip = function(): stream.Transform{

    return through({ objectMode: true }, function blank(
        file: vinyl,
        encoding: string,
        done: through.TransformCallback
    ): void{

        if(file.isNull()){

            done();

            return;

        }

        // eslint-disable-next-line @typescript-eslint/no-invalid-this -- Not invalid since that function is bound by the through library
        this.push(file);

        done();

    });

};


export const task = function(
    taskFunction: (
        files: string[] | string,
        watch?: boolean
    ) => Promise<void>
): () => Promise<void>{

    return async function asyncLintTask(
        paths: string[] | string = __filename,
        watch = false
    ): Promise<void>{

        if(watch){

            gulpWatch(paths, {
                base: "src",
                events: [
                    "add",
                    "change",
                    "unlink",
                    "addDir",
                    "unlinkDir"
                ]
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- Not sure wtf is wrong with this - but whatever
            }).on("change", async (file): Promise<void> => {

                await taskFunction(file, true);

            });

        }else{

            await taskFunction(paths);

        }

    };

};
