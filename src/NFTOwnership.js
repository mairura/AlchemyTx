//Tracking owneship of an NFT
const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
require("dotenv").config();

const web3 = require("web3");
//API
const settings = {
    apiKey: process.env.API_KEY,
};

//Initialize
const alchemy = initializeAlchemy(settings.apiKey);

const main = async () => {
    //Contract Address
    const address = ['0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'];

    //Get all NFTs
    const response = await getAssetTransfers(alchemy, {
        fromBlock: "0x0",
        contractAddresses: address,
        category: ["erc721"],
        excludeZeroValue: false
    });
    // console.log(response);

    const nftId = 3;
    //Get transactions for the NFT
    txns = response['transfers'].filter(txn => web3.utils.hexToNumber(txn['erc721TokenId']) === nftId);
    console.log(txns);
}

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
};

runMain();