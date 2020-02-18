
import fetch from "node-fetch";
import { logger } from "@newsteam/cli-logger";
import { spawn } from "@newsteam/cli-utils";


const label = "setup";


export const localPipSetupTask = async function(): Promise<void>{

    let version = "";

    try{

        const versionsRequest = await fetch("https://pypi.org/pypi/pip/json");
        const versionsText = await versionsRequest.text();
        const versions = JSON.parse(versionsText);

        version = versions.info.version;

    }catch(error){

        logger.error("Could not determine the latest version of pip", { label });

    }

    const [
        latestMajor = 0,
        latestMinor = 0,
        latestPatch = 0
    ] = version.split(".").map((chunk: string) => Number(chunk));

    const installedRaw = await spawn({
        command: "pip -V",
        detatch: true
    });

    const installedText = (/pip\s(.*?)\sfrom\s.*/gu).exec(installedRaw) ?? ["", "0.0.0"];
    const [
        installedMajor = 0,
        installedMinor = 0,
        installedPatch = 0
    ] = installedText[1].split(".").map((chunk: string) => Number(chunk));

    if(
        installedMajor < latestMajor ||
        installedMajor === latestMajor &&
        installedMinor < latestMinor ||
        installedMajor === latestMajor &&
        installedMinor === latestMinor &&
        installedPatch < latestPatch
    ){

        await spawn({
            command: "pip install --upgrade pip",
            label
        });

    }else{

        logger.log("✔ pip", {
            color: "#00ff00",
            label
        });

    }

};
