

import {
    exec,
    spawn
} from "@newsteam/cli-utils";


interface LocalDockerMachineTaskConfig{
    name?: string;
}


export const localDockerMachineTask = async function(config?: LocalDockerMachineTaskConfig): Promise<Record<string, string | undefined>>{

    const name = config?.name ?? "newsteam";

    // Check if the virtual machine already exists
    const dockerMachinesResult = await exec({
        command: "docker-machine ls --format 'table {{.Name}}'",
        detatch: true
    });

    const machines = dockerMachinesResult.split("\n")
    .filter((line) => Boolean(line.trim()))
    .filter((line) => line !== "NAME");

    if(!machines.includes(name)){

        // Create the virtual machine
        await spawn({
            command: `docker-machine create --driver virtualbox ${ name }`,
            label: "docker"
        });

    }

    // Extract the environment variables needed to run the virtual machine
    const dockerEnvexecResult = await exec({
        command: `docker-machine env ${ name }`,
        detatch: true,
        label: "docker"
    });

    return dockerEnvexecResult.split("\n")
    .filter(Boolean)
    .filter((line) => line.startsWith("export "))
    .map((line) => line.replace(/^export /gu, ""))
    .map((line) => line.split("="))
    // eslint-disable-next-line unicorn/no-array-reduce, unicorn/prefer-object-from-entries -- correct choice in this case
    .reduce<Record<string, string | undefined>>((accumulator, current) => {

        const [key, value] = current;

        accumulator[key] = value.replace(/^"|"$/gu, "");

        return accumulator;

    }, {});

};
