

import { exec } from "../../utils/subprocess";


const label = "server";

export const localServerTask = async function(): Promise<void>{

    await exec({
        command: "source env/bin/activate; python3 src/main.py",
        label
    });

};
