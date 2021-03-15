
import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/legacy-cli-logger";
import type {
    WatchOptions
} from "@newsteam/cli-utils";
import {
    watch
} from "@newsteam/cli-utils";

import { label } from ".";


const getFolders = (directory: string, filelist: string[] = []): string[] => {

    for(const file of fs.readdirSync(directory)){

        if(fs.statSync(`${ directory }/${ file }`).isDirectory()){
            filelist.push(`${ directory }/${ file }`);
            // eslint-disable-next-line no-param-reassign -- Given the recursive naturn of this function, we'll allow it
            filelist = getFolders(`${ directory }/${ file }`, filelist);
        }

    }

    return filelist;

};


export interface BuildEntriesTaskOptions extends WatchOptions{
    destination: string;
    source: string;
}


/*
 *  This builds a set of proxy modules that are guarenteed to be present. If
 *  the custom publication contains the corresponding entry points the
 *  require() will be written into the proxy at build time so that webpack
 *  will never be left with broken requirements if the custom publication
 *  doesn't implement them.
 */
export const buildEntriesTask = async function(options: BuildEntriesTaskOptions): Promise<void>{

    await watch(options, async (): Promise<void> => {

        const {
            destination
        } = options;

        const writes: [string, string][] = [];

        const folders = getFolders("src/publication/base/pages")
        .map((folder) => path.relative("src/publication/base/pages", folder))
        .filter((folder) => !folder.includes("includes"));

        for(const folder of folders){

            const jsExists = fs.existsSync(path.join("src/publication/custom/pages", folder, "index.js"));
            const scssExists = fs.existsSync(path.join("src/publication/custom/pages", folder, "index.scss"));
            const scssContent = scssExists ? `require("custom/pages/${ folder }/index.scss");` : "";
            const jsContent = jsExists ? `require("custom/pages/${ folder }");` : "";
            const outputFolder = path.join(destination, "entries/pages", folder);

            fs.ensureDirSync(outputFolder);

            writes.push([path.join(outputFolder, "index.js"), `${ scssContent }\n${ jsContent }`]);

        }

        const entryJsExists = fs.existsSync("src/publication/custom/app/entry/index.js");
        const entryPushJsExists = fs.existsSync("src/publication/custom/app/push/index.js");
        const entryScssExists = fs.existsSync("src/publication/custom/app/entry/index.scss");

        const entryJsContent = entryJsExists ? "require(\"custom/app/entry\");" : "";
        const entryPushJsContent = entryPushJsExists ? "require(\"custom/app/push\");" : "";
        const entryScssContent = entryScssExists ? "@import \"custom/app/entry/index.scss\";" : "";
        const entryOutputFolder = path.join(destination, "entries/entry");
        const entryPushOutputFolder = path.join(destination, "entries/push");

        writes.push(
            [path.join(entryOutputFolder, "index.js"), entryJsContent],
            [path.join(entryPushOutputFolder, "index.js"), entryPushJsContent],
            [path.join(entryOutputFolder, "index.scss"), entryScssContent]
        );

        const ampScssExists = fs.existsSync("src/publication/custom/app/entry/amp/index.scss");
        const ampScssContent = `@import "${ ampScssExists ? "custom" : "base" }/app/entry/amp/index.scss";`;
        const ampOutputFolder = path.join(destination, "entries/amp");

        writes.push([path.join(ampOutputFolder, "index.scss"), ampScssContent]);

        const mobileScssExists = fs.existsSync("src/publication/custom/app/entry/mobile/index.scss");
        const mobileScssContent = mobileScssExists ? "@import \"custom/app/entry/mobile/index.scss\";" : "";
        const mobileOutputFolder = path.join(destination, "entries/mobile");

        writes.push([path.join(mobileOutputFolder, "index.scss"), mobileScssContent]);

        const bar = logger.progress({
            label,
            tag: "entries",
            total: writes.length
        });

        await Promise.all(writes.map(async (write) => {

            const [filename, contents] = write;

            const exists = fs.existsSync(filename);
            const existing = exists ? (await fs.readFile(filename)).toString() : undefined;

            if(existing !== contents){

                await fs.ensureDir(path.dirname(filename));
                await fs.writeFile(filename, contents, "utf8");

            }

            if(options.watch){
                logger.log(`built entry ${ path.resolve(filename) }`, { label });
            }else{
                bar.tick();
            }

        }));

    });

};
