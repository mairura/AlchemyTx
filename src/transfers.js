const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

require("dotenv").config();

//Get instance of ALchemy Api key
const web3 = createAlchemyWeb3(process.env.API_KEY);
//Current blockNumber
const block = async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    // console.log(blockNumber);

    //Want 20 tx before
    const currentBlockNumber = blockNumber - 100;
    // console.log(currentBlockNumber );

    //Convert to hex
    const convert = currentBlockNumber.toString(16);
    // console.log(convert);

    const txData = await web3.alchemy.getAssetTransfers({
        fromBlock: `0x${convert}`,
        toBlock: blockNumber, 
        fromAddress: "0x4976a4a02f38326660d17bf34b431dc6e2eb2327", //Tx originating from an address
        // toAddress: "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1", //Receipt based tx
        category: ['external'],
        maxCount: 10
    })
    console.log(txData);

    for(const events of txData.transfers) {
        console.log("Token Transfer: ", events.value, " ", events.asset);
    }

}
block();


