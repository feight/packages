

import path from "path";

import fs from "fs-extra";
import { logger } from "@newsteam/cli-logger";
import hasha from "hasha";

import {
    exec,
    spawn
} from "../../utils/subprocess";


const label = "python";
const requirementsFile = "src/requirements.txt";


interface Cache{
    installedRequirementsFileHash?: string;
}


const getCache = async function(): Promise<Cache>{

    const directory = path.join(process.cwd(), "node_modules/.cache");
    const filename = path.join(directory, "newsteam-cli.json");
    const exists = await fs.pathExists(filename);

    let cache: Cache = {};

    if(exists){

        const raw = await fs.readFile(filename, "utf-8");

        try{

            cache = JSON.parse(raw);

        }catch(error){}

    }

    return cache;

};

const setCache = async function(cache: Cache): Promise<void>{

    const directory = path.join(process.cwd(), "node_modules/.cache");
    const filename = path.join(directory, "newsteam-cli.json");

    await fs.ensureDir(directory);
    await fs.writeFile(filename, JSON.stringify(cache));

};


export const localVirtualenvTask = async function(): Promise<void>{

    const environmentFolderExists = fs.existsSync(path.join(process.cwd(), "env"));

    if(!environmentFolderExists){

        await spawn({
            command: "python3 -m venv env",
            label
        });

    }

    const cache = await getCache();

    const requirementsFileHash = await hasha.fromFile(path.join(process.cwd(), requirementsFile), { algorithm: "md5" });

    if(
        !environmentFolderExists ||
        cache.installedRequirementsFileHash !== requirementsFileHash
    ){

        await exec({
            command: `source env/bin/activate; pip3 install -r ${ requirementsFile }`,
            label
        });

        if(requirementsFileHash){

            await setCache({
                installedRequirementsFileHash: requirementsFileHash
            });

        }

    }

};
