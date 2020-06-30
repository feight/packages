
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
    ---- migrate @newsteam/logger to @TAMLAND/cli-logger


expand postcss with new plugins
read .postcss.config.js at run time like we do for modernizr.js and newsteam.js

make the cli 'newsteam assemble' instead of assemble
    break it into newsteam/cli and newsteam/cli and link the assemble cli into the cli
