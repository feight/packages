
import "jasmine";

import Joi from "@hapi/joi";

import { EqualityTest } from "./utils/test";
import * as string from "./string";


class Test extends EqualityTest<string.StringSchema, typeof string.stringSchemaToJoi>{}


const method = string.stringSchemaToJoi;
const name = "stringSchemaToJoi";


describe("{ stringSchemaToJoi }", () => {

    it("stringSchemaToJoi is defined", () => {
        expect(string.stringSchemaToJoi).toBeDefined();
    });

});

new Test(`${ name }`, method, [
    [
        Joi.string(),
        { type: "string" }
    ],
    [
        Joi.string(),
        "string"
    ],
    [
        Joi.string().required(),
        {
            required: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }.allow("")`, method, [
    [
        Joi.string().allow(""),
        {
            allow: "",
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<alphanum>`, method, [
    [
        Joi.string().alphanum(),
        {
            alphanum: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<base64>`, method, [
    [
        Joi.string().base64(),
        {
            base64: true,
            type: "string"
        }
    ],
    [
        Joi.string().base64({
            paddingRequired: true,
            urlSafe: true
        }),
        {
            base64: {
                paddingRequired: true,
                urlSafe: true
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<case>`, method, [
    [
        Joi.string().case("upper"),
        {
            case: "upper",
            type: "string"
        }
    ],
    [
        Joi.string().case("lower"),
        {
            case: "lower",
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<creditCard>`, method, [
    [
        Joi.string().creditCard(),
        {
            creditCard: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<dataUri>`, method, [
    [
        Joi.string().dataUri(),
        {
            dataUri: true,
            type: "string"
        }
    ],
    [
        Joi.string().dataUri({ paddingRequired: true }),
        {
            dataUri: { paddingRequired: true },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<domain>`, method, [
    [
        Joi.string().domain(),
        {
            domain: true,
            type: "string"
        }
    ],
    [
        Joi.string().domain({
            allowUnicode: true,
            minDomainSegments: 2,
            tlds: {
                allow: ["com"],
                deny: ["net"]
            }
        }),
        {
            domain: {
                allowUnicode: true,
                minDomainSegments: 2,
                tlds: {
                    allow: ["com"],
                    deny: ["net"]
                }
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<email>`, method, [
    [
        Joi.string().email(),
        {
            email: true,
            type: "string"
        }
    ],
    [
        Joi.string().email({
            allowUnicode: true,
            ignoreLength: true,
            minDomainSegments: 2,
            multiple: true,
            separator: ",",
            tlds: {
                allow: ["com"],
                deny: ["net"]
            }
        }),
        {
            email: {
                allowUnicode: true,
                ignoreLength: true,
                minDomainSegments: 2,
                multiple: true,
                separator: ",",
                tlds: {
                    allow: ["com"],
                    deny: ["net"]
                }
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<guid|uuid>`, method, [
    [
        Joi.string().guid(),
        {
            guid: true,
            type: "string"
        }
    ],
    [
        Joi.string().guid({
            version: "uuidv1"
        }),
        {
            guid: "uuidv1",
            type: "string"
        }
    ],
    [
        Joi.string().guid({
            version: ["uuidv1", "uuidv2", "uuidv3", "uuidv4", "uuidv5"]
        }),
        {
            guid: ["uuidv1", "uuidv2", "uuidv3", "uuidv4", "uuidv5"],
            type: "string"
        }
    ],
    [
        Joi.string().uuid(),
        {
            type: "string",
            uuid: true
        }
    ],
    [
        Joi.string().uuid({
            version: "uuidv1"
        }),
        {
            type: "string",
            uuid: "uuidv1"
        }
    ],
    [
        Joi.string().uuid({
            version: ["uuidv1", "uuidv2", "uuidv3", "uuidv4", "uuidv5"]
        }),
        {
            type: "string",
            uuid: ["uuidv1", "uuidv2", "uuidv3", "uuidv4", "uuidv5"]
        }
    ]
]).run();

new Test(`${ name }<hex>`, method, [
    [
        Joi.string().hex(),
        {
            hex: true,
            type: "string"
        }
    ],
    [
        Joi.string().hex({ byteAligned: true }),
        {
            hex: { byteAligned: true },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<hostname>`, method, [
    [
        Joi.string().hostname(),
        {
            hostname: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<insensitive>`, method, [
    [
        Joi.string().insensitive(),
        {
            insensitive: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<ip>`, method, [
    [
        Joi.string().ip(),
        {
            ip: true,
            type: "string"
        }
    ],
    [
        Joi.string().ip({
            cidr: "optional",
            version: "ipv4"
        }),
        {
            ip: {
                cidr: "optional",
                version: "ipv4"
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<isoDate>`, method, [
    [
        Joi.string().isoDate(),
        {
            isoDate: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<isoDuration>`, method, [
    [
        Joi.string().isoDuration(),
        {
            isoDuration: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<length>`, method, [
    [
        Joi.string().length(1),
        {
            length: 1,
            type: "string"
        }
    ],
    [
        Joi.string().length(1, "utf8"),
        {
            length: {
                encoding: "utf8",
                limit: 1
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<lowercase>`, method, [
    [
        Joi.string().lowercase(),
        {
            lowercase: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<max>`, method, [
    [
        Joi.string().max(1),
        {
            max: 1,
            type: "string"
        }
    ],
    [
        Joi.string().max(1, "utf8"),
        {
            max: {
                encoding: "utf8",
                limit: 1
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<min>`, method, [
    [
        Joi.string().min(1),
        {
            min: 1,
            type: "string"
        }
    ],
    [
        Joi.string().min(1, "utf8"),
        {
            min: {
                encoding: "utf8",
                limit: 1
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<normalize>`, method, [
    [
        Joi.string().normalize(),
        {
            normalize: true,
            type: "string"
        }
    ],
    [
        Joi.string().normalize("NFKC"),
        {
            normalize: "NFKC",
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<pattern|regex>`, method, [
    [
        Joi.string().pattern(/xyz/u),
        {
            pattern: /xyz/u,
            type: "string"
        }
    ],
    [
        Joi.string().pattern(/xyz/u, {
            invert: false,
            name: "test"
        }),
        {
            pattern: {
                invert: false,
                name: "test",
                regex: /xyz/u
            },
            type: "string"
        }
    ],
    [
        Joi.string().regex(/xyz/u),
        {
            regex: /xyz/u,
            type: "string"
        }
    ],
    [
        Joi.string().regex(/xyz/u, {
            invert: false,
            name: "test"
        }),
        {
            regex: {
                invert: false,
                name: "test",
                regex: /xyz/u
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<replace>`, method, [
    [
        Joi.string().replace(/xyz/u, "abc"),
        {
            replace: {
                regex: /xyz/u,
                replacement: "abc"
            },
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<token>`, method, [
    [
        Joi.string().token(),
        {
            token: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<trim>`, method, [
    [
        Joi.string().trim(false),
        {
            trim: false,
            type: "string"
        }
    ],
    [
        Joi.string().trim(),
        {
            trim: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<truncate>`, method, [
    [
        Joi.string().truncate(),
        {
            truncate: true,
            type: "string"
        }
    ]
]).run();

new Test(`${ name }<uppercase>`, method, [
    [
        Joi.string().uppercase(),
        {
            type: "string",
            uppercase: true
        }
    ]
]).run();

new Test(`${ name }<uri>`, method, [
    [
        Joi.string().uri(),
        {
            type: "string",
            uri: true
        }
    ],
    [
        Joi.string().uri({
            allowQuerySquareBrackets: false,
            allowRelative: true,
            domain: {
                allowUnicode: true,
                minDomainSegments: 2,
                tlds: {
                    allow: ["com"],
                    deny: ["net"]
                }
            },
            relativeOnly: false,
            scheme: [
                "git",
                /git\+https?/u
            ]
        }),
        {
            type: "string",
            uri: {
                allowQuerySquareBrackets: false,
                allowRelative: true,
                domain: {
                    allowUnicode: true,
                    minDomainSegments: 2,
                    tlds: {
                        allow: ["com"],
                        deny: ["net"]
                    }
                },
                relativeOnly: false,
                scheme: [
                    "git",
                    /git\+https?/u
                ]
            }
        }
    ]
]).run();
