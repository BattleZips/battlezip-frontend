#!/bin/bash
sed -i'' 's/import ethers/import { ethers }/g' ./node_modules/circomlibjs/src/evmasm.js
sed -i'' 's/import ethers/import { ethers }/g' ./node_modules/circomlibjs/src/mimcsponge.js
sed -i'' 's/import ethers/import { ethers }/g' ./node_modules/circomlibjs/src/mimc7_gencontract.js
sed -i'' 's/import ethers/import { ethers }/g' ./node_modules/circomlibjs/src/poseidon_gencontract.js
sed -i'' 's/import ethers/import { ethers }/g' ./node_modules/circomlibjs/src/mimcsponge_gencontract.js
sed -i'' 's/import ethers/import { ethers }/g' ./node_modules/circomlibjs/src/mimc7.js