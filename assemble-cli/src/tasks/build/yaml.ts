

import path from "path";

import yaml from "js-yaml";
import fs from "fs-extra";
import snake from "to-snake-case";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";


// This function can read any yaml
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readYaml = function(file: string): any{

    const exists = fs.existsSync(file);

    return exists ? yaml.safeLoad(fs.readFileSync(file).toString()) : {};

};


// This function can write any yaml
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const writeYaml = function(file: string, data: any): void{

    fs.ensureDirSync(path.dirname(file));
    fs.writeFileSync(file, yaml.safeDump(data, {
        lineWidth: 2000
    }), "utf8");

};


// This function can snakeify any object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const snakeify = (object: { [id: string]: any }): { [id: string]: any } => {

    const copy = { ...object };

    // Snake case all properties in automatic scaling
    Object.keys(copy).forEach((key: string) => {
        copy[snake(key)] = copy[key];
    });

    Object.keys(copy).forEach((key: string) => {
        if(key.toLowerCase() !== key){
            // This is necessary to snakeify an object
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete copy[key];
        }
    });

    return copy;

};


export interface BuildYamlTaskOptions extends WatchOptions{
    destination: string;
    environment?: string;
    label?: string;
    paths: {
        handlers: string;
        environments: string;
        yaml: string;
    };
}


export const buildYamlTask = async function(options: BuildYamlTaskOptions): Promise<void>{

    await watch(options, async (): Promise<void> => {

        const environmentsRaw = await fs.readFile(options.paths.environments, "utf8");
        const handlersExist = fs.existsSync(options.paths.handlers);
        const handlersRaw = handlersExist ? fs.readFileSync(options.paths.handlers).toString() : "[]";
        const environments = JSON.parse(environmentsRaw);
        const handlers = JSON.parse(handlersRaw);
        const environment = environments[options?.environment ?? "default"] || environments.default;
        const base = readYaml(path.join(process.cwd(), options.paths.yaml));
        const environmentInstance = environment.instance;
        const instanceClass = environmentInstance?.class ? environmentInstance.class : base.instance_class;
        const automaticScaling = environmentInstance?.scaling ? environmentInstance.scaling : base.automatic_scaling;

        // Prepend custom handlers
        base.handlers = handlers.concat(base.handlers);

        /*
         *  Enforce secure at a handler level across all routes and snakeify
         *  each handlers properties
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        base.handlers = base.handlers.map((handler: any) => snakeify({
            ...handler,
            secure: handler.secure === "never" ? "never" : "always"
        }));

        // Overriding GAE configuration, we can't change these
        base.instance_class = instanceClass;
        base.automatic_scaling = snakeify(automaticScaling);

        const outputPath = path.join(process.cwd(), options.destination, "app.yaml");

        logger.log(`generated ${ outputPath }`, { label: options.label ?? "build" });

        writeYaml(outputPath, base);

    });

};
