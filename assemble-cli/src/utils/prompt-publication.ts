

import path from "path";

import globby from "globby";
import { argv as args } from "yargs";
import {
    prompt,
    PromptChoice
} from "@newsteam/cli-utils";
import { getPublicationSettings } from "@newsteam/assemble-settings";


interface Publication{
    folder: string;
    id: string;
    name: string;
    parent?: string;
    path: string;
}


const getPublications = async function(): Promise<Publication[]>{

    const publicationFolders = (await globby([
        "publications/*/settings/index.json",
        "publications/*/*/settings/index.json"
    ])).map((folder) => path.normalize(path.join(folder, "../..")));

    const publications = publicationFolders.map((publicationFolder) => {

        const settings = getPublicationSettings(publicationFolder);
        const publicationFolderName = path.basename(publicationFolder);
        const publicationParentFolderName = path.basename(path.join(publicationFolder, ".."));

        return {
            folder: publicationFolderName,
            id: settings.pubId,
            name: settings.name,
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

    let lastParent: string | undefined = undefined;

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


export const promptPublication = async function(publication?: string): Promise<PublicationFolder>{

    const publications = await getPublications();

    if(publication){

        const pubs = publications.filter((pub) => pub.id === publication);

        if(pubs.length === 1){

            return pubs[0].path;

        }

        throw new Error(`No publication with id '${ publication }'`);

    }

    const choices = getChoices(publications);

    return publications.length === 1 ? publications[0].path : prompt("publication", choices);

};
