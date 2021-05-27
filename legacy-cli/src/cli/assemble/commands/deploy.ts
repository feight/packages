

import { config } from "@newsteam/legacy-cli-config";
import type commander from "commander";

import { assembleCliOptions } from "../options";
import { action } from "../../../utils/action";
import { deployTask } from "../../../tasks/deploy";
import type { DeployTaskOptions } from "../../../tasks/deploy";


export const assembleDeployCommand = function(command: commander.Command): commander.Command{

    return command
    .option(assembleCliOptions.publication.flags, assembleCliOptions.publication.description)
    .option(assembleCliOptions.environment.flags, assembleCliOptions.environment.description)
    .option(assembleCliOptions.versionId.flags, assembleCliOptions.versionId.description, assembleCliOptions.versionId.default)
    .action(async (options: DeployTaskOptions): Promise<void> => action(() => deployTask(config, {
        environment: options.environment,
        publication: options.publication,
        versionId: options.versionId
    })));

};
