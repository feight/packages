

import path from "path";

import fs from "fs-extra";
import {
    exec,
    kill
} from "@newsteam/cli-utils";


interface LocalDatastoreEmulatorTaskConfig{
    directory?: string;
    host: string;
    persist: boolean;
    port: number;
}


export const localDatastoreEmulatorTask = async function(config: LocalDatastoreEmulatorTaskConfig): Promise<void>{

    const directory = config.directory ? path.resolve(config.directory) : undefined;

    try{

        await kill(config.port);

    }catch(error){}

    if(directory){

        await fs.ensureDir(directory);

    }

    await exec({
        command: `
            gcloud beta emulators datastore start
                --host-port=${ config.host }:${ config.port }
                ${ directory ? `--data-dir=${ directory }` : "" }
                ${ config.persist ? "--store-on-disk" : "--no-store-on-disk" }
        `,
        filter: /\[datastore\]\s/gu,
        label: "datastore"
    });

};
