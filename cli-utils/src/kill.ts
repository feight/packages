

import { exec } from "./subprocess";


export const kill = async function(id: string | number): Promise<void>{

    await exec({
        command: [
            "ps -ax",
            "|",
            `grep '[${ String(id)[0] }]${ String(id).slice(1, String(id).length) }'`,
            "|",
            "awk '{print $1}'",
            "|",
            "xargs kill -9"
        ].join(""),
        detatch: true,
        label: "kill"
    });

};
