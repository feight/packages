

import path from "path";

import { logger } from "@newsteam/legacy-cli-logger";
import fs from "fs-extra";
import glob from "glob-promise";
import isEqual from "is-equal";
import type { TestErrorData } from "@newsteam/legacy-cli-errors";
import { TestError } from "@newsteam/legacy-cli-errors";

import { label } from "..";


interface PublicationData{
    file: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Can be any json
    json: any;
}

interface Commonality{
    publication: string[];
    shared: [string, string][];
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Can be any object
const getKeys = function(object: any, current?: string): string[]{

    let keys: string[] = [];

    for(const key of Object.keys(object)){

        keys.push(current ? `${ current }.${ key }` : key);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- This is safe
        if(typeof object[key] === "object" && !Array.isArray(object[key])){

            keys = [
                ...keys,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- This is safe
                ...getKeys(object[key], current ? `${ current }.${ key }` : key)
            ];

        }

    }

    return keys;

};


// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Can be any object
const getDescendantProperty = function(object: any, desc: string): any{

    const array = desc.split(".");

    // eslint-disable-next-line no-param-reassign, no-empty, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment -- I'll be honest, I got this from stack overflow, lets just roll with it
    while(array.length > 0 && (object = object[array.shift() || -1])){}

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Can be any object
    return object;

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Shared can be any object
const commonality = function(shared: Record<string, any>, publicationData: PublicationData[]): Commonality{

    const response: Commonality = {
        publication: [],
        shared: []
    };

    const [base] = publicationData;
    const tests = publicationData.slice(1);

    const pubKeys = getKeys(base.json);

    for(const key of pubKeys){

        let equal = true;

        for(const test of tests){

            if(!isEqual(getDescendantProperty(base.json, key), getDescendantProperty(test.json, key))){

                equal = false;

                break;

            }

        }

        if(equal){
            response.publication.push(key);
        }

    }

    const sharedKeys = getKeys(shared);

    for(const key of sharedKeys){

        for(const test of publicationData){

            let preEqual = false;

            for(const sharedKey of response.shared){

                if(key.startsWith(sharedKey[0]) && test.file === sharedKey[1]){

                    preEqual = true;

                    break;

                }

            }

            if(isEqual(getDescendantProperty(shared, key), getDescendantProperty(test.json, key)) && !preEqual){
                response.shared.push([key, test.file]);
            }

        }

    }

    return response;

};


export class SharedSettingsError extends TestError{

    constructor(data: TestErrorData[]){

        super(data);

        this.name = "SharedSettingsError";

        this.description = "Shared Settings Error";

    }

}

export const testSharedSettingsTask = async function(): Promise<void>{

    const sharedSettingsFilePath = "src/publication/shared/settings/index.json";
    const sharedExists = fs.existsSync(sharedSettingsFilePath);
    const sharedRaw = sharedExists ? await fs.readFile(sharedSettingsFilePath, "utf8") : "{}";
    const errors: TestErrorData[] = [];

    logger.log(`shared ${ path.resolve(sharedSettingsFilePath) }`, { label });

    let sharedData = undefined;

    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Lets just pretend this is safe
        sharedData = JSON.parse(sharedRaw);
    }catch{
        throw new Error("Settings file could not be parsed as valid json");
    }

    const files = await glob("publications/**/settings/index.json");
    const data = await Promise.all(files.map(async (file) => {

        const raw = await fs.readFile(file, "utf8");

        let json = undefined;

        try{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Lets just pretend this is safe
            json = JSON.parse(raw);
        }catch{
            throw new Error("Settings file could not be parsed as valid json");
        }

        return {
            file,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Lets just pretend this is safe
            json
        };

    }));

    const common = commonality(sharedData, data);

    if(common.publication.length > 0){

        errors.push({
            errors: [
                {
                    file: sharedSettingsFilePath,
                    message: [
                        "All publications contain identical configuration that should be moved into shared configuration",
                        "\n\n",
                        common.publication.map((property, index) => `   ${ property }${ index < common.publication.length - 1 ? "\n" : "" }`)
                    ].join("")
                }
            ],
            file: sharedSettingsFilePath
        });

    }

    if(common.shared.length > 0){

        errors.push({
            errors: [
                {
                    file: sharedSettingsFilePath,
                    message: [
                        "Some publications contain configuration that is already declared in the shared configuration",
                        "\n\n",
                        common.shared.map((property, index) => `   ${ property[0] } > ${ property[1] }${ index < common.shared.length - 1 ? "\n" : "" }`)
                    ].join("")
                }
            ],
            file: sharedSettingsFilePath
        });

    }

    if(errors.length > 0){

        throw new SharedSettingsError(errors);

    }

};
