const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');
const config = require('./config');

async function deploy() {
  const provider = new HDWalletProvider(
    config.ethereum.mnemo,
    config.ethereum.rinkebyUrl
  );
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();
  console.log('Trying to deploy using account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + bytecode, arguments: ['Initial Message'] })
    .send({ from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
}

deploy();
