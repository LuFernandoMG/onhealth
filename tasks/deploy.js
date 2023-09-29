require("dotenv").config();
const { task, types } = require("hardhat/config");
const ethers = require("ethers");
const util = require("util");
const request = util.promisify(require("request"));
const DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY;

task("deploy:onHealthNFT", "Deploy OnHealth NFT Contract")
  .addOptionalParam("logs", "Print the logs", true, types.boolean)
  .setAction(async ({ logs }, { ethers }) => {
    console.log("Deploying OnHealth NFT Contract");

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas");

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

    const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
    console.log("Deployer's Address : ", deployer.address);

    const onHealthNFT = await ethers.getContractFactory("OnHealthNFT");

    const onHealthNFTContract = await onHealthNFT.deploy({
      gasLimit: 1000000000,
      maxPriorityFeePerGas: priorityFee,
    });

    await onHealthNFTContract.deployed();

    if (logs) {
      console.info(
        `OnHealthNFT contract has been deployed to: ${onHealthNFTContract.address}`
      );
    }

    return onHealthNFTContract;
  });

task("deploy", "Deploy DataDAO contract")
  .addOptionalParam("admins", "List of Admins separated by comma(,)")
  .addOptionalParam(
    "onhealthnftaddress",
    "OnHealth NFT contract address",
    undefined,
    types.string
  )
  .addOptionalParam("logs", "Print the logs", true, types.boolean)
  .setAction(async ({ admins, onhealthnftaddress, logs }, { ethers }) => {
    const priorityFee = await callRpc("eth_maxPriorityFeePerGas");

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

    const deployer = new ethers.Wallet(DEPLOYER_PRIVATE_KEY);
    var adminsList = [];
    let accounts = [deployer.address];

    for (let i = 0; i < accounts.length; i++) {
      adminsList.push(accounts[i]);
    }
    console.log("Deployer's Address : ", deployer.address);

    if (!onhealthnftaddress) {
      var { address: onhealthnftaddress } = await run("deploy:onHealthNFT", {
        logs,
      });
      onhealthnftaddress = onhealthnftaddress;
    }

    console.log("Deploying DataDAO Contract");

    const onHealthDataDAO = await ethers.getContractFactory("OnHealthDataDAO");
    console.log('adminsList ', adminsList)
    console.log('onhealthnftaddress ', onhealthnftaddress)
    const onHealthDataDAOContract = await onHealthDataDAO.deploy(
      adminsList,
      onhealthnftaddress,
      {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee,
      }
    );

    await onHealthDataDAOContract.deployed();

    if (logs) {
      console.info(
        `DataDAO contract has been deployed to: ${onHealthDataDAOContract.address}`
      );
    }

    return onHealthDataDAOContract;
  });
