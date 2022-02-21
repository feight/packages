

import { googleCloudDeployTask } from "@newsteam/cli-tasks";

import { promptEnvironment } from "../utils/prompt-environment";

import { buildTask } from "./build";
import { cleanTask } from "./clean";
import { linkTask } from "./link";

import type { NewsTeamConfig } from "@newsteam/legacy-cli-config";


export interface DeployTaskOptions{
    environment?: string;
    publication?: string;
    versionId?: string;
}


export const deployTask = async function(config: NewsTeamConfig, options: DeployTaskOptions): Promise<void>{

    const publication = await linkTask(options.publication ?? true);
    const environment = await promptEnvironment(publication, options.environment);

    await cleanTask(config, { cache: true });

    await buildTask(config, {
        clean: false,
        environment: environment.id,
        link: false,
        mode: "production",
        publication: publication.id
    });

    await googleCloudDeployTask({
        project: environment.id,
        version: options.versionId,
        yaml: "src/app.yaml"
    });

};
