import Web3 from "web3";

// let INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
// let provider = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
let provider = "https://mainnet.infura.io/v3/1175108411a040bcbc6a3d41137b98a7";
let web3Provider = new Web3.providers.HttpProvider(provider);
let web3 = new Web3(web3Provider);

async function getLatestBlock() {
    let block = await web3.eth.getBlock("latest");

    return block;
}

async function getBlock(blockNum) {
    let records = [];
    let block = await web3.eth.getBlock(blockNum);

    return block;
}

async function parseTxs(block) {
    let txsList = [];

    for (let i = 0; i <= 5; i++) {
        let txs = await web3.eth.getTransaction(block["transactions"][i]);
        txsList.push(txs);
    }

    return txsList;
}

async function printTxs() {
    let block = await getBlock();
    const txs = await parseTxs(block);
    console.log(txs);
}

export { getBlock, getLatestBlock, parseTxs };
