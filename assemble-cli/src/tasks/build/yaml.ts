

import path from "path";

import yaml from "js-yaml";
import fs from "fs-extra";
import snake from "to-snake-case";
import { logger } from "@newsteam/cli-logger";
import {
    watch,
    WatchOptions
} from "@newsteam/cli-utils";
import {
    AppYaml,
    AssembleEnvironment,
    AssembleEnvironments
} from "@newsteam/assemble-settings";


const readYaml = function(file: string): AppYaml{

    const exists = fs.existsSync(file);

    if(!exists){

        throw new Error(`Could not read app.yaml: ${ file }`);

    }

    return yaml.safeLoad(fs.readFileSync(file).toString()) as AppYaml;

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
        // This is safe in this context
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

    const label = options.label ?? "build";

    const bar = logger.progress({
        label,
        tag: "app.yaml",
        total: 2
    });

    await watch(options, async (): Promise<void> => {

        if(!options.watch){

            bar.tick();

        }

        const appYamlPath = path.join(process.cwd(), options.paths.yaml);
        const environmentsRaw = await fs.readFile(options.paths.environments, "utf8");
        const handlersExist = fs.existsSync(options.paths.handlers);
        const handlersRaw = handlersExist ? fs.readFileSync(options.paths.handlers).toString() : "[]";
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const environments: AssembleEnvironments = JSON.parse(environmentsRaw);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const handlers: AppYaml["handlers"] = JSON.parse(handlersRaw);
        const environment: AssembleEnvironment = environments[options?.environment ?? "default"];
        const appYaml = readYaml(appYamlPath);
        const environmentInstance = environment.instance;
        const instanceClass = environmentInstance?.class ? environmentInstance.class : appYaml.instance_class;
        const automaticScaling = environmentInstance?.scaling ? environmentInstance.scaling : appYaml.automatic_scaling;

        // Prepend custom handlers
        appYaml.handlers = handlers.concat(appYaml.handlers);

        /*
         *  Enforce secure at a handler level across all routes and snakeify
         *  each handlers properties
         */
        appYaml.handlers = appYaml.handlers.map((handler) => snakeify({
            ...handler,
            secure: handler.secure === "never" ? "never" : "always"
        })) as AppYaml["handlers"];

        // Overriding GAE configuration, we can't change these
        appYaml.instance_class = instanceClass;

        if(automaticScaling){
            appYaml.automatic_scaling = snakeify(automaticScaling) as AppYaml["automatic_scaling"];
        }

        const outputPath = path.join(process.cwd(), options.destination, "app.yaml");

        if(options.watch){

            logger.log(`built app.yaml ${ outputPath }`, { label });

        }else{

            bar.tick();

        }

        writeYaml(outputPath, appYaml);

    });

};
