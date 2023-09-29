require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("./tasks/deploy") // Your deploy task.
require("./tasks/0_join-dao")
require("./tasks/1_create-deal")
require("./tasks/2_approve-deal")
require("./tasks/3_activate-deal")
require("./tasks/4_collect-reward")
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "calibrationnet",
    networks: {
        calibrationnet: {
            chainId: 314159,
            url: "https://api.calibration.node.glif.io/rpc/v1",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
    },
    paths: {
        sources: "./contracts/",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
}