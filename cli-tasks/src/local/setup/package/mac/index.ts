

import { logger } from "@newsteam/legacy-cli-logger";

import {
    brewFormulae,
    localBrewSetupTask,
    localBrewPackageSetupTask
} from "./brew";
import { localJavaSetupTask } from "./java";
import { localPipSetupTask } from "./pip";
import { localVirtualboxSetupTask } from "./virtualbox";

import type { Package } from "..";


export const localPackageSetupTaskMac = async function(packages: Package[]): Promise<void>{

    // If any of the packages are brew packages install brew
    if(packages.filter((item) => brewFormulae.includes(item as typeof brewFormulae[number])).length > 0){

        await localBrewSetupTask();

    }

    /*

        eslint-disable no-await-in-loop

        --

        We want to execute these promises sequentially, so this is ok

    */
    for(const pack of packages){

        logger.log(`Installing brew package ${ pack }`, { label: "setup" });

        if(brewFormulae.includes(pack as typeof brewFormulae[number])){

            await localBrewPackageSetupTask(pack as typeof brewFormulae[number]);

        }else{
            switch(pack){

                case "virtualbox" :{

                    await localVirtualboxSetupTask();


                    break;
                }

                case "java" :{

                    await localJavaSetupTask();


                    break;
                }

                case "pip" :{

                    await localPipSetupTask();


                    break;
                }

                default :{

                    throw new Error(`Package '${ pack }' setup not implemented on platform '${ process.platform }'`);

                }

            }
        }

    }
    /* eslint-enable no-await-in-loop */

};
