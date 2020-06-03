

import Joi from "@hapi/joi";


export interface Reference extends Joi.ReferenceOptions{
    type: "reference";
    key: string;
}

export const referenceToJoi = function(type: Reference): Joi.Reference{

    const options: Joi.ReferenceOptions = {
        adjust: type.adjust,
        ancestor: type.ancestor,
        in: type.in,
        iterables: type.iterables,
        map: type.map,
        prefix: type.prefix,
        separator: type.separator
    };

    Object.keys(options).forEach((key) => {
        /*
            eslint-disable

            @typescript-eslint/no-explicit-any,
            @typescript-eslint/no-dynamic-delete

            --

            We're aware of the risks here, but this is the cleanest way to do it.

        */
        if(typeof (options as Record<string, any>)[key] === "undefined"){
            delete (options as Record<string, any>)[key];
        }
        /*
            eslint-enable

            @typescript-eslint/no-explicit-any,
            @typescript-eslint/no-dynamic-delete
        */
    });

    return Joi.ref(type.key, options);

};

