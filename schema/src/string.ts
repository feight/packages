

import Joi from "@hapi/joi";

import type {
    AnySchemaDefinition,
    PresenceMode
} from "./any";
import {
    extendAnySchema
} from "./any";
import type {
    Reference
} from "./reference";
import {
    referenceToJoi
} from "./reference";


const convert = {
    alphanum(schema: Joi.StringSchema, value?: StringSchemaDefinition["alphanum"]): Joi.StringSchema{
        return value ? schema.alphanum() : schema;
    },
    base64(schema: Joi.StringSchema, value?: StringSchemaDefinition["base64"]): Joi.StringSchema{
        return value ? schema.base64(value === true ? undefined : value) : schema;
    },
    case(schema: Joi.StringSchema, value?: StringSchemaDefinition["case"]): Joi.StringSchema{
        return value ? schema.case(value) : schema;
    },
    creditCard(schema: Joi.StringSchema, value?: StringSchemaDefinition["creditCard"]): Joi.StringSchema{
        return value ? schema.creditCard() : schema;
    },
    dataUri(schema: Joi.StringSchema, value?: StringSchemaDefinition["dataUri"]): Joi.StringSchema{
        return value ? schema.dataUri(value === true ? undefined : value) : schema;
    },
    domain(schema: Joi.StringSchema, value?: StringSchemaDefinition["domain"]): Joi.StringSchema{
        return value ? schema.domain(value === true ? undefined : value) : schema;
    },
    email(schema: Joi.StringSchema, value?: StringSchemaDefinition["email"]): Joi.StringSchema{
        return value ? schema.email(value === true ? undefined : value) : schema;
    },
    guid(schema: Joi.StringSchema, value?: StringSchemaDefinition["guid"]): Joi.StringSchema{
        return value ? schema.guid(value === true ? undefined : {
            version: value
        }) : schema;
    },
    hex(schema: Joi.StringSchema, value?: StringSchemaDefinition["hex"]): Joi.StringSchema{
        return value ? schema.hex(value === true ? undefined : value) : schema;
    },
    hostname(schema: Joi.StringSchema, value?: StringSchemaDefinition["hostname"]): Joi.StringSchema{
        return value ? schema.hostname() : schema;
    },
    insensitive(schema: Joi.StringSchema, value?: StringSchemaDefinition["insensitive"]): Joi.StringSchema{
        return value ? schema.insensitive() : schema;
    },
    ip(schema: Joi.StringSchema, value?: StringSchemaDefinition["ip"]): Joi.StringSchema{
        return value ? schema.ip(value === true ? undefined : value) : schema;
    },
    isoDate(schema: Joi.StringSchema, value?: StringSchemaDefinition["isoDate"]): Joi.StringSchema{
        return value ? schema.isoDate() : schema;
    },
    isoDuration(schema: Joi.StringSchema, value?: StringSchemaDefinition["isoDuration"]): Joi.StringSchema{
        return value ? schema.isoDuration() : schema;
    },
    length(schema: Joi.StringSchema, value?: StringSchemaDefinition["length"]): Joi.StringSchema{

        if(typeof value !== "undefined"){

            const limit = typeof value === "number" ? value : value.limit;
            const encoding = typeof value === "number" ? undefined : value.encoding;

            return schema.length(typeof limit === "number" ? limit : referenceToJoi(limit), encoding);

        }

        return schema;

    },
    lowercase(schema: Joi.StringSchema, value?: StringSchemaDefinition["lowercase"]): Joi.StringSchema{
        return value ? schema.lowercase() : schema;
    },
    max(schema: Joi.StringSchema, value?: StringSchemaDefinition["max"]): Joi.StringSchema{

        if(typeof value !== "undefined"){

            const limit = typeof value === "number" ? value : value.limit;
            const encoding = typeof value === "number" ? undefined : value.encoding;

            return schema.max(typeof limit === "number" ? limit : referenceToJoi(limit), encoding);

        }

        return schema;

    },
    min(schema: Joi.StringSchema, value?: StringSchemaDefinition["min"]): Joi.StringSchema{

        if(typeof value !== "undefined"){

            const limit = typeof value === "number" ? value : value.limit;
            const encoding = typeof value === "number" ? undefined : value.encoding;

            return schema.min(typeof limit === "number" ? limit : referenceToJoi(limit), encoding);

        }

        return schema;

    },
    normalize(schema: Joi.StringSchema, value?: StringSchemaDefinition["normalize"]): Joi.StringSchema{
        return value ? schema.normalize(value === true ? undefined : value) : schema;
    },
    pattern(schema: Joi.StringSchema, value?: StringSchemaDefinition["pattern"]): Joi.StringSchema{

        if(typeof value !== "undefined"){

            const regex = value instanceof RegExp ? value : value.regex;
            const name = value instanceof RegExp ? undefined : value.name;
            const invert = value instanceof RegExp ? undefined : value.invert;
            const options = invert || name ? {
                invert,
                name
            } : undefined;

            return schema.pattern(regex, options);

        }

        return schema;

    },
    replace(schema: Joi.StringSchema, value?: StringSchemaDefinition["replace"]): Joi.StringSchema{
        return value ? schema.replace(value.regex, value.replacement) : schema;
    },
    token(schema: Joi.StringSchema, value?: StringSchemaDefinition["token"]): Joi.StringSchema{
        return value ? schema.token() : schema;
    },
    trim(schema: Joi.StringSchema, value?: StringSchemaDefinition["trim"]): Joi.StringSchema{
        return typeof value === "undefined" ? schema : schema.trim(value);
    },
    truncate(schema: Joi.StringSchema, value?: StringSchemaDefinition["truncate"]): Joi.StringSchema{
        return typeof value === "undefined" ? schema : schema.truncate(value);
    },
    uppercase(schema: Joi.StringSchema, value?: StringSchemaDefinition["uppercase"]): Joi.StringSchema{
        return value ? schema.uppercase() : schema;
    },
    uri(schema: Joi.StringSchema, value?: StringSchemaDefinition["uri"]): Joi.StringSchema{
        return value ? schema.uri(value === true ? undefined : value) : schema;
    }
};


