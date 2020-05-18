

import path from "path";

import {
    exec,
    spawn
} from "@newsteam/cli-utils";
import { logger } from "@newsteam/cli-logger";


const label = "docker";


const normalizePorts = function(ports?: number | number[] | [number, number][]): [number, number][]{

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
    environment?: { [key: string]: string | undefined };
    network?: string;
    port?: number | number[] | [number, number][];
    name: string;
    recipe: string;
}


export const localDockerRunTask = async function(config: LocalDockerRunTaskConfig): Promise<void>{

    const bar = logger.progress({
        label,
        tag: config.name,
        total: 4
    });

    const network = config.network ?? "newsteam-network";

    const containers = (await exec({
        command: "docker ps -a --format 'table {{.Names}}'",
        detatch: true
    }))
    .split("\n")
    .filter((line) => Boolean(line.trim()))
    .filter((line) => line !== "NAMES");

    bar.tick();

    if(containers.includes(config.name)){

        try{

            await exec({
                command: `docker container kill ${ config.name }`,
                detatch: true
            });

        }catch{}

        await exec({
            command: `docker container rm ${ config.name }`,
            detatch: true
        });

    }

    bar.tick();

    const networks = (await exec({
        command: "docker network ls --format 'table {{.Name}}'",
        detatch: true
    }))
    .split("\n")
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
            -v ${ path.join(process.cwd(), `.local/docker/${ config.name }/data`) }
            ${ ports.length > 0 ? ports.map((port) => `-p ${ port[0] }:${ port[1] }`).join(" ") : "" }
            -d
            ${ Object.keys(environment).map((key) => `-e ${ key }=${ environment[key] ?? "" }`).join(" ") }
            ${ config.recipe }`,
        detatch: true,
        label: "docker"
    });

    bar.tick();

};
