#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Run the tests (this also runs the build)
bash "$DIR/test.sh" &&

# Removed the test artifacts from the lib directory
rm lib/**/*.test.js lib/**/*.test.mjs lib/**/*.test.d.ts lib/*.test.js lib/*.test.mjs lib/*.test.d.ts || true