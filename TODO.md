
migrate from @TAMLAND/* to @newsteam/*
    babel
    babel-preset
    eslint
    eslint-config
    imagemin
    jasmine
    postcss-config
    stylelint
    stylelint-config
    ---- add deprecation message to readme.md and deprecate in npm
    ---- move over references in TAMLAND to @newsteam versions
    ---- migrate @newsteam/logger to @TAMLAND/legacy-cli-logger


expand postcss with new plugins
read .postcss.config.js at run time like we do for modernizr.js and newsteam.js

make the cli 'newsteam assemble' instead of assemble
    break it into newsteam/cli and newsteam/cli and link the assemble cli into the cli


implement https://github.com/webpack-contrib/css-minimizer-webpack-plugin instead of https://github.com/NMFR/optimize-css-assets-webpack-plugin
https://github.com/webpack-contrib/cache-loader (move to the cache config instead)
