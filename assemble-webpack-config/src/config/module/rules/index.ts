

import merge from "webpack-merge";
import { Configuration } from "webpack";

import { files } from "./files";
import { fonts } from "./fonts";
import { html } from "./html";
import { images } from "./images";
import { jquery } from "./jquery";
import { json } from "./json";
import { scripts } from "./scripts";
import { styles } from "./styles";

import { Options } from "../../..";


/*
 * An array of Rules which are matched to requests when modules are created.
 * These rules can modify how the module is created. They can apply loaders to
 * the module, or modify the parser.
 *
 * https://webpack.js.org/configuration/module/#modulerules
 */
export const rules = function(
    config: Configuration,
    options: Options
): Configuration{

    return merge(
        jquery(config),
        fonts(config, options),
        images(config, options),
        scripts(config),
        styles(config, options),
        html(config),
        json(config),
        files(config, options)
    );

};
