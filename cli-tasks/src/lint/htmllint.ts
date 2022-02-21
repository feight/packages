

import path from "path";
import fs from "fs";

import htmllint from "htmllint";
import { rcFile } from "rc-config-loader";
import { logger } from "@newsteam/legacy-cli-logger";
import { watch } from "@newsteam/cli-utils";
import { LintError } from "@newsteam/legacy-cli-errors";

import type { WatchOptions } from "@newsteam/cli-utils";
import type { LintErrorData } from "@newsteam/legacy-cli-errors";
import type vinyl from "vinyl";
import type { HtmlLintIssue } from "htmllint";


export class HtmllintError extends LintError{

    constructor(data: LintErrorData[]){

        super(data);

        this.name = "HtmllintError";

        this.description = "Htmllint Error";

    }

}


export interface HtmllintFile extends vinyl{
    htmllint: {
        fixed: boolean;
    };
}


export interface HTMLLintOptions{
    config?: string;
    maxerr?: number;
    rules?: {

        /*
         * Default: [
         *  'align',
         *  'background',
         *  'bgcolor',
         *  'border',
         *  'frameborder',
         *  'longdesc',
         *  'marginwidth',
         *  'marginheight',
         *  'scrolling',
         *  'style',
         *  'width'
         * ]
         *
         * The value of this option is a list of strings, each of which is an
         * attribute name or regular expression matching attribute names.
         * Attributes with any of the given names are disallowed.
         */
        "attr-bans": string[];

        /*
         * Default: false
         *
         * A string giving a regular expression, a RegExp object, or false.
         * If set, attrs with names matching the given regular expression are
         * ignored for the attr-name-style rule. For example, excluding {{...}}
         * names used by Angular and other templating methods can be done with
         * the regex {{.*?}}.
         */
        "attr-name-ignore-regex": RegExp | boolean | string;

        /*
         * Default: "dash"
         *
         * A format specifier, or false. If set, attribute names must conform to
         * the given format.
         */
        "attr-name-style": "dash" | false;

        /*
         * Default: false
         *
         * A non-negative integer, or "+0". If set, no more than this number of
         * attributes may be on the same row. A value of 0 applies only to the
         * first row, restricting subsequent rows to one element, and a value of
         * "+0" is the same but allows an attribute to be on the first row if
         * there is only one attribute.
         */
        "attr-new-line": number | false;

        /*
         * If set, the same attribute name cannot be repeated within a single tag.
         */
        "attr-no-dup": boolean;

        /*
         * If set, unsafe characters may not be used in attribute values. The
         * unsafe characters are those whose unicode values lie in the ranges
         * 0000-0009, 000b-000c, 000e-001f, 007f-009f, 00ad, 0600-0604, 070f,
         * 17b4, 17b5, 200c-200f, 2028-202f, 2060-206f, feff, fff0-ffff.
         */
        "attr-no-unsafe-char": boolean;

        /*
         * Default: false
         *
         * A list of attribute names, or false. If set, any attributes present
         * in the list must be ordered as they are in the list.
         */
        "attr-order": string[] | false;

        /*
         * Default: "double"
         *
         * "double": Attribute values must be quoted using double quotes.
         * "single": Attribute values must be quoted using single quotes.
         * "quoted": Attribute values must be quoted.
         * false: No restriction.
         *
         * Applies only to attributes with values (including the empty quoted
         * values '' and ""). To catch attributes with no values, use
         * attr-req-value.
         */
        "attr-quote-style": "double" | "quoted" | "single" | false;

        /*
         * If set, attribute values cannot be empty. This does not disallow the
         * value "".
         *
         * Boolean attributes such as hidden and checked do not require values,
         * but no attribute may have an equals sign but no value after it,
         * like <div class=></div>, as this is invalid html.
         */
        "attr-req-value": boolean;

        /*
         * If set, attributes in a tag must be well-formed.
         */
        "attr-validate": boolean;

        /*
         * Default: false
         *
         * WCAG rule 78: Each button element must contain content.
         */
        "button-req-content": boolean;

        /*
         * If set, the same class name cannot be repeated within a class attribute.
         */
        "class-no-dup": boolean;

        /*
         * Default: false
         *
         * A format specifier, "none", or false. If set, classes must fit the
         * given format. If false, the value for id-class-style is used instead
         * (use 'none' to avoid matching anything).
         *
         * Note that there is no symmetric id-style option. This maintains
         * compatibility with older versions of htmllint and allows a user to
         * set both id and class styles with a single option in the common case
         * that they are the same. To use different styles, set the class style
         * with class-style and the id style with id-class-style.
         */
        "class-style": "none" | false;

        /*
         * Default: false
         *
         * true: The doctype (<!DOCTYPE ... >) must be the first element in the file, excluding comments and whitespace.
         * "smart": If a head tag is present in the document, then the doctype must come first.
         * false: No restriction.
         */
        "doctype-first": boolean | "smart";

        /*
         * Default: false
         *
         * If set, the doctype element must specify html5.
         */
        "doctype-html5": boolean;

        /*
         * Default: false
         *
         * WCAG rule 73: Each fieldset element should contain a legend element.
         */
        "fieldset-contains-legend": boolean;

        /*
         * Default: false
         *
         * If set, each figure tab must contain a figcaption child and each
         * figcaption tag's parent must be a figure.
         */
        "fig-req-figcaption": boolean;

        /*
         * Default: false
         *
         * If set, all focusable elements (a, area, button, input, img, select, textarea)
         * must have a positive tabindex attribute, if any.
         *
         * Reasoning: IITAA, 10.3 and 10.4
         */
        "focusable-tabindex-style": boolean;

        /*
         * If set, any head tag in the page must contain a non-empty title tag.
         *
         * head-valid-content-model
         * If set, the content-model of the HEAD element will be enforced: only
         * base, link, meta, noscript, script, style, template, and title tags
         * are legal children.
         */
        "head-req-title": boolean;

        /*
         * Default: false
         *
         * "absolute": All href tags must use absolute URLs.
         * "relative": All href tags must use relative URLs.
         * false: No restriction. Links to fragments (that is, those starting with #) are not checked.
         */
        "href-style": "absolute" | "relative" | false;

        /*
         * Default: false
         *
         * If set, each html tag must have a lang attribute.
         */
        "html-req-lang": boolean;

        /*
         * If set, the content-model of the html element will be enforced: at
         * most one head and one body tag may appear, in that order. No other tags
         * are allowed.
         */
        "html-valid-content-model": boolean;

        /*
         * Default: false
         *
         * The value is either a string giving a regular expression or false.
         * If set, ids and classes matching the given regular expression are
         * ignored for the id-class-style rule. For example, excluding {{...}}
         * classes used by Angular and other templating methods can be done with
         * the regex {{.*?}}.
         */
        "id-class-ignore-regex": boolean;

        /*
         * If set, values for the id and class attributes may not use the word
         * "ad", "banner", or "social". This rule only bans those words when not
         * adjacent to other alphanumeric characters. Thus words like "gradient"
         * are still allowed.
         */
        "id-class-no-ad": boolean;

        /*
         * Default: "underscore"
         *
         * A format specifier, or false. If set, ids and classes must fit the
         * given format. May be overridden by class-style for classes.
         */
        "id-class-style": "underscore" | false;

        /*
         * If set, values for the id attribute may not be duplicated across elements.
         */
        "id-no-dup": boolean;

        /*
         * True: Each img tag must have a non-empty alt property.
         * "allownull": Each img tag must have an alt property with a value,
         * but value may be null (equal to "").
         * false: No restriction.
         */
        "img-req-alt": boolean | "allownull";

        /*
         * If set, a source must be given for each img tag.
         */
        "img-req-src": boolean;

        /*
         * Default: false
         *
         * If set, check wether or not two consecutive lines have an indentation
         * delta in the range [-1, 1].
         */
        "indent-delta": boolean;

        /*
         * Default: "nonmixed"
         *
         * "tabs": Only tabs may be used for indentation.
         * "spaces": Only spaces may be used for indentation.
         * "nonmixed": Either tabs or spaces may be used, but not both in the same file.
         * false: No restriction.
         */
        "indent-style": "nomixed" | "spaces" | "tabs" | false;

        /*
         * Default: 4
         *
         * The value of this option is either false or a positive integer. If it
         * is a number and spaces are used for indentation, then spaces used to
         * indent must come in multiples of that number.
         */
        "indent-width": number | false;

        /*
         * Default: false
         *
         * If set, ignore indent-width for lines whose first non-whitespace
         * character is not <. This is known as continuation indent because it
         * enables the user to continue tags onto multiple lines while aligning
         * the attribute names.
         */
        "indent-width-cont": boolean;

        /*
         * Default: false
         *
         * WCAG rule 77: Input elements where type=[button|submit|reset] must
         * have a value or title attribute.
         */
        "input-btn-req-value-or-title": boolean;

        /*
         * If set, each radio-type input must have a nonempty name attribute.
         */
        "input-radio-req-name": boolean;

        /*
         * Default: false
         *
         * If set, each text or radio input element must have an associated
         * label element. The label may be a parent of the input element, or may
         * identify the element it labels using its for attribute, which must
         * match the input's id (or name, for text inputs) attribute.
         */
        "input-req-label": boolean;

        /*
         * Default: false
         *
         * WCAG rule 74: The label element should not encapsulate select and
         * textarea elements.
         */
        "label-no-enc-textarea-or-select": boolean;

        /*
         * If set, each label tab must have a for attribute. This practice helps
         * screen readers, and improves form element selection by allowing the
         * user to focus an input by clicking on the label.
         *
         * See MDN: label element and MDN: How to structure an HTML form.
         */
        "label-req-for": boolean;

        /*
         * Default: "case"
         *
         * If set, the lang tag must have a valid form (xx-YY, where xx is a
         * valid language code and YY is a valid country code). If the value is
         * equal to "case", the tag must be capitalized conventionally (with the
         * language code lowercase and the country code uppercase).
         */
        "lang-style": boolean | "case";

        /*
         * Default: "lf"
         *
         * Line endings must conform to the given style.
         *
         * "lf": Unix style, ending in LF.
         * "crlf": Windows style, ending in CRLF.
         * "cr": Ending in CR.
         * false: No restriction.
         */
        "line-end-style": "cr" | "crlf" | "lf" | false;

        /*
         * Default: false
         *
         * The value of this option is either false or a positive integer. If it
         * is a number, the length of each line must not exceed that number.
         */
        "line-max-len": number | false;

        /*
         * Default: false
         *
         * A string giving a regular expression, a RegExp object, or false. If
         * set, lines with names matching the given regular expression are ignored
         * for the line-length rule. For example, lines with long href attributes
         * can be excluded with regex href.
         */
        "line-max-len-ignore-regex": RegExp | string | false;

        /*
         * If set, lines may not end with whitespace characters.
         */
        "line-no-trailing-whitespace": boolean;

        /*
         * Default: false
         *
         * WCAG rule 38: Link text should be as least four 4 characters long.
         *
         * This rule is applied only to a tags with a nonempty href attribute.
         */
        "link-min-length-4": boolean;

        /*
         * If set, each a tag with target="_blank" must have a rel="noopener"
         * or rel="noreferrer" attribute.
         */
        "link-req-noopener": boolean;

        /*
         *
         * Default: false
         *
         * A nonnegative integer, or false. If it is a positive integer, limit
         * output to at most that many issues.
         */
        maxerr: number | false;

        /*
         * Default: false
         *
         * A string giving a regular expression, a RegExp object, or false.
         * If set, text matching the given regular expression is removed before
         * any parsing or linting occurs. This option cannot be configured in-line,
         * but it can be set to a value such as /\<\!-- htmllint ignore --\>[^]*?\<\!-- htmllint unignore --\>/
         * to allow some control using comment tags.
         */
        "raw-ignore-regex": boolean;

        /*
         * If set, special characters in text and attributes (e.g. >) must be escaped.
         */
        "spec-char-escape": boolean;

        /*
         * Default: false
         *
         * If set, each table must contain at least one caption tag.
         */
        "table-req-caption": boolean;

        /*
         * Default: false
         *
         * If set, each table tag must contain a header: a thead tag or a tr tag with a th child.
         */
        "table-req-header": boolean;

        /*
         * Default: ['style', 'b', 'i']
         *
         * The value of this option is a list of strings, each of which is a tag name.
         * Tags with any of the given names are disallowed.
         */
        "tag-bans": string[];

        /*
         * If set, tags must be closed. Because htmlparser2 does not match tags
         * case-insensitively, tags whose closing tag has a different case than
         * the opening tag may be detected by this option rather than tag-name-match.
         */
        "tag-close": boolean;

        /*
         * If set, tag names must be lowercase. Only the opening tag is checked;
         * mismatches between open and close tags are checked by tag-name-match.
         */
        "tag-name-lowercase": boolean;

        /*
         * If set, tag names must match (including case).
         */
        "tag-name-match": boolean;

        /*
         * Default: false
         *
         * If set, specified attributes should be present on the specified tag.
         */
        "tag-req-attr": boolean;

        /*
         * Default: false
         *
         * "always": Void elements must be self-closed with / (html4 style).
         * "never": Void elements must not be self-closed with / (html5 style).
         * false: No restriction.
         * The void elements are area, base, br, col, embed, hr, img, input, keygen, link, menuitem, meta, param, source, track, and wbr.
         */
        "tag-self-close": "always" | "never" | false;

        /*
         * Default: false
         *
         * A string giving a regular expression, a RegExp object, or false. If
         * set, text matching the given regular expression is ignored by rules
         * which apply to raw text (currently, just spec-char-escape).
         * For example, \[{.*?}\] will exclude text wrapped in [{...}].
         * Note that such text may still cause the input html to parse incorrectly,
         * which could result in errors in other rules later. To remove such
         * text before parsing, use raw-ignore-regex.
         */
        "text-ignore-regex": boolean;

        /*
         * Default: 60
         * The value is either false or a nonnegative integer. If nonzero, the
         * length of the text in the <title> tag must not exceed the given value.
         */
        "title-max-len": number | false;

        /*
         * If set, the <title> tag must not appear twice in the head.
         */
        "title-no-dup": boolean;
    };
}


