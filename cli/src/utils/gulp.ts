

import stream from "stream";

import gulpWatch from "gulp-watch";
import through from "through2";
import { logger } from "@newsteam/cli-logger";
import vinyl from "vinyl";


export const fail = function(label: string, message: string): void{

    if(message && typeof message === "string"){
        logger.log(message, { label });
    }

    // Make it beep beep like a jeep jeep
    process.stdout.write("\u0007");

};


export const print = function(label: string, color = "#ffffff"): stream.Transform{

    return through({ objectMode: true }, function blank(
        file: vinyl,
        encoding: string,
        done: through.TransformCallback
    ): void{

        if(file.isNull()){
            return done();
        }

        logger.log(file.path, {
            color,
            label: label || "gulp"
        });

        // Not invalid since that function is bound by the through library
        // eslint-disable-next-line no-invalid-this
        this.push(file);

        return done();

    });

};


export const skip = function(): stream.Transform{

    return through({ objectMode: true }, function blank(
        file: vinyl,
        encoding: string,
        done: through.TransformCallback
    ): void{

        if(file.isNull()){
            return done();
        }

        // Not invalid since that function is bound by the through library
        // eslint-disable-next-line no-invalid-this
        this.push(file);

        return done();

    });

};


export const task = function(
    func: (
        files: string | string[],
        watch?: boolean
    ) => Promise<void>
): () => Promise<void>{

    return async function asyncLintTask(
        paths: string | string[] = __filename,
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
            // Not sure wtf is wrong with this - but whatever
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            }).on("change", async (file): Promise<void> => {

                await func(file, true);

            });

        }else{

            await func(paths);

        }

    };

};
