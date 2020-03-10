#!/usr/bin/env bash

set -e

function build {
    babel src --ignore '**/*.d.ts,src/cli,**/node_modules' --out-dir lib --extensions '.js,.jsx,.ts,.tsx'
}

# Clean the lib directory
rm -rf lib &&
echo 'cleaned lib directory'

# Build all .js and .ts code into the lib directory
export BUILD_MJS=1
build &&

# Make .mjs versions of the .js files in the lib directory
renamer --find js --replace mjs "lib/**" &&
echo 'generated .mjs assets'

# Make .js files in the lib directory again because the old ones are now .mjs
export BUILD_MJS=0
build &&
echo 'generated .js assets'

# Generate cli assets
if [ -d "./src/cli" ]; then
    export BUILD_SHEBANG=1
    babel src/cli --out-dir lib/cli --extensions '.js,.jsx,.ts,.tsx'
    echo 'generated cli assets'
fi

# Copy static assets
if [ -d "./src/static" ]; then
    rsync -rv --include '*/' --include '*.*' --exclude '*' --prune-empty-dirs src/static lib &&
    echo 'copied static assets'
fi

# Copy scss assets
rsync -rv --include '*/' --include '*.scss' --exclude '*' --prune-empty-dirs src/ lib/ &&
echo 'copied scss assets'

# Copy js assets
rsync -rv --include '*/' --include '*.js' --exclude '*' --prune-empty-dirs src/ lib/ &&
echo 'copied js assets'

# Copy json assets
rsync -rv --include '*/' --include '*.json' --exclude '*' --prune-empty-dirs src/ lib/ &&
echo 'copied json assets'

# Generate typescript declarations
tsc --emitDeclarationOnly
echo 'generated .d.ts assets'

# Copy typescript declarations
rsync -rv --include '*/' --include '*.d.ts' --exclude '*' --prune-empty-dirs src/ lib/ &&
echo 'copied typescript d.ts assets'
