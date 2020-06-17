

/*
 * SCSS specific linting rules: @function
 *
 * https://github.com/kristerkari/stylelint-scss#-function
 */


import { idPattern } from "../../../../config";


export default {
    rules: {

        /*
         * Require named parameters in SCSS function call rule.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules//README.md
         */
        "scss/at-function-named-arguments": [
            "always",
            {
                ignoreFunctions: [
                    "attr",
                    "blur",
                    "brightness",
                    "calc",
                    "circle",
                    "constant",
                    "contrast",
                    "counter",
                    "counters",
                    "cubic-bezier",
                    "drop-shadow",
                    "ellipse",
                    "env",
                    "grayscale",
                    "hsl",
                    "hsla",
                    "hue-rotate",
                    "hwb",
                    "image",
                    "inset",
                    "invert",
                    "linear-gradient",
                    "matrix",
                    "matrix3d",
                    "opacity",
                    "perspective",
                    "polygon",
                    "radial-gradient",
                    "repeating-linear-gradient",
                    "repeating-radial-gradient",
                    "rgb",
                    "rgba",
                    "rotate",
                    "rotate3d",
                    "rotateX",
                    "rotateY",
                    "rotateZ",
                    "saturate",
                    "sepia",
                    "scale",
                    "scale3d",
                    "scaleX",
                    "scaleY",
                    "scaleZ",
                    "skew",
                    "skewX",
                    "skewY",
                    "symbols",
                    "translate",
                    "translate3d",
                    "translateX",
                    "translateY",
                    "translateZ",
                    "url"
                ]
            }
        ],

        /*
         * Require or disallow a space before @function parentheses (Autofixable).
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules//README.md
         */
        "scss/at-function-parentheses-space-before": "never",

        /*
         * Specify a pattern for Sass/SCSS-like function names.
         *
         * https://github.com/kristerkari/stylelint-scss/blob/master/src/rules//README.md
         */
        "scss/at-function-pattern": idPattern

    }
};
