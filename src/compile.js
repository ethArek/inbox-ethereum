const fs = require('fs');
const path = require('path');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'inbox.sol' : {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
}; 

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
  abi: compiled.contracts['inbox.sol'].Inbox.abi,
  bytecode: compiled.contracts['inbox.sol'].Inbox.evm.bytecode.object
}