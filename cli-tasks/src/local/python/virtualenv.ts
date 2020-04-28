

import path from "path";

import fs from "fs-extra";
import hasha from "hasha";
import {
    exec,
    spawn
} from "@newsteam/cli-utils";


const label = "python";


interface Cache{
    installedRequirementsFileHash?: string;
}


const getCache = async function(): Promise<Cache>{

    const directory = path.join(process.cwd(), ".local/cache/@newsteam/cli-tasks");
    const filename = path.join(directory, "virtualenv.json");
    const exists = await fs.pathExists(filename);

    let cache: Cache = {};

    if(exists){

        const raw = await fs.readFile(filename, "utf-8");

        try{

            cache = JSON.parse(raw) as Cache;

        }catch(error){}

    }

    return cache;

};

const setCache = async function(cache: Cache): Promise<void>{

    const directory = path.join(process.cwd(), ".local/cache/@newsteam/cli-tasks");
    const filename = path.join(directory, "virtualenv.json");

    await fs.ensureDir(directory);
    await fs.writeFile(filename, JSON.stringify(cache));

};


interface LocalPythonVirtualenvTaskConfig{
    file?: string;
}


export const localPythonVirtualenvTask = async function(config: LocalPythonVirtualenvTaskConfig = {}): Promise<void>{

    const environmentFolderExists = fs.existsSync(path.join(process.cwd(), "env"));
    const file = config.file ?? "src/requirements.txt";

    if(!environmentFolderExists){

        await spawn({
            command: "python3 -m venv env",
            label
        });

    }

    const cache = await getCache();

    const requirementsFileHash = await hasha.fromFile(path.join(process.cwd(), file), { algorithm: "md5" });

    if(
        !environmentFolderExists ||
        cache.installedRequirementsFileHash !== requirementsFileHash
    ){

        await exec({
            command: `source env/bin/activate; pip3 install --upgrade pip; pip3 install -r ${ file }`,
            label
        });

        if(requirementsFileHash){

            await setCache({
                installedRequirementsFileHash: requirementsFileHash
            });

        }

    }

};
