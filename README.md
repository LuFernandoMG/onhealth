# The OnHealthDAO

## Core Idea

OnHealth wants to be a decentralised organisation that allows patients to have verified access to the medicines that they need no matter where they are, giving more accessible access to doctors and drug stores to attend to people worldwide and creating, in the process, a verified and open dataset that can give priceless value to researchers.

In essence, OnHealth is a Data DAO (Decentralized Autonomous Organisation) that is composed of Doctors, pharmaceutical companies, Medical centres, Medical Colleges and research centres worldwide, which generate and store medical recipes and encrypted medical records, allowing the recipes to be verified and updated worldwide, making the medicine acquisition process easier to everyone around the world, granting critical information to public institutions and pharmaceutical companies about consumption behaviour and also creating in the process a structured dataset that can be useful for researchers.

In technical terms, the following users should have a participation token and voting rights on the DAO:

- Pharmaceutical Companies
- Pharmaceutical Retailers
- Medical Staff
- Medical Researchers
- Public Institutions related to Health

In the contract, we have three main functions:

- The ability to create medical recipes that should be related to an encrypted medical record by the Medical Staff that should be stored on the Filecoin ecosystem.
- The capability of Pharmaceutical retailers to read and update medical recipes so we can track which medicines have been provided and when.
- Read permissions for the Medical Researchers and the Public Institutions and Pharmaceutical Companies to this data and to obtain insights from it.

All of this, with the classic possibility of deciding changes on the main structure and purpose of the DAO by votation for the members, which is inherited in this kind of organisation.

## Functionality and possible customization

The deal is tracked by the following deal states

    - Proposed
    - Passed 
    - Rejected   
    - Active        
    - Expired
    
> Add a user

This function assigns the role to the user that is being added to the DAO, the rules to and right to add the user can be customized in the implementation contract
  
> Create a new deal proposal

This function is used to create a new deal, the restrictions on who can create a deal can be fully customized in the implementation contract.

> Approve or Reject the proposal

This function is responsible to set the state of the deal to Passed or Rejected. A simple voiting mechanism can be implemented to decide the fate of the deal.

> Activate the deal

The function seeks verification from the contract on the storage provider's claim that the deal was created on Filecoin Network and the data is being stored. 

> Reward

This function can be found inside the DataDAOCore.sol file, and is responsible to send $FIL to the storage provider. The districution of the $FIL and the time of release of the funds can be customized in the implementation contract.

## Deployment
This current example allows you to deploy the initial version of this DataDAO on Calibration Testnet, to do this, you should clone and create a .env file, in which you should define a PRIVATE_KEY with the private key of your FIL wallet that has funds in the Calibration network.

After this, install all the required dependencies and compile the contracts with ```npx hardhat compile``` once the compilation has been completed, you should start the deployment with ```npx hardhat deploy```.

This should start the whole process of deploy the OnHealthNFT contract (that works as the membership token for the DAO) and also the OnHealthNFTDataDAO contract itself with the basic functionality.

## Data DAO Example Contract
A simple DataDAOExample in this case named "OnHealthDataDAO" contract allows the admins to act as the censor board for the data that is stored via the Data DAO. The users with the Data DAO membership NFT can join the Data DAO as a member and would be able to create proposal to store their data.

Once the deal proposal is created by a member and $FIL are locked inside the contract, the admins would either approve or reject the proposal. If the deal proposal is rejected, the member gets back the locked $FIL else the deal is taken forward to storage provider. The storage provider would store the data generate the proof and provide the deal ID to the DataDAO. The DataDAO contract will check with the Filecoin storage market to confirm whether the supplied deal ID is activated and stores the claimed data. Once the deal is expired, the Data DAO will pay the storage provider.


