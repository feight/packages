

import { localPackageSetupTaskMac } from "./mac";


export const packages = [
    "graphicsmagick",
    "imagemagick",
    "memcached",
    "mysql",
    "mysql-client",
    "openssl",
    "pip",
    "java"
] as const;

export type Package = typeof packages[number];


export const localPackageSetupTask = async function(...components: Package[]): Promise<void>{

    if(process.platform === "darwin"){

        await localPackageSetupTaskMac(components);

    }else{

        throw new Error(`Package setup not implemented on platform '${ process.platform }'`);

    }

};