export type StringSchema = "string" | StringSchemaDefinition;

export type TopLevelDomainOptions = false | {

    /**
     * - `true` to use the IANA list of registered TLDs. This is the default value.
     * - `false` to allow any TLD not listed in the `deny` list, if present.
     * - A `Set` or array of the allowed TLDs. Cannot be used together with `deny`.
     */
    allow?: Set<string> | string[] | boolean;

    /**
     * - A `Set` or array of the forbidden TLDs. Cannot be used together with a custom `allow` list.
     */
    deny?: Set<string> | string[];
};

export type GuidVersions = "uuidv1" | "uuidv2" | "uuidv3" | "uuidv4" | "uuidv5";

export type IPVersions = "ipv4" | "ipv6" | "ipvfuture";

export interface StringSchemaDefinition extends AnySchemaDefinition{

    /**
     * Generates a schema object that matches a string data type.
     *
     * Note that the empty string is not allowed by default and must be enabled with { allow: "" }.
     * Don't over think, just remember that the empty string is not a valid string by default.
     * Also, don't ask to change it or argue why it doesn't make sense. This topic is closed.
     */
    type: "string";

    default?: string;

    /**
     * Requires the string value to only contain a-z, A-Z, and 0-9.
     */
    alphanum?: true;

    /**
     * Requires the string value to be a valid base64 string; does not check the
     * decoded value.
     */
    base64?: boolean | {

        /**
         * If true, the string must be properly padded with the = characters.
         *
         * @default true
         */
        paddingRequired?: boolean;

        /**
         * If true, uses the URI-safe base64 format which replaces + with - and
         * \ with _. Defaults to false.
         *
         * @default false
         */
        urlSafe?: boolean;
    };

    /**
     * Sets the required string case.
     */
    case?: "upper" | "lower";

    /**
     * Requires the number to be a credit card number (Using Luhn Algorithm).
     */
    creditCard?: true;

