

import type { Configuration } from "webpack";


export const target = function(): Configuration{

    return {
        target: "web"
    };

};
