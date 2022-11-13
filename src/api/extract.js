import Web3 from "web3";

let INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
let provider = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
let web3Provider = new Web3.providers.HttpProvider(provider);
let web3 = new Web3(web3Provider);

async function getLatestBlock() {
    let block = await web3.eth.getBlock("latest");

    return block;
}

async function getBlock(blockNum) {
    let block = await web3.eth.getBlock(parseInt(blockNum));

    return block;
}

async function parseTxs(txs) {
    let txsList = [];

    for (let i = 0; i <= 10; i++) {
        let data = await web3.eth.getTransaction(txs[i]);
        txsList.push(data);
    }

    return txsList;
}

async function printTxs() {
    let block = await getBlock(15930277);
    console.log(block);
}

export { getBlock, getLatestBlock, parseTxs, web3 };
