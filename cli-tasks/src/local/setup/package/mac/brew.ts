

import { logger } from "@newsteam/legacy-cli-logger";
import {
    exec,
    spawn
} from "@newsteam/cli-utils";


const label = "setup";

const localRubySetupTask = async function(): Promise<void>{

    try{

        // Check if ruby is installed
        await spawn({
            command: "ruby --version",
            detatch: true
        });

        logger.log("✔ ruby", {
            color: "#00ff00",
            label
        });

    }catch{

        logger.error([
            "",
            "Ruby is not installed on this machine.",
            "",
            "Please install it manually before you proceed.",
            ""
        ].join("\n"), { label });

        // eslint-disable-next-line node/no-process-exit -- This is only used for setup automation, it's chilled
        process.exit();

    }

};


export const brewFormulae = [
    "docker",
    "docker-machine",
    "graphicsmagick",
    "imagemagick",
    "memcached",
    "mysql",
    "mysql-client",
    "openssl",
    "redis"
] as const;

export type BrewFormula = typeof brewFormulae[number];


export const localBrewSetupTask = async function(): Promise<void>{

    await localRubySetupTask();

    try{

        // Check if Homebrew is installed
        await spawn({
            command: "brew --version",
            detatch: true
        });

        logger.log("✔ brew", {
            color: "#00ff00",
            label
        });

    }catch{

        await spawn({
            command: "/usr/bin/ruby -e \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)\"",
            label: "setup"
        });

    }

};


export type BrewInfoJson = {
    installed?: {
        version: string;
    }[];
    // eslint-disable-next-line @typescript-eslint/naming-convention -- This is brew info --json format, we don't pick it
    linked_keg: string;
    versions: {
        stable: string;
    };
}[];

export const localBrewPackageSetupTask = async function(formula: BrewFormula): Promise<void>{

    const list = await exec({
        command: "brew list --formula",
        detatch: true
    });

    const exists = list
    .replace(/\n/gu, " ")
    .split(" ")
    .filter(Boolean)
    .includes(formula);

    const rawJSON = await exec({
        command: `brew info ${ formula } --json`,
        detatch: true
    });

    const [latest] = JSON.parse(rawJSON) as BrewInfoJson;
    const latestStable = latest.versions.stable;
    const installed = latest.installed ? latest.installed[0] : undefined;
    const updated =
        latest.linked_keg === latestStable ||
        installed && installed.version === latestStable;

    if(exists && updated){

        logger.log(`✔ brew ${ formula }`, {
            color: "#00ff00",
            label
        });

    }else if(exists){

        await spawn({
            command: `brew upgrade ${ formula }`,
            label
        });

    }else{

        await spawn({
            command: `brew install ${ formula }`,
            label
        });

    }

};
