

import {
    prompt,
    PromptChoice
} from "@newsteam/cli-utils";
import { AssemblePublicationEnvironmentSettings } from "@newsteam/assemble-settings";

import { Publication } from "./publication";


const getChoices = function(environments: AssemblePublicationEnvironmentSettings[]): PromptChoice[]{

    const choices: PromptChoice[] = [];

    environments.forEach((environment) => {

        choices.push({
            name: `${ environment.name } (${ environment.id })`,
            value: environment
        });

    });

    return choices;

};

export const promptEnvironment = async function(publication: Publication, environmentId?: string): Promise<AssemblePublicationEnvironmentSettings>{

    const environments = publication.settings.environments;
    const choices = getChoices(environments);

    if(environmentId){

        const environmentsFilter = environments.filter((environment) => environment.id === environmentId);

        if(environmentsFilter.length === 1){

            return environmentsFilter[0];

        }

        throw new Error(`No environment with id '${ environmentId }'`);

    }

    return environments.length === 1 ? environments[0] : prompt("environment", choices);

};