export interface HtmllintLintTaskOptions extends WatchOptions{
    cache?: boolean;
    destination: string;
    fix?: boolean;
    options?: HTMLLintOptions;
    source: string;
    label?: string;
}


export const htmllintLintTask = async function(options: HtmllintLintTaskOptions): Promise<void>{

    const label = options.label ?? "lint";

    const config = (options.options ?? rcFile("htmllint", {
        configFileName: ".htmllint",
        cwd: process.cwd()
    })?.config ?? { rules: {} }) as HTMLLintOptions;

    await watch(options, async (files: string[]): Promise<void> => {

        const errors: LintErrorData[] = [];

        const bar = logger.progress({
            label,
            tag: `htmllint ${ logger.colorizeText(`${ files.length }`, "#444") } ${ options.fix ? logger.colorizeText("(fix)", "#0f0") : "" }`,
            total: files.length + 1
        });

        bar.tick();

        // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor -- We'll let this slide since it's for automation
        await Promise.all(files.map((file) => new Promise<void>(async (resolve) => {

            const html = fs.readFileSync(file, "utf8");

            let issues: HtmlLintIssue[] = [];

            try{

                issues = await htmllint(html, config.rules);

            }catch{}

            if(issues.length > 0){

                errors.push({
                    errors: issues.map((error) => ({
                        column: error.column,
                        file,
                        line: error.line,
                        message: error.rule
                    })),
                    file
                });

            }

            if(options.watch){

                logger.log(`lint ${ path.resolve(file) }`, { label });

            }else{

                bar.tick();

            }

            resolve();

        })));

        const error = new HtmllintError(errors);

        if(errors.length > 0){

            if(options.watch){

                logger.error(error);

            }else{

                throw error;

            }

        }

    });

};

