
import path from "path";

import fs from "fs-extra";
import { NewsTeamConfig } from "@newsteam/cli-config";
import { logger } from "@newsteam/cli-logger";

import { label } from ".";


const log = function(filename: string): void{

    logger.log(`entry ${ path.resolve(filename) }`, { label });

};

const writeFileSync = function(filename: string, contents: string): void{

    fs.writeFileSync(filename, contents, "utf8");

    log(filename);

};

const writeFile = async function(filename: string, contents: string): Promise<void>{

    await fs.writeFile(filename, contents, "utf8");

    log(filename);

};


/*
 *  This builds a set of proxy modules that are guarenteed to be present. If
 *  the custom publication contains the corresponding entry points the
 *  require() will be written into the proxy at build time so that webpack
 *  will never be left with broken requirements if the custom publication
 *  doesn't implement them.
 */
export const buildEntriesTask = async function(config: NewsTeamConfig): Promise<void>{

    const getFolders = (directory: string, filelist: string[] = []): string[] => {

        fs.readdirSync(directory).forEach((file): void => {

            if(fs.statSync(`${ directory }/${ file }`).isDirectory()){
                filelist.push(`${ directory }/${ file }`);
                // Given the recursive naturn of this function, we'll allow it
                // eslint-disable-next-line no-param-reassign
                filelist = getFolders(`${ directory }/${ file }`, filelist);
            }

        });

        return filelist;

    };

    const folders = getFolders("src/publication/base/pages")
    .map((folder) => path.relative("src/publication/base/pages", folder))
    .filter((folder) => !folder.includes("includes"));

    folders.forEach((folder) => {

        const jsExists = fs.existsSync(path.join("src/publication/custom/pages", folder, "index.js"));
        const scssExists = fs.existsSync(path.join("src/publication/custom/pages", folder, "index.scss"));
        const scssContent = scssExists ? `require("custom/pages/${ folder }/index.scss");` : "";
        const jsContent = jsExists ? `require("custom/pages/${ folder }");` : "";
        const outputFolder = path.join(config.paths.build, "entries/pages", folder);

        fs.ensureDirSync(outputFolder);

        writeFileSync(path.join(outputFolder, "index.js"), `${ scssContent }\n${ jsContent }`);

    });

    const entryJsExists = fs.existsSync("src/publication/custom/app/entry/index.js");
    const entryPushJsExists = fs.existsSync("src/publication/custom/app/push/index.js");
    const entryScssExists = fs.existsSync("src/publication/custom/app/entry/index.scss");
    const entryJsContent = entryJsExists ? "require(\"custom/app/entry\");" : "";
    const entryPushJsContent = entryPushJsExists ? "require(\"custom/app/push\");" : "";
    const entryScssContent = entryScssExists ? "@import \"custom/app/entry/index.scss\";" : "";
    const entryOutputFolder = path.join(config.paths.build, "entries/entry");
    const entryPushOutputFolder = path.join(config.paths.build, "entries/push");

    await fs.ensureDir(entryOutputFolder);
    await fs.ensureDir(entryPushOutputFolder);

    await writeFile(path.join(entryOutputFolder, "index.js"), entryJsContent);
    await writeFile(path.join(entryPushOutputFolder, "index.js"), entryPushJsContent);
    await writeFile(path.join(entryOutputFolder, "index.scss"), entryScssContent);

    const ampScssExists = fs.existsSync("src/publication/custom/app/entry/amp/index.scss");
    const ampScssContent = `@import "${ ampScssExists ? "custom" : "base" }/app/entry/amp/index.scss";`;
    const ampOutputFolder = path.join(config.paths.build, "entries/amp");

    await fs.ensureDir(ampOutputFolder);

    await writeFile(path.join(ampOutputFolder, "index.scss"), ampScssContent);

    const mobileScssExists = fs.existsSync("src/publication/custom/app/entry/mobile/index.scss");
    const mobileScssContent = mobileScssExists ? "@import \"custom/app/entry/mobile/index.scss\";" : "";
    const mobileOutputFolder = path.join(config.paths.build, "entries/mobile");

    await fs.ensureDir(mobileOutputFolder);

    await writeFile(path.join(mobileOutputFolder, "index.scss"), mobileScssContent);

};
