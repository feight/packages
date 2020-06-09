

import path from "path";

import globby from "globby";
import {
    AssemblePublicationSettings,
    getPublicationSettings
} from "@newsteam/assemble-settings";


export interface Publication{
    folder: string;
    id: string;
    name: string;
    parent?: string;
    path: string;
    settings: AssemblePublicationSettings;
}


export const getPublication = function(publicationFolder: string): Publication{

    const settings = getPublicationSettings(publicationFolder);
    const publicationFolderName = path.basename(publicationFolder);
    const publicationParentFolderName = path.basename(path.join(publicationFolder, ".."));

    return {
        folder: publicationFolderName,
        id: settings.pubId,
        name: settings.name,
        parent: publicationParentFolderName === "publications" ? "" : publicationParentFolderName,
        path: publicationFolder,
        settings
    };

};


export const getPublications = async function(publication?: string): Promise<Publication[]>{

    const publicationFolders = (await globby([
        "publications/*/settings/index.json",
        "publications/*/*/settings/index.json"
    ])).map((folder) => path.normalize(path.join(folder, "../..")));

    const publications = publicationFolders.map((publicationFolder) => getPublication(publicationFolder));

    // Sort the publications alphabetically
    publications.sort((publicationA, publicationB) => publicationA.path > publicationB.path ? 1 : -1);

    // Sort the publications by parent
    publications.sort((publicationA, publicationB) => String(publicationA.parent) > String(publicationB.parent) ? -1 : 1);

    // If the publication id is passed directly, filter all the other pubs out.
    if(publication){

        const filtered = publications.filter((pub) => pub.id === publication);

        if(filtered.length > 0){

            return filtered;

        }

    }

    return publications;

};
