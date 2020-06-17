

import gifsicle from "imagemin-gifsicle";
import minify from "imagemin";
import jpegtran from "imagemin-jpegtran";
import optipng from "imagemin-optipng";
import svgo from "imagemin-svgo";


export const imagemin = function(input: string[], destination: string): Promise<minify.Result[]>{

    return minify(input, {
        destination,
        plugins: [
            gifsicle({
                interlaced: true
            }),
            jpegtran({
                progressive: true
            }),
            optipng({
                optimizationLevel: 5
            }),
            svgo({
                plugins: [
                    {
                        removeViewBox: true
                    }
                ]
            })
        ]
    });

};
