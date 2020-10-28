
# how to update local packages if there is a git change
# note: update path to packages

cd ~/work/packages/legacy-service-worker   && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/legacy-settings         && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/legacy-cli-errors       && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/cli-notify              && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/npm-install-local       && rm -rf node_modules && rm -f package-lock.json && npm install && npm run test &&
cd ~/work/packages/package-json            && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/schema                  && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/legacy-cli-logger       && rm -rf node_modules && rm -f package-lock.json && npm install && npm install justify-text@1.1.1 && npm run npm-install-local && npm run test &&
cd ~/work/packages/cli-utils               && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/cli-tasks               && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/legacy-cli-config       && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/legacy-webpack-config   && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test &&
cd ~/work/packages/legacy-cli              && rm -rf node_modules && rm -f package-lock.json && npm install && npm run npm-install-local && npm run test