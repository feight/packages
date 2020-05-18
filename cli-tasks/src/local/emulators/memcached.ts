

import {
    kill,
    spawn
} from "@newsteam/cli-utils";


export const localMemcachedEmulatorTask = async function(): Promise<void>{

    try{

        await kill("memcached");

        await spawn({
            command: "memcached",
            label: "memcached"
        });

    }catch{}

};
