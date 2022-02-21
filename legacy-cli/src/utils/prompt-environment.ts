

import { prompt } from "@newsteam/cli-utils";

import type { PromptChoice } from "@newsteam/cli-utils";
import type { AssemblePublicationEnvironmentSettings } from "@newsteam/legacy-settings";
import type { Publication } from "./publication";


const getChoices = function(environments: AssemblePublicationEnvironmentSettings[]): PromptChoice<AssemblePublicationEnvironmentSettings>[]{

    const choices: PromptChoice<AssemblePublicationEnvironmentSettings>[] = [];

    for(const environment of environments){

        choices.push({
            name: `${ environment.name } (${ environment.id })`,
            value: environment
        });

    }

    return choices;

};

export const promptEnvironment = async function(publication: Publication, environmentId?: string): Promise<AssemblePublicationEnvironmentSettings>{

    const environments = publication.settings.environments;
    const environmentsFilter = environments.filter((environment) => environment.id === environmentId);

    if(environmentId && environmentsFilter.length === 0){

        throw new Error(`No environment with id '${ environmentId }'`);

    }

    return prompt("environment", getChoices(environments), environmentsFilter.length === 1 ? environmentsFilter[0] : undefined);

};
