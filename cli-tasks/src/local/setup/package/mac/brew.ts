

import { logger } from "@newsteam/cli-logger";
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

    }catch(error){

        logger.error([
            "",
            "Ruby is not installed on this machine.",
            "",
            "Please install it manually before you proceed.",
            ""
        ].join("\n"), { label });

        process.exit();

    }

};


export const brewFormulae = [
    "graphicsmagick",
    "imagemagick",
    "memcached",
    "mysql",
    "mysql-client",
    "openssl"
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

    }catch(error){

        await spawn({
            command: "/usr/bin/ruby -e \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)\"",
            label: "setup"
        });

    }

};

export const localBrewPackageSetupTask = async function(formula: BrewFormula): Promise<void>{

    const list = await exec({
        command: "brew list",
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

    const [latest] = JSON.parse(rawJSON);
    const latestStable = latest.versions.stable;
    const [installed] = latest.installed;
    const updated =
        latest.linked_keg === latestStable ||
        installed.version === latestStable;

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