    /**
     * Requires the string value to be a valid data URI string.
     */
    dataUri?: boolean | {

        /**
         * If true, the string must be properly padded with the = characters.
         *
         * @default true
         */
        paddingRequired?: boolean;
    };
    domain?: boolean | {

        /**
         * If `true`, Unicode characters are permitted
         *
         * @default true
         */
        allowUnicode?: boolean;

        /**
         * Options for TLD (top level domain) validation. By default, the TLD
         * must be a valid name listed on the [IANA registry](http://data.iana.org/TLD/tlds-alpha-by-domain.txt)
         *
         * @default { allow: true }
         */
        tlds?: TopLevelDomainOptions;

        /**
         * Number of segments required for the domain.
         *
         * @default 2
         */
        minDomainSegments?: number;
    };
    email?: boolean | {

        /**
         * If `true`, Unicode characters are permitted
         *
         * @default true
         */
        allowUnicode?: boolean;

        /**
         * If `true`, ignore invalid email length errors.
         *
         * @default false
         */
        ignoreLength?: boolean;

        /**
         * If true, allows multiple email addresses in a single string,
         * separated by , or the separator characters.
         *
         * @default false
         */
        multiple?: boolean;

        /**
         * When multiple is true, overrides the default , separator. String can
         * be a single character or multiple separator characters.
         *
         * @default ','
         */
        separator?: string | string[];

        /**
         * Options for TLD (top level domain) validation. By default, the TLD
         * must be a valid name listed on the [IANA registry](http://data.iana.org/TLD/tlds-alpha-by-domain.txt)
         *
         * @default { allow: true }
         */
        tlds?: TopLevelDomainOptions | false;

        /**
         * Number of segments required for the domain. Be careful since some
         * domains, such as `io`, directly allow email.
         *
         * @default 2
         */
        minDomainSegments?: number;
    };

    /**
     * Requires the string value to be a valid GUID.
     *
     * If true then it is assumed to be a generic guid which will not validate
     * the version or variant of the guid and just check for general structure
     * format.
     */
    guid?: boolean | GuidVersions | GuidVersions[];

    /**
     * Requires the string value to be a valid hexadecimal string.
     */
    hex?: boolean | {

        /**
         * Hex decoded representation must be byte aligned.
         *
         * @default false
         */
        byteAligned?: boolean;
    };

    /**
     * Requires the string value to be a valid hostname as per RFC1123.
     */
    hostname?: true;

    /**
     * Allows the value to match any whitelist of blacklist item in a case
     * insensitive comparison.
     */
    insensitive?: true;

    /**
     * Requires the string value to be a valid ip address.
     */
    ip?: true | {

        /**
         * One or more IP address versions to validate against.
         */
        version?: IPVersions | IPVersions[];

        /**
         * Used to determine if a CIDR is allowed or not.
         */
        cidr?: PresenceMode;
    };

    /**
     * Requires the string value to be in valid ISO 8601 date format.
     */
    isoDate?: true;

    /**
     * Requires the string value to be in valid ISO 8601 duration format.
     */
    isoDuration?: true;

    /**
     * Specifies the exact string length required
     */
    length?: number | {

        /**
         * The required string length. It can also be a reference to another field.
         */
        limit: number | Reference;

        /**
         * If specified, the string length is calculated in bytes using the provided encoding.
         */
        encoding?: string;
    };

    /**
     * Requires the string value to be all lowercase. If the validation convert option is on (enabled by default), the string will be forced to lowercase.
     */
    lowercase?: true;

    /**
     * Specifies the maximum number of string characters.
     */
    max?: number | {

        /**
         * The maximum number of string characters allowed. It can also be a reference to another field.
         */
        limit: number | Reference;

        /**
         * If specified, the string length is calculated in bytes using the provided encoding.
         */
        encoding?: string;
    };

    /**
     * Specifies the minimum number of string characters.
     */
    min?: number | {

        /**
         * The minimum number of string characters allowed. It can also be a reference to another field.
         */
        limit: number | Reference;

        /**
         * If specified, the string length is calculated in bytes using the provided encoding.
         */
        encoding?: string;
    };

