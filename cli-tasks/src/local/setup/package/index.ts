

import { localPackageSetupTaskMac } from "./mac";


export const packages = [
    "docker",
    "docker-machine",
    "graphicsmagick",
    "imagemagick",
    "java",
    "memcached",
    "mysql",
    "mysql-client",
    "openssl",
    "pip",
    "redis",
    "virtualbox"
] as const;

export type Package = typeof packages[number];


export const localPackageSetupTask = async function(...components: Package[]): Promise<void>{

    if(process.platform === "darwin"){

        await localPackageSetupTaskMac(components);

    }else{

        throw new Error(`Package setup not implemented on platform '${ process.platform }'`);

    }

};
