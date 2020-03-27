

import path from "path";

import { logger } from "@newsteam/cli-logger";
import fs from "fs-extra";
import glob from "glob-promise";
import isEqual from "is-equal";
import {
    TestError,
    TestErrorData
} from "@newsteam/cli-errors";

import { label } from "..";


interface PublicationData{
    file: string;
    // Can be any json
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json: any;
}

interface Commonality{
    publication: string[];
    shared: [string, string][];
}


// Can be any object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKeys = function(object: any, current?: string): string[]{

    let keys: string[] = [];

    Object.keys(object).forEach((key) => {

        keys.push(current ? `${ current }.${ key }` : key);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if(typeof object[key] === "object" && !Array.isArray(object[key])){

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            keys = keys.concat(getKeys(object[key], current ? `${ current }.${ key }` : key));

        }

    });

    return keys;

};


// Can be any object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getDescendantProperty = function(object: any, desc: string): any{

    const array = desc.split(".");

    // I'll be honest, I got this from stack overflow, lets just roll with it
    // eslint-disable-next-line no-param-reassign, no-empty, @typescript-eslint/no-unsafe-member-access
    while(array.length && (object = object[array.shift() || -1])){}

    // Can be any object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return object;

};

// Shared can be any object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commonality = function(shared: { [id: string]: any }, publicationData: PublicationData[]): Commonality{

    const response: Commonality = {
        publication: [],
        shared: []
    };

    const [base] = publicationData;
    const tests = publicationData.slice(1);

    const pubKeys = getKeys(base.json);

    pubKeys.forEach((key) => {

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

    });

    const sharedKeys = getKeys(shared);

    sharedKeys.forEach((key) => {

        publicationData.forEach((test: PublicationData) => {

            let preEqual = false;

            for(const sharedKey of response.shared){

                if(key.startsWith(sharedKey[0]) && test.file === sharedKey[1]){

                    preEqual = true;

                    break;

                }

            }

            if(isEqual(getDescendantProperty(shared, key), getDescendantProperty(test.json, key))){

                if(!preEqual){
                    response.shared.push([key, test.file]);
                }

            }

        });

    });

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

    let sharedData = null;

    try{
        sharedData = JSON.parse(sharedRaw);
    }catch(error){
        throw new Error("Settings file could not be parsed as valid json");
    }

    const files = await glob("publications/**/settings/index.json");
    const data = await Promise.all(files.map(async (file) => {

        const raw = await fs.readFile(file, "utf8");

        let json = null;

        try{
            json = JSON.parse(raw);
        }catch(error){
            throw new Error("Settings file could not be parsed as valid json");
        }

        return {
            file,
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