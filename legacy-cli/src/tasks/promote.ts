

import { googleCloudPromoteTask } from "@newsteam/cli-tasks";


import { linkTask } from "./link";

import { promptEnvironment } from "../utils/prompt-environment";

import type { NewsTeamConfig } from "@newsteam/legacy-cli-config";


export interface PromoteTaskOptions{
    environment?: string;
    publication?: string;
}


export const promoteTask = async function(config: NewsTeamConfig, options: PromoteTaskOptions): Promise<void>{

    const publication = await linkTask(options.publication ?? true);
    const environment = await promptEnvironment(publication, options.environment);

    await googleCloudPromoteTask({
        project: environment.id
    });

};