    /**
     * Requires the string value to be in a unicode normalized form. If the
     * validation convert option is on (enabled by default), the string will be
     * normalized. The unicode normalization form to use. Valid values:
     * NFC [default], NFD, NFKC, NFKD
     */
    normalize?: true | "NFC" | "NFD" | "NFKC" | "NFKD";

    /**
     * Defines a regular expression rule.
     */
    pattern?: RegExp | {

        /**
         * If specified as true, the provided pattern will be disallowed instead of required.
         * @default false
         */
        invert?: boolean;

        /**
         * Optional pattern name
         * @default 'required'
         */
        name?: string;

        /**
         * A regular expression object the string value must match against
         */
        regex: RegExp;
    };

    /**
     * Defines a regular expression rule.
     */
    regex?: RegExp | {

        /**
         * If specified as true, the provided pattern will be disallowed instead of required.
         * @default false
         */
        invert?: boolean;

        /**
         * Optional pattern name
         * @default 'required'
         */
        name?: string;

        /**
         * A regular expression object the string value must match against
         */
        regex: RegExp;
    };

    /**
     * Replace characters matching the given pattern with the specified replacement string where:
     */
    replace?: {

        /**
         * A regular expression object to match against, or a string of which all occurrences will be replaced.
         */
        regex: RegExp;

        /**
         * The string that will replace the pattern.
         */
        replacement: string;
    };

    /**
     * Requires the string value to only contain a-z, A-Z, 0-9, and underscore _.
     */
    token?: true;

    /**
     * Requires the string value to contain no whitespace before or after.
     * If the validation convert option is on (enabled by default), the string will be trimmed.
     * @default true
     */
    trim?: boolean;

    /**
     * Specifies whether the string.max() limit should be used as a truncation.
     * @default true
     */
    truncate?: boolean;

    /**
     * Requires the string value to be all uppercase. If the validation convert option is on (enabled by default), the string will be forced to uppercase.
     */
    uppercase?: true;

    /**
     * Requires the string value to be a valid RFC 3986 URI.
     */
    uri?: true | Joi.UriOptions;

    /**
     * Requires the string value to be a valid GUID.
     *
     * If true then it is assumed to be a generic guid which will not validate
     * the version or variant of the guid and just check for general structure
     * format.
     */
    uuid?: boolean | GuidVersions | GuidVersions[];
}

export const stringSchemaToJoi = function(type: StringSchema): Joi.AnySchema{

    let schema = Joi.string();

    if(type !== "string"){

        schema = convert.alphanum(schema, type.alphanum);
        schema = convert.base64(schema, type.base64);
        schema = convert.case(schema, type.case);
        schema = convert.creditCard(schema, type.creditCard);
        schema = convert.dataUri(schema, type.dataUri);
        schema = convert.domain(schema, type.domain);
        schema = convert.email(schema, type.email);
        schema = convert.guid(schema, type.guid);
        schema = convert.guid(schema, type.uuid);
        schema = convert.hex(schema, type.hex);
        schema = convert.hostname(schema, type.hostname);
        schema = convert.insensitive(schema, type.insensitive);
        schema = convert.ip(schema, type.ip);
        schema = convert.isoDate(schema, type.isoDate);
        schema = convert.isoDuration(schema, type.isoDuration);
        schema = convert.length(schema, type.length);
        schema = convert.lowercase(schema, type.lowercase);
        schema = convert.max(schema, type.max);
        schema = convert.min(schema, type.min);
        schema = convert.normalize(schema, type.normalize);
        schema = convert.pattern(schema, type.pattern);
        schema = convert.pattern(schema, type.regex);
        schema = convert.replace(schema, type.replace);
        schema = convert.token(schema, type.token);
        schema = convert.trim(schema, type.trim);
        schema = convert.truncate(schema, type.truncate);
        schema = convert.uppercase(schema, type.uppercase);
        schema = convert.uri(schema, type.uri);

    }

    return extendAnySchema(schema, type);

};

