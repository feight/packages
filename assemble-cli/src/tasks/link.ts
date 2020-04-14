

import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";

import { promptPublication } from "../utils/prompt-publication";


const label = "symlink";


export const linkTask = async function(publication?: boolean | string): Promise<void>{

    const cwd = process.cwd();
    const exists = fs.existsSync(path.join(cwd, "src/publication/custom"));

    if(!exists || publication){

        const folder = await promptPublication(typeof publication === "string" ? publication : undefined);

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

    logger.log(path.relative(cwd, linkPath), {
        color: "#00ff00",
        label
    });

};
