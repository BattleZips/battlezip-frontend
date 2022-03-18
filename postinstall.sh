#!/bin/bash
# Remove old minified bundles
rm public/snarkjs.min.js public/circomlibjs.min.js
# Generate new SnarkJS minified bundle
cd node_modules/snarkjs
yarn && yarn buildiifemin
cd ..
# generate new circomlibjs minified bundle
# @notice uses custom fork @ github.com/jp4g/circomlibjs#browser-compatibility until fix pushed
cd circomlibjs
yarn && yarn build:min
cd ../..
# Copy new bundles to public/
cp node_modules/snarkjs/build/snarkjs.min.js public/
cp node_modules/circomlibjs/build/circomlibjs.min.js public/
echo COMPLETE
