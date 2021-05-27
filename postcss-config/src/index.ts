

import postcssColormin from "postcss-colormin";
import postcssDiscardComments from "postcss-discard-comments";
import postcssDiscardDuplicates from "postcss-discard-duplicates";
import postcssDiscardEmpty from "postcss-discard-empty";
import postcssFontVariant from "postcss-font-variant";
import postcssMergeLonghand from "postcss-merge-longhand";
import postcssMergeRules from "postcss-merge-rules";
import postcssMinifyFontValues from "postcss-minify-font-values";
import postcssMinifyGradients from "postcss-minify-gradients";
import postcssMinifyParams from "postcss-minify-params";
import postcssMinifySelectors from "postcss-minify-selectors";
import postcssNormalizePositions from "postcss-normalize-positions";
import postcssNormalizeUrl from "postcss-normalize-url";
import postcssNormalizeWhitespace from "postcss-normalize-whitespace";
import postcssOrderedValues from "postcss-ordered-values";
import postcssReduceInitial from "postcss-reduce-initial";
import postcssReduceTransforms from "postcss-reduce-transforms";
import type { Transformer } from "postcss";


const plugins: Transformer[] = [
    postcssColormin,
    postcssDiscardComments,
    postcssDiscardDuplicates,
    postcssDiscardEmpty,
    postcssFontVariant,
    postcssMergeLonghand,
    postcssMergeRules,
    postcssMinifyFontValues,
    postcssMinifyGradients,
    postcssMinifyParams,
    postcssMinifySelectors,
    postcssNormalizePositions,
    postcssNormalizeUrl,
    postcssNormalizeWhitespace,
    postcssOrderedValues,
    postcssReduceInitial,
    postcssReduceTransforms
];


export default {
    plugins
};
