

import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/legacy-cli-logger";

import { promptPublication } from "../utils/prompt-publication";
import type { Publication } from "../utils/publication";
import { getPublication } from "../utils/publication";


const label = "symlink";


export const linkTask = async function(publicationFolder?: boolean | string): Promise<Publication>{

    const cwd = process.cwd();
    const exists = fs.existsSync(path.join(cwd, "src/publication/custom"));

    if(!exists || publicationFolder){

        const publication = await promptPublication(typeof publicationFolder === "string" ? publicationFolder : undefined);

        const customDestination = "src/publication/custom";
        const sharedDestination = "src/publication/shared";
        const customSource = publication.path;
        const sharedSource = "shared";

        await fs.remove(customDestination);
        await fs.remove(sharedDestination);

        await fs.ensureSymlink(customSource, customDestination);
        await fs.ensureSymlink(sharedSource, sharedDestination);

        return publication;

    }

    const linkPath = await fs.realpath(path.join(cwd, "src/publication/custom"));

    logger.log(path.relative(cwd, linkPath), {
        color: "#00ff00",
        label
    });

    return getPublication(linkPath);

};
