

import {
    brewFormulae,
    localBrewSetupTask,
    localBrewPackageSetupTask
} from "./brew";
import {
    localJavaSetupTask
} from "./java";
import {
    localPipSetupTask
} from "./pip";

import { Package } from "..";


export const localPackageSetupTaskMac = async function(packages: Package[]): Promise<void>{

    // If any of the packages are brew packages install brew
    if(packages.filter((item) => brewFormulae.includes(item as typeof brewFormulae[number])).length > 0){

        await localBrewSetupTask();

    }

    for(const pack of packages){

        if(brewFormulae.includes(pack as typeof brewFormulae[number])){

            // eslint-disable-next-line no-await-in-loop
            await localBrewPackageSetupTask(pack as typeof brewFormulae[number]);

        }else if(pack === "java"){

            // eslint-disable-next-line no-await-in-loop
            await localJavaSetupTask();

        }else if(pack === "pip"){

            // eslint-disable-next-line no-await-in-loop
            await localPipSetupTask();

        }else{

            throw new Error(`Package '${ pack }' setup not implemented on platform '${ process.platform }'`);

        }

    }

};
