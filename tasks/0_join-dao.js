
const { task, types } = require("hardhat/config")
const ethers = require("ethers")
const util = require("util")
const request = util.promisify(require("request"))

task("join-dao", "Join the Data DAO as a member")
    .addParam("nftcontract", "The address of the DealRewarder contract")
    .addParam("daocontract", "The address of the DealRewarder contract")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({nftcontract, daocontract}, { ethers }) => {
    

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
    
        async function callRpc(method, params) {
            var options = {
              method: "POST",
              url: "https://api.calibration.node.glif.io/rpc/v1",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                jsonrpc: "2.0",
                method: method,
                params: params,
                id: 1,
              }),
            };
            const res = await request(options);
            return JSON.parse(res.body).result;
          }
    
        const OnHealthNFT = await ethers.getContractFactory("OnHealthNFT")
        console.log("Hello", signer.address)
        const OnHealthNFTContract = new ethers.Contract(nftcontract, OnHealthNFT.interface, signer)
        
        console.log("Minting Membership NFT ...");

        await OnHealthNFTContract.mint(signer.address, {
          gasLimit: 1000000000,
          maxPriorityFeePerGas: priorityFee
        })

        const OnHealthDataDAO = await ethers.getContractFactory("OnHealthDataDAO")
        const OnHealthDataDAOContract = new ethers.Contract(daocontract, OnHealthDataDAO.interface, signer)

        await OnHealthDataDAOContract.joinDAO({
            gasLimit: 1000000000,
            maxPriorityFeePerGas: priorityFee
        })
        
        console.log(signer.address, " joined the Data DAO");

    })