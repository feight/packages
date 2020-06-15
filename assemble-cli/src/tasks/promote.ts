

import { googleCloudPromoteTask } from "@newsteam/cli-tasks";

import { linkTask } from "./link";

import { NewsTeamConfig } from "../config";
import { promptEnvironment } from "../utils/prompt-environment";


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
