const path = require('path');
const fs = require('fs');
const solc = require('solc');
const helloPath = path.resolve(__dirname, 'Votacion.sol');
const source = fs.readFileSync(helloPath, 'UTF-8');
module.exports = solc.compile(source, 1).contracts[':Votacion'];