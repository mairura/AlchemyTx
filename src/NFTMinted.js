//Fetch all ERC-721 and ERC-1155 minted by a given address over any period
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require("dotenv").config();
//Get your API
// const apiKey = process.env.ALCHEMY_API_KEY;

//Address we want to get NFT mints from 
const toAddress = "0x5c43B1eD97e52d009611D89b74fA829FE4ac56b1";

//Initialize alchemy-web3 instance
const web3 = createAlchemyWeb3(process.env.API_KEY);

const response = async () => {
    const res = await web3.alchemy.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        toAddress: toAddress,
        exculudeZeroValue: true,
        category: ["erc721", "erc1155"]
    });
    // console.log(res.transfers);

    // Print contract address anf tokenId for each NFT
    for(const events of res.transfers) {
        if(events.erc1155Metadata == null){
            console.log("ERC-721 Token Minted ID-", events.tokenId, "Contract-", events.rawContract.address);
        }else{
            for(const erc1155 of events.erc1155Metadata) {
                console.log("ERC-1155 Token Minted ID- ", erc1155.tokenId, "Contract-", events.rawContract.address)
            }
        }
    }
}

response();


