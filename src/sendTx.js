async function main() {
    require("dotenv").config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = "0x3db7B2413ae63E7e2D1a462119787C3aa3c0459e";

    const nonce = await web3.eth.getTransactionCount(myAddress, "latest");
    console.log(nonce);

    const transaction = {
        'to': '0x31B98D14007bDEe637298086988A0bBd31184523',
        'value': 10,
        'gas': 30000,
        'maxPriorityFeePerGas': 1000000108,
        'nonce': nonce,
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if(!error) {
            console.log(" 🎈 The hash of your transaction is: ", hash, "\n Check Alchemy Mempool to view status of transaction🙂 ");
        }else{
            console.log("SOmething went wrong..Try again🧂 ")
        }
    })
}

main();