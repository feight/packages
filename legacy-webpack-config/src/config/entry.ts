

import fs from "fs";
import path from "path";

import glob from "globby";
import type { Configuration } from "webpack";


type EntryObject = Record<string, string | [string, ...string[]]>;

const webpackFunctionRegex = /\{\{\s*?webpack\(['"](.*?)['"],\s*?['"](.*?\.js)['"]/gu;

const jsEntrypoints = function(globPath: string, regex: RegExp): EntryObject{

    // eslint-disable-next-line unicorn/no-array-reduce -- replace all items in globPath with relative reference
    return glob.sync(globPath).reduce((result: EntryObject, item: string) => ({
        ...result,
        [item.replace(regex, "$1")]: `./${ item }`
    }), {});

};

const htmlEntrypoints = function(): EntryObject{

    const entries: EntryObject = {};
    const files: EntryObject = {};

    /*
     * Loop through all html files in the project looking for calls to the webpack
     * function. When you find a call to webpack, convert it to an webpack entrypoint
     * and add it to the entry object.
     *
     * {{ webpack("entry-id, "src/script.js")|safe }}
     */
    for(const htmlFile of glob.sync("src/publication/{base,custom,shared}/**/*.html")){

        const html = fs.readFileSync(htmlFile).toString();

        const matcher = (match: RegExpExecArray | null): void => {

            if(match){

                const [, key, file] = match;

                const fsFile = path.join(process.cwd(), file);
                const filePath = `./${ file }`;

                if(entries[key] && entries[key] !== filePath){
                    throw new Error(`Duplicate entry key "${ key }" with different entry file "${ file }" detected in file ${ htmlFile }`);
                }else if(files[file]){
                    throw new Error(`Duplicate entry file "${ file }" detected in file ${ htmlFile }`);
                }

                if(!fs.existsSync(fsFile)){
                    throw new Error(`Missing entry file "${ fsFile }" detected in file ${ htmlFile }`);
                }

                entries[key] = filePath;
                files[key] = filePath;

                matcher(webpackFunctionRegex.exec(html));

            }

        };

        matcher(webpackFunctionRegex.exec(html));

    }

    return entries;

};


const serviceWorkerEntryPoints = function(): EntryObject{

    // The default service worker if the client doesn't specifcy one
    return {
        "service-worker": ((): string => {

            // The custom publication service worker
            if(fs.existsSync("src/publication/custom/.service-worker.ts")){
                return "./src/publication/custom/.service-worker.ts";
            }

            // The client service worker
            if(fs.existsSync(".service-worker.ts")){
                return "./.service-worker.ts";
            }

            // The fallback service worker
            return "@newsteam/legacy-service-worker/lib/entry.js";

        })()
    };

};


/*
 * The entrypoint for the application.
 *
 * https://webpack.js.org/concepts/entry-points/
 */
export const entry = function(): Configuration{

    return {
        entry: {
            ...htmlEntrypoints(),
            ...jsEntrypoints(
                "src/publication/custom/devices/*/pages/**/index.js",
                /src\/publication\/custom\/(devices\/.*?)\/index.js$/gu
            ),
            ...jsEntrypoints(
                "src/publication/custom/pages/**/index.js",
                /src\/publication\/custom\/(.*?)\/index.js$/gu
            ),
            ...jsEntrypoints(
                "src/publication/base/pages/**/index.js",
                /src\/publication\/base\/(.*?)\/index.js$/gu
            ),
            ...serviceWorkerEntryPoints(),
            assemble: "assemble/index.ts",
            styleGuide: "style-guide/index.ts"
        }
    };

};
