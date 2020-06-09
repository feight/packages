

import {
    prompt,
    PromptChoice
} from "@newsteam/cli-utils";

import {
    Publication,
    getPublications
} from "./publication";


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
            value: pub
        });

        lastParent = parent;

    });

    return choices;

};


export const promptPublication = async function(publication?: string): Promise<Publication>{

    const publications = await getPublications(publication);

    if(publication){

        const pubs = publications.filter((pub) => pub.id === publication);

        if(pubs.length === 1){

            return pubs[0];

        }

        throw new Error(`No publication with id '${ publication }'`);

    }

    const choices = getChoices(publications);

    return publications.length === 1 ? publications[0] : prompt("publication", choices);

};
