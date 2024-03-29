

import path from "path";

import {
    exec,
    spawn
} from "@newsteam/cli-utils";
import { logger } from "@newsteam/legacy-cli-logger";


const label = "docker";


const normalizePorts = function(ports?: [number, number][] | number[] | number): [number, number][]{

    if(!ports){

        return [];

    }else if(typeof ports === "number"){

        return [[ports, ports]];

    }else if(typeof ports[0] === "number"){

        return (ports as number[]).map((port) => [port, port]);

    }

    return ports as [number, number][];

};


interface LocalDockerRunTaskConfig{
    environment?: Record<string, string | undefined>;
    network?: string;
    port?: [number, number][] | number[] | number;
    name: string;
    recipe: string;
    volume: string;
}


export const localDockerRunTask = async function(config: LocalDockerRunTaskConfig): Promise<void>{

    const bar = logger.progress({
        label,
        tag: config.name,
        total: 2
    });

    const network = config.network ?? "newsteam-network";

    const dockerNetworksResult = await exec({
        command: "docker network ls --format 'table {{.Name}}'",
        detatch: true
    });


    const networks = dockerNetworksResult.split("\n")
    .filter((line) => Boolean(line.trim()))
    .filter((line) => line !== "NAME");

    if(!networks.includes(network)){

        await spawn({
            command: `docker network create ${ network }`,
            detatch: true,
            label
        });

    }

    bar.tick();

    const ports = normalizePorts(config.port);
    const environment = config.environment ?? {};

    await spawn({
        command: `
            docker run
            --restart always
            --name ${ config.name }
            --net ${ network }
            -v ${ path.join(process.cwd(), `.newsteam/docker/${ config.name }:${ config.volume }`) }
            ${ ports.length > 0 ? ports.map((port) => `-p ${ port[0] }:${ port[1] }`).join(" ") : "" }
            -d
            ${ Object.keys(environment).map((key) => `-e ${ key }=${ environment[key] ?? "" }`).join(" ") }
            ${ config.recipe }`,
        detatch: false,
        label: "docker"
    });

    bar.tick();

};
