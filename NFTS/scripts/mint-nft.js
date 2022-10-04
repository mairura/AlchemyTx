require("dotenv").config();
const ethers = require("ethers");
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

//Get ALchemy Keys
const API_KEY = process.env.API_KEY;

//Define n ALchemy Provider
const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY);

//ABI
// console.log(JSON.stringify(contract.abi));

//Get a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

//Get contract ABI and Address
const abi = contract.abi;
const contractAddress = "0x54Aa7a06Dc99960042D11FD55Eb3d5bA180e5550";

//Create a contract instance
const myNFTContract = new ethers.Contract(contractAddress, abi, signer);

//Get the Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYMG3EuYhmFQhnTSaD7azm4A3d7Kowt4qqwc6nEDXFP7E";

//Call the mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNFTContract.mintNFT(signer.address, tokenUri);
    await nftTxn.wait();
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}
mintNFT().then(() => process.exit(0)).catch((error) => {
    console.error(error.message);
    process.exit(1);
})