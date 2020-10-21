

import { validate } from "@newsteam/schema";


export interface LocalDockerContainerConfig{

    environment: Record<string, string | undefined>;

    name: string;

    port: number | number[] | [number, number][];

    recipe: string;

}

export class NewsTeamLocalDockerContainerConfig{

    @validate({
        type: "object"
    })
    environment: Record<string, string | undefined>;

    @validate({
        type: "string"
    })
    name: string;

    @validate({
        try: [
            {
                port: true,
                type: "number"
            },
            {
                items: {
                    port: true,
                    type: "number"
                },
                type: "array"
            },
            {
                items: {
                    items: {
                        port: true,
                        type: "number"
                    },
                    max: 2,
                    type: "array"
                },
                type: "array"
            }
        ],
        type: "alternatives"
    })
    port: number | number[] | [number, number][];

    @validate({
        type: "string"
    })
    recipe: string;

    constructor(config: LocalDockerContainerConfig){

        this.environment = config.environment;
        this.name = config.name;
        this.port = config.port;
        this.recipe = config.recipe;

    }

}
