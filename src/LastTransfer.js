//Getting all transfers
const historyTransfers = async () => {
    const { initializeAlchemy, getAssetTransfers } = require("@alch/alchemy-sdk");
    // const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

    const alchemy = initializeAlchemy();

    const getTransfers = getAssetTransfers(alchemy, {
        fromBlock: "0x0",
        toBlock: "latest",
        contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
        excludeZeroValue: true,
        category: ["erc721"]
    });
    //Pagekey represents the available results unpon response - how many responses are available
    const firstPage = await getTransfers;
    let pageKey = firstPage.pageKey;
    try{
        if(pageKey) {
            let counter = 0;
            while(pageKey) {
                const nextKey = getAssetTransfers(alchemy, {
                    fromBlock: "0x0",
                    toBlock: "latest",
                    contractAddresses: ["0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"],
                    excludeZeroValue: true,
                    category: ["erc721"],
                    pageKey: pageKey.toString(),
                });
                const nextPage = await nextKey;
                pageKey = nextPage.pageKey;
                if(pageKey) {
                    counter += 1;
                    console.log("Request #" + counter + " made!");
                    continue;
                }else{
                    const nextPageLength = nextPage.transfers.length;
                    const transferCount = counter * 1000 + nextPageLength;
                    console.log(transferCount);
                    console.log("Last BAYC token transfer(#" + transferCount + "):");
                    console.log(nextPage.transfers[nextPageLength - 1]);
                    break;
                }
            }
        }else if(pageKey === undefined){
            const firstPageLength = firstPage.transfers.length;
            console.log(firstPage.transfers[firstPageLength - 1])
        }
    }catch(err){
        console.log("Something went wrong. Try Again!", + err);
    }
}

historyTransfers();
