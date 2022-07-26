const { Alchemy } = require("alchemy-sdk");

const alchemy = new Alchemy();

alchemy.ws.on(
    {
        method: 'alchemy_pendingTransactions'
    }, res => console.log(res)
);

alchemy.ws.once({
    method: "alchem_pendingTransactions",
    toAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
}, res => console.log(res));

// alchemy.ws.removeAllListeners();