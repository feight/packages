#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Run the build
bash "$DIR/build.sh" &&

# Lint the code
if hash eslint 2>/dev/null; then
    echo 'running eslint'
    eslint src --ext .jsx,.js,.tsx,.ts --ignore-pattern *.d.ts --fix
else
    echo 'eslint is not installed'
fi

# Run the jasmine tests
if hash jasmine 2>/dev/null; then
    jasmine --config=jasmine.json --reporter=jasmine-console-reporter
else
    echo 'jasmine is not installed'
fi
