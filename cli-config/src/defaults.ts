

export const defaults = {
    htmlmin: {
        glob: "src/publication/{base,custom,shared}/**/*.html",
        ignore: [
            "**/node_modules/**/*.html",
            "**/static/**/*.html"
        ],
        options: {
            collapseInlineTagWhitespace: false,
            collapseWhitespace: true,
            conservativeCollapse: true,
            ignoreCustomFragments: [
                /\{%[\S\s]*?%\}/gu,
                /\{\{[\S\s]*?\}\}/gu
            ],
            minifyJS: false,
            quoteCharacter: "\"",
            removeAttributeQuotes: true,
            removeComments: true,
            removeRedundantAttributes: false,
            removeScriptTypeAttributes: true,
            trimCustomFragments: false
        }
    },
    local: {
        console: true,
        emulators: {
            firestore: {
                host: "127.0.0.1",
                port: 8081
            }
        },
        python: {
            server: {
                port: 8080
            }
        }
    },
    modernizr: {
        addFeatures: [
            "css/flexbox",
            "css/filters",
            "css/vhunit",
            "css/vwunit",
            "css/backdropfilter",
            "svg/smil",
            "svg/inline",
            "dom/passiveeventlisteners",
            "storage/localstorage"
        ]
    },
    npm: {
        manifests: [
            "package.json",
            "src/cosmos/console3/package.json",
            "src/publication/custom/package.json"
        ]
    },
    paths: {
        build: "src/build",
        clients: "src/clients",
        settings: {
            environments: "src/publication/custom/settings/environments.json",
            handlers: "src/publication/custom/settings/handlers.json"
        },
        source: "src",
        yaml: "src/publication/base/app.yaml"
    },
    rss: {
        glob: "src/publication/{base,custom,shared}/**/*.rss",
        ignore: [
            "**/node_modules/**/*.rss",
            "**/static/**/*.rss"
        ]
    }
};
