
npm deprecate @tamland/jasmine@"< 0.2.3" "This module has been renamed to @newsteam/jasmine"
npm deprecate @tamland/babel-preset@"< 0.2.3" "This module has been renamed to @newsteam/babel-preset"
npm deprecate @tamland/babel@"< 0.2.3" "This module has been renamed to @newsteam/babel"
npm deprecate @sweetlikepete/babel-preset@"< 0.2.3" "This module has been renamed to @newsteam/babel-preset"
npm deprecate @sweetlikepete/babel@"< 0.2.3" "This module has been renamed to @newsteam/babel"
npm deprecate @tamland/eslint-config@"< 0.2.3" "This module has been renamed to @newsteam/eslint-config"
npm deprecate @tamland/eslint@"< 0.2.3" "This module has been renamed to @newsteam/eslint"
npm deprecate @sweetlikepete/eslint-config@"< 0.2.3" "This module has been renamed to @newsteam/eslint-config"
npm deprecate @sweetlikepete/eslint@"< 0.2.3" "This module has been renamed to @newsteam/eslint"
npm deprecate @tamland/postcss-config@"< 0.2.3" "This module has been renamed to @newsteam/postcss-config"
npm deprecate @tamland/stylelint-config@"< 0.2.3" "This module has been renamed to @newsteam/stylelint-config"
npm deprecate @tamland/stylelint@"< 0.2.3" "This module has been renamed to @newsteam/stylelint"
npm deprecate @sweetlikepete/stylelint-config@"< 0.2.3" "This module has been renamed to @newsteam/stylelint-config"
npm deprecate @sweetlikepete/stylelint@"< 0.2.3" "This module has been renamed to @newsteam/stylelint"
npm deprecate @tamland/imagemin@"< 0.2.3" "This module has been renamed to @newsteam/imagemin"
npm deprecate @tamland/logger@"< 0.2.3" "This module has been renamed to @newsteam/legacy-cli-logger"
npm deprecate @sweetlikepete/logger@"< 0.2.3" "This module has been renamed to @newsteam/legacy-cli-logger"

# update all published packages

cd ~/code/newsteam/packages/jasmine                 && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/babel-preset            && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/babel                   && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/eslint-config           && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/eslint                  && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/postcss-config          && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/stylelint-config        && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/stylelint               && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/imagemin                && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test

# publish all published packages

cd ~/code/newsteam/packages/jasmine                 && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/babel-preset            && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/babel                   && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/eslint-config           && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/eslint                  && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/postcss-config          && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/stylelint-config        && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/stylelint               && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish &&
cd ~/code/newsteam/packages/imagemin                && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm version patch && npm publish

# update all unpublished packages

cd ~/code/newsteam/packages/legacy-service-worker   && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/legacy-settings         && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/legacy-cli-errors       && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/cli-notify              && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/npm-install-local       && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run test &&
cd ~/code/newsteam/packages/package-json            && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/schema                  && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/legacy-cli-logger       && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/cli-utils               && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/cli-tasks               && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/legacy-cli-config       && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/legacy-webpack-config   && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test &&
cd ~/code/newsteam/packages/legacy-cli              && rm -rf node_modules && rm -f package-lock.json && npm run update && npm install && npm run npm-install-local && npm run test

