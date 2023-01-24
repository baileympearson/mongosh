#!/usr/bin/env bash
set -e
set -x

# setup
node scripts/replace-package.js 
npm run bootstrap -- --no-ci 

npm run compile-ts -- --scope=$SCOPE
npm run test-ci-nocoverage -- --scope=$SCOPE