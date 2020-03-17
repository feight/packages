

import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";


export interface BuildSettingsTaskOptions extends WatchOptions{
    destination: string;
    source: string;
    label?: string;
}


export const buildSettingsTask = async function(options: BuildSettingsTaskOptions): Promise<void>{

    await watch(options, async (): Promise<void> => {

        const clientSettingsRequirePath = `./${ path.relative(__dirname, path.resolve(path.join(process.cwd(), "src/settings/client.js"))) }`;
        const destination = path.join(process.cwd(), options.destination);
        const settingsJSON = path.join(destination, "settings.json");
        const settingsJS = path.join(destination, "settings.js");
        const label = options.label ?? "settings";

        /*
         *  Because this gets called on a watch, it's necessary to flush the
         *  require cache on the client settings module.
         */
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete require.cache[require.resolve(clientSettingsRequirePath)];

        // Need a dynamic require since where this package is installed might change
        // eslint-disable-next-line max-len
        // eslint-disable-next-line global-require, security/detect-non-literal-require, import/no-dynamic-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
        const getClientSettings = require(clientSettingsRequirePath);
        // We're assuming the client settings consists of a default export function
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const settings = getClientSettings();

        await fs.ensureDir(destination);
        await fs.writeFile(settingsJSON, JSON.stringify(settings, null, 2), "utf8");

        logger.log(`generated ${ path.resolve(settingsJSON) }`, { label });

        const exists = fs.existsSync(path.join(options.source, "publication/custom/settings/index.js"));
        const js = exists ? "const settings = require(\"custom/settings\"); module.exports = settings" : "module.exports = {};";

        await fs.writeFile(settingsJS, js, "utf8");

        logger.log(`generated ${ settingsJS }`, { label });

    });

};
