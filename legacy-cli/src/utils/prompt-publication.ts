

import type {
    PromptChoice
} from "@newsteam/cli-utils";
import {
    prompt
} from "@newsteam/cli-utils";

import type { Publication } from "./publication";
import {
    getPublications
} from "./publication";


const getChoices = function(publicationRoots: Publication[]): PromptChoice<Publication>[]{

    const choices: PromptChoice<Publication>[] = [];

    let lastParent: string | undefined = undefined;

    for(const pub of publicationRoots){

        const parent = pub.parent;

        if(parent && (!lastParent || lastParent !== parent)){

            choices.push({
                separator: " "
            }, {
                separator: pub.parent
            });

        }

        if(lastParent && !pub.parent){

            choices.push({
                separator: " "
            });

        }

        choices.push({
            name: `${ pub.parent ? " " : "" }${ pub.name } (${ pub.id })`,
            value: pub
        });

        lastParent = parent;

    }

    return choices;

};


export const promptPublication = async function(publication?: string): Promise<Publication>{

    const publications = await getPublications(publication);
    const publicationsFilter = publications.filter((pub) => pub.id === publication);

    if(publication && publicationsFilter.length === 0){

        throw new Error(`No publication with id '${ publication }'`);

    }

    return prompt("publication", getChoices(publications), publicationsFilter.length === 1 ? publicationsFilter[0] : undefined);

};
