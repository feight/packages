

import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";

import { promptPublication } from "../utils/prompt-publication";


const label = "symlink";


export const linkTask = async function(force?: boolean): Promise<void>{

    const cwd = process.cwd();
    const exists = fs.existsSync(path.join(cwd, "src/publication/custom"));

    if(!exists || force){

        const folder = await promptPublication();

        const customDestination = "src/publication/custom";
        const sharedDestination = "src/publication/shared";
        const customSource = folder;
        const sharedSource = "shared";

        await fs.remove(customDestination);
        await fs.remove(sharedDestination);

        await fs.ensureSymlink(customSource, customDestination);
        await fs.ensureSymlink(sharedSource, sharedDestination);


    }

    const linkPath = await fs.realpath(path.join(cwd, "src/publication/custom"));

    logger.log(linkPath, {
        color: "#00ff00",
        label
    });

};
