

/*

    eslint

    @typescript-eslint/no-magic-numbers: "off",
    @typescript-eslint/naming-convention: "off"

*/


export const defaults = {
    local: {
        console: true,
        docker: {
            elasticsearch: {
                environment: {
                    "discovery.type": "single-node"
                },
                port: [9200, 9300],
                recipe: "elasticsearch:7.6.2"
            },
            mysql: {
                environment: {
                    MYSQL_ROOT_PASSWORD: "cosmos"
                },
                name: "mysql",
                port: 3306,
                recipe: "mysql:5.7"
            }
        },
        emulators: {
            datastore: {
                host: "127.0.0.1",
                persist: true,
                port: 8082
            },
            firestore: {
                host: "127.0.0.1",
                port: 8081
            }
        },
        python: {
            server: {
                port: 8080,
                useDevAppServer: true
            }
        },
        redis: {
            server: {
                config: "redis.conf",
                host: "127.0.0.1",
                port: 6379
            }
        }
    },
    paths: {
        build: "src/build",
        clients: "src/clients",
        entries: {
            glob: [
                "src/publication/custom/pages/*/index.{js,scss}",
                "src/publication/custom/pages/**/index.{js,scss}",
                "src/publication/custom/app/entry/index.{js,scss}",
                "src/publication/custom/app/push/index.js",
                "src/publication/custom/app/entry/amp/index.scss",
                "src/publication/custom/app/entry/mobile/index.scss"
            ]
        },
        html: {
            glob: "src/publication/{base,custom,shared}/**/*.html",
            ignore: [
                "**/node_modules/**/*.html",
                "**/static/**/*.html"
            ]
        },
        modernizr: {
            filename: "modernizr.js",
            glob: ".modernizr.{js,json}"
        },
        npm: {
            manifests: [
                "package.json",
                "src/cosmos/console3/package.json",
                "src/publication/custom/package.json"
            ]
        },
        rss: {
            glob: "src/publication/{base,custom,shared}/**/*.rss",
            ignore: [
                "**/node_modules/**/*.rss",
                "**/static/**/*.rss"
            ]
        },
        scripts: {
            glob: [
                "src/publication/{base,custom,shared}/**/*.{js,jsx,ts,tsx}",
                "src/settings/**/*.{js,jsx,ts,tsx}"
            ],
            ignore: [
                "*.json",
                "*.min.js",
                "*.d.ts",
                "**/node_modules/**/*.{js,jsx,ts,tsx}",
                "**/static/**/*.{js,jsx,ts,tsx}"
            ]
        },
        settings: {
            environments: "src/publication/custom/settings/environments.json",
            glob: "src/publication/{base,custom,shared}/settings/**/*.{js,json}",
            handlers: "src/publication/custom/settings/handlers.json",
            validations: [
                {
                    glob: "src/publication/shared/settings/index.json",
                    schema: "src/settings/schema/shared/index.json"
                },
                {
                    glob: "src/publication/{base,custom}/settings/index.json",
                    schema: "src/settings/schema/index.json"
                },
                {
                    glob: "src/publication/{base,custom,shared}/widgets/*/index.json",
                    schema: "src/settings/schema/widget.json"
                },
                {
                    glob: [
                        "src/publication/custom/settings/publications/*/index.json",
                        "src/publication/custom/settings/publication.json"
                    ],
                    schema: "src/settings/schema/publication.json"
                },
                {
                    glob: "src/publication/custom/settings/account.json",
                    schema: "src/settings/schema/account.json"
                },
                {
                    glob: "src/publication/custom/settings/cosmosd.json",
                    schema: "src/settings/schema/cosmosd.json"
                },
                {
                    glob: "src/publication/custom/settings/environments.json",
                    schema: "src/settings/schema/environments.json"
                },
                {
                    glob: "src/publication/custom/settings/handlers.json",
                    schema: "src/settings/schema/handlers.json"
                },
                {
                    glob: "src/publication/custom/settings/mappings.json",
                    schema: "src/settings/schema/mappings.json"
                },
                {
                    glob: "src/publication/custom/settings/offers.json",
                    schema: "src/settings/schema/offers.json"
                }
            ]
        },
        source: "src",
        static: {
            glob: "src/publication/{base,custom,shared}/static/**/*.*"
        },
        styles: {
            glob: [
                "src/publication/{base,custom,shared}/**/*.{css,scss}"
            ],
            ignore: [
                "*.min.css",
                "**/node_modules/**/*.{css,scss}",
                "**/static/**/*.{css,scss}"
            ]
        },
        webpack: {
            config: ".webpack.ts"
        },
        widgets: {
            glob: "src/publication/{base,custom,shared}/widgets/**/*.*",
            roots: [
                "src/publication/base",
                "src/publication/custom",
                "src/publication/shared"
            ]
        },
        yaml: "src/publication/base/app.yaml"
    },
    webpack: {
        profile: false
    }

};
