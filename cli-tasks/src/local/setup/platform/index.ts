

import { localXcodeSelectSetupTask } from "./mac";


export const localPlatformSetupTask = async function(): Promise<void>{

    if(process.platform === "darwin"){

        await localXcodeSelectSetupTask();

    }

};
