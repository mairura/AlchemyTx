const getFirstTransfer = async () => {
    const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
    //Initialize
    const alchemy = initializeAlchemy();

    const getTransfers = getAssetTransfers(alchemy, {
        fromBlock: "0x0",
        contractAddress: ["0xfe9938d3A0a888A07B9820AC5d68dddEf5c03cC7"],
        excludeZeroValue: true,
        category: ["erc20"]
    });

    const allTransfers = await getTransfers;

    console.log("First Transfers: ")
    console.log(allTransfers.transfers[0]);
}

getFirstTransfer();