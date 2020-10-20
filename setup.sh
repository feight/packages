
function installPackage() {

    cd $1
    printf "\n\n\n\n\e[1;34m%-6s\e[m\n\n\n\n" "Installing $1..."

    rm -rf node_modules
    rm -f package-lock.json
    npm install

    if test $2 && test $2 == "local"
    then
        npm run npm-install-local
    fi

    # npm run test
    cd ..

}

installPackage "jasmine"
installPackage "babel-preset"
installPackage "babel"
installPackage "eslint-config"
installPackage "eslint"
installPackage "postcss-config"
installPackage "stylelint-config"
installPackage "stylelint"
installPackage "imagemin"
installPackage "legacy-service-worker"   "local"
installPackage "legacy-settings"         "local"
installPackage "legacy-cli-errors"       "local"
installPackage "cli-notify"              "local"
installPackage "npm-install-local"
installPackage "package-json"            "local"
installPackage "schema"                  "local"
installPackage "legacy-cli-logger"       "local"
installPackage "cli-utils"               "local"
installPackage "cli-tasks"               "local"
installPackage "legacy-cli-config"       "local"
installPackage "legacy-webpack-config"   "local"
installPackage "legacy-cli"              "local"
