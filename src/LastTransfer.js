const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");

const alchemy = initializeAlchemy();

const getTransfers = getAssetTransfers(alchemy, {
    fromBlock: "0x0",
    toBlock: "latest",
    contractAddress: ["0xfe9938d3A0a888A07B9820AC5d68dddEf5c03cC7"],
    excludeZeroValue: true,
    category: ["erc721"]
});
//Getting all transfers
const historyTransfers = async () => {
    const firstPage = await getTransfers;

    //Getting the length of trasfers
    const firstPageLength = firstPage.transfers.length;
    //Printing the last transfer
    console.log(firstPage.transfers[firstPageLength - 1]);

    let pageKey = firstPage.pageKey;
    if(pageKey) {
        console.log("Page Key: " + pageKey);
    }else{
        console.log("Page Key: none");
    }
}

historyTransfers();
