

import { kill } from "../../utils/kill";
import { spawn } from "../../utils/subprocess";


export const localMemcachedTask = async function(): Promise<void>{

    try{

        await kill("memcached");

        await spawn({
            command: "memcached",
            label: "memcached"
        });

    }catch(error){}

};
