

import path from "path";

import fs from "fs-extra";
import globby from "globby";
import { argv as args } from "yargs";
import {
    prompt,
    PromptChoice
} from "@newsteam/cli-utils";


interface Publication{
    folder: string;
    id: string;
    name: string;
    parent?: string;
    path: string;
}


const getPublications = async function(): Promise<Publication[]>{

    const configsPaths = await globby([
        "publications/*/settings/index.json",
        "publications/*/*/settings/index.json"
    ]);

    const publications = configsPaths.map((pth) => {

        const config = JSON.parse(fs.readFileSync(pth).toString());
        const publicationFolder = path.join(path.dirname(path.resolve(pth)), "..");
        const publicationFolderName = path.basename(publicationFolder);
        const publicationParentFolderName = path.basename(path.join(publicationFolder, ".."));

        return {
            folder: publicationFolderName,
            id: config.pubId,
            name: config.name,
            parent: publicationParentFolderName === "publications" ? "" : publicationParentFolderName,
            path: publicationFolder
        };

    });

    // Sort the publications alphabetically
    publications.sort((publicationA, publicationB) => publicationA.path > publicationB.path ? 1 : -1);

    // Sort the publications by parent
    publications.sort((publicationA, publicationB) => publicationA.parent > publicationB.parent ? -1 : 1);

    // If the publication id is passed directly, filter all the other pubs out.
    if(args.publication){

        const filtered = publications.filter((publication) => publication.id === args.publication);

        if(filtered.length > 0){

            return filtered;

        }

    }

    return publications;

};

const getChoices = function(publicationRoots: Publication[]): PromptChoice[]{

    const choices: PromptChoice[] = [];

    let lastParent: string | undefined;

    publicationRoots.forEach((pub) => {

        const parent = pub.parent;

        if(parent){

            if(!lastParent || lastParent !== parent){

                choices.push({
                    separator: " "
                });

                choices.push({
                    separator: pub.parent
                });

            }

        }

        if(lastParent && !pub.parent){

            choices.push({
                separator: " "
            });

        }

        choices.push({
            name: `${ pub.parent ? " " : "" }${ pub.name } (${ pub.id })`,
            value: pub.path
        });

        lastParent = parent;

    });

    return choices;

};


export type PublicationFolder = string;


export const promptPublication = async function(): Promise<PublicationFolder>{

    const publications = await getPublications();
    const choices = getChoices(publications);

    return publications.length === 1 ? publications[0].path : prompt("publication", choices);

};
