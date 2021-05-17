

import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/legacy-cli-logger";
import { watch } from "@newsteam/cli-utils";

import type { WatchOptions } from "@newsteam/cli-utils";


export interface BuildSettingsTaskOptions extends WatchOptions{
    destination: string;
    source: string;
    label?: string;
}


export const buildSettingsTask = async function(options: BuildSettingsTaskOptions): Promise<void>{

    const label = options.label ?? "build";

    const bar = logger.progress({
        label,
        tag: "settings",
        total: 3
    });

    await watch(options, async (): Promise<void> => {

        if(!options.watch){

            bar.tick();

        }

        const clientSettingsRequirePath = `./${ path.relative(__dirname, path.resolve(path.join(process.cwd(), "src/settings/client.js"))) }`;
        const destination = path.join(process.cwd(), options.destination);
        const settingsJSON = path.join(destination, "settings.json");
        const settingsJS = path.join(destination, "settings.js");

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- Because this gets called on a watch, it's necessary to flush the require cache on the client settings module.
        delete require.cache[require.resolve(clientSettingsRequirePath)];

        // eslint-disable-next-line node/global-require, security/detect-non-literal-require, import/no-dynamic-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment -- Need a dynamic require because where this package is installed might change
        const getClientSettings = require(clientSettingsRequirePath);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment -- We're assuming the client settings consists of a default export function
        const settings = getClientSettings();

        await Promise.all([
            (async (): Promise<void> => {

                await fs.ensureDir(destination);
                await fs.writeFile(settingsJSON, JSON.stringify(settings, undefined, 2), "utf8");

                if(options.watch){

                    logger.log(`built settings ${ path.resolve(settingsJSON) }`, { label });

                }else{

                    bar.tick();

                }

            })(),
            (async (): Promise<void> => {

                const exists = fs.existsSync(path.join(options.source, "publication/custom/settings/index.js"));
                const js = exists ? "const settings = require(\"custom/settings\"); module.exports = settings" : "module.exports = {};";

                await fs.writeFile(settingsJS, js, "utf8");

                if(options.watch){

                    logger.log(`built settings ${ settingsJS }`, { label });

                }else{

                    bar.tick();

                }

            })()
        ]);

    });

};
