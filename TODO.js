
/*

    make the cache dependencies check the version as well as the dependencies for a rebuild

    get rid of fs-extra in favour of fs.promises where possible

*/


gulp.task("build", gulp.series(
    // clean,
    // gulp.parallel(
    //     require("./tasks/dependencies.js")(conf.dependencies.base),
    //     require("./tasks/dependencies.js")(conf.dependencies.console),
    //     require("./tasks/dependencies.js")(conf.dependencies.custom)
    // ),
    // gulp.parallel(
    //    require("./tasks/build/entries.js")(conf),
    //    require("./tasks/build/release.js")(conf),
    //    require("./tasks/modernizr.js")(conf.modernizr),
    //    require("./tasks/build/polymer.js")(conf),
    //    builders.static,
    //    builders.yaml
    // ),
    // builders.settings,
    // builders.widgets,
    // () => require("./tasks/build/clients.js")(conf),
    // args.fast ? async () => {} : lint,
    // (callback) => builders.html(gulp.src(paths.html.base, { base: conf.source }), callback, false),
    // (callback) => builders.html(gulp.src(paths.html.custom, { base: conf.source }), callback, false),
    // (callback) => builders.rss(gulp.src(paths.rss, { base: conf.source }), callback, false),
    (callback) => {

        require("./tasks/build/webpack.js")({
            config: require("./config/webpack.js")({
                analyzerPort: conf.analyzerPort,
                watch: false
            }),
            dest: conf.source
        })(callback);

    },
    builders.sw
));

gulp.task("local", gulp.series(
    // () => require("./tasks/local/link")(args.link),
    "build",
    gulp.parallel(
        gulp.parallel(
            () => {

                require("./tasks/build/webpack.js")({
                    config: require("./config/webpack.js")({
                        analyzerPort: conf.analyzerPort,
                        watch: true
                    }),
                    dest: conf.source
                })();

            },
            // () => watch(paths.html.base, conf.watch, batch(builders.html)),
            // () => watch(paths.html.custom, conf.watch, batch(builders.html)),
            // () => linters.html.base.watch(),
            // () => linters.html.custom.watch(),
            // () => linters.js.base.watch(),
            // () => linters.js.custom.watch(),
            // () => linters.scss.base.watch(),
            // () => linters.scss.custom.watch(),
            // () => watch(paths.py, conf.watch, batch(linters.py)),
            // () => watch(paths.rss, conf.watch, batch(builders.rss)),
            // () => watch(paths.settingsWatch, conf.watch, batch(builders.settings)),
            // () => watch(paths.settingsWatch, conf.watch, batch(linters.settings)),
            // () => watch(paths.staticWatch, conf.watch, builders.static),
            // () => watch(paths.yamlWatch, conf.watch, builders.yaml),
            // () => watch(paths.widgetsWatch, conf.watch, builders.widgets)
        ),
        // () => require("./tasks/local/server")(conf.local.server),
        // () => require("./tasks/local/open")(conf.local.open.path)
    )
));

gulp.task("promote", require("./tasks/deploy/promote"));


/*
 */
gulp.task("setup-env", gulp.series(
    async () => {

        global.setupEnv = await require("./tasks/setup-env/select")(conf);

    },
    async () => {

        await require("./tasks/setup-env/run")(global.setupEnv);

        await require("./tasks/notify")({
            contentImage: `publications/${ global.setupEnv.publicationId }/static/icons/app-icons/app-icon.180x180.png`,
            icon: `publications/${ global.setupEnv.publicationId }/static/icons/app-icons/app-icon.180x180.png`,
            message: `${ global.setupEnv.projectType } Setup Complete`,
            sound: "Blow",
            title: `${ global.setupEnv.name }: ${ global.setupEnv.environmentName }`
        });

    }
));

gulp.task("deploy", gulp.series(
    async () => {

        global.deploy = await require("./tasks/deploy/select")(conf);

    },
    "clean-gulp",
    "build",
    async () => {

        await require("./tasks/deploy/run")(global.deploy);

        await require("./tasks/notify")({
            contentImage: `publications/${ global.deploy.publicationId }/static/icons/app-icons/app-icon.180x180.png`,
            icon: `publications/${ global.deploy.publicationId }/static/icons/app-icons/app-icon.180x180.png`,
            message: "Deploy Complete",
            sound: "Blow",
            title: `${ global.deploy.name }: ${ global.deploy.environmentName }`
        });

    }
));

/*
 * Runs lossless compression over all images in the project.
 */
gulp.task("optimize", require("./tasks/optimize/images.js")(paths.images, conf));

/*
* Runs the test suite on all publications.
*/
gulp.task("test", require("./tasks/test"));

const lint = gulp.parallel(
    () => linters.html.base.run(),
    () => linters.html.custom.run(),
    //() => linters.js.base.run(),
    //() => linters.js.custom.run(),
    (callback) => linters.py(gulp.src(paths.py, { base: conf.source }), callback, false),
    () => linters.scss.base.run(),
    () => linters.scss.custom.run(),
    linters.lint,
    //linters.settings
);

/*
 * Runs all lints on the project
 */
gulp.task("lint", lint);

gulp.task("build-settings", gulp.series(
    builders.settings
));


