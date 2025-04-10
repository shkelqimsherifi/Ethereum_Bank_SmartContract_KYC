# Ethereum Bank Smart Contract with KYC System

This project implements a decentralized banking system on the Ethereum blockchain, integrating Know Your Customer (KYC) functionality. The system is designed to manage banks, customers, and user accounts while ensuring secure and efficient transactions. The smart contract is written in Solidity and includes features such as gas consumption tracking, transaction speed monitoring, and KYC compliance.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Smart Contract Explanation](#smart-contract-explanation)
4. [System Architecture](#system-architecture)
5. [Diagrams](#diagrams)
6. [Performance Analysis](#performance-analysis)
7. [How to Use](#how-to-use)
8. [Visualizations](#visualizations)
9. [User Interface (UI) Walkthrough](#user-interface-ui-walkthrough)
10. [License](#license)

---

## Overview

The **Ethereum Bank Smart Contract with KYC** is a decentralized application (dApp) that allows:
- Central banks to manage commercial banks.
- Commercial banks to manage customer accounts and perform KYC.
- Users to register, deposit, and withdraw funds securely.

The system ensures transparency and security by leveraging blockchain technology and includes detailed performance metrics for gas usage, transaction speed, and network fees.

---

## Features

- **Central Bank Functions**:
  - Add and manage commercial banks.
  - Grant or revoke KYC privileges.
  - Allow or block customer addition by banks.

- **Commercial Bank Functions**:
  - Add customers and perform KYC.
  - Retrieve customer data and KYC status.

- **User Functions**:
  - Register users with detailed personal information.
  - Deposit and withdraw funds securely.
  - View account balances.

- **Utility Functions**:
  - String comparison and conversion utilities.
  - Fallback and receive functions for handling Ether transfers.

---

## Smart Contract Explanation

The core of the system is the `Bank_main.sol` smart contract, which defines the following key components:

### 1. **Structs**
- **Bank**: Represents a commercial bank with attributes like name, balance, KYC privileges, and customer addition permissions.
- **Customer**: Represents a customer with attributes like name, hash of customer data, validated bank, and KYC status.
- **User**: Represents a user with detailed personal information for KYC compliance.

### 2. **Mappings**
- `mapping(address => Bank) public banks`: Stores bank details.
- `mapping(string => Customer) public customersInfo`: Stores customer details.
- `mapping(address => User) private users`: Stores user details.

### 3. **Events**
The contract emits events for key actions, such as:
- `BankAdded`: When a new bank is added.
- `CustomerAdded`: When a new customer is added.
- `KYCCompleted`: When KYC is completed for a customer.
- `Deposit` and `Withdrawal`: For user transactions.
- `GasConsumption` and `ElapsedTime`: For performance tracking.

### 4. **Example Code Snippet**
Below is an example of the `addBank` function, which allows the central bank to add a new commercial bank:

```solidity
function addBank(string memory bankName, uint amount, address bankAddress) public onlyOwner {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(bankAddress != address(0), "Bank address cannot be zero address");
    require(!areStringSame(banks[bankAddress].name, bankName), "A Bank already exists with the same name");
    banks[bankAddress] = Bank(bankName, amount, bankAddress, true, true);
    emit BankAdded(bankName, amount, bankAddress);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);
}
```

```solidity
struct UserRegistrationData {
    string firstName;
    string middleName;
    string lastName;
    string dob;
    string email;
    string phone;
    string maritalStatus;
    string address_;
    string city;
    string state;
    string country;
    string zip;
    string nationality;
    string occupation;
    string employmentStatus;
    uint annualIncome;
    string idType;
    string idNumber;
    string idExpiry;
}

function registerUser(UserRegistrationData memory data) public onlyOnce {
    require(bytes(data.firstName).length > 0, "First name is required");
    require(bytes(data.lastName).length > 0, "Last name is required");
    require(bytes(data.dob).length > 0, "Date of birth is required");
    require(bytes(data.email).length > 0, "Email is required");
    require(bytes(data.phone).length > 0, "Phone number is required");
    require(bytes(data.address_).length > 0, "Address is required");
    require(bytes(data.city).length > 0, "City is required");
    require(bytes(data.state).length > 0, "State is required");
    require(bytes(data.country).length > 0, "Country is required");
    require(bytes(data.zip).length > 0, "ZIP code is required");
    require(bytes(data.idType).length > 0, "ID type is required");
    require(bytes(data.idNumber).length > 0, "ID number is required");

    users[msg.sender] = User(
        data.firstName,
        data.middleName,
        data.lastName,
        data.dob,
        data.email,
        data.phone,
        data.maritalStatus,
        data.address_,
        data.city,
        data.state,
        data.country,
        data.zip,
        data.nationality,
        data.occupation,
        data.employmentStatus,
        data.annualIncome,
        data.idType,
        data.idNumber,
        data.idExpiry
    );

    emit UserRegistered(msg.sender);
}

function getUser(address _userAddress) public view returns (User memory) {
    require(_userAddress != address(0), "Invalid address");
    require(bytes(users[_userAddress].firstName).length > 0, "User does not exist");
    return users[_userAddress];
}
```

```solidity
function grantKYCPrivilege(address bankAddress) public onlyOwner {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(banks[bankAddress].bankAddress != address(0), "Bank not found");
    banks[bankAddress].kycPrivilege = true;
    emit KYCPrivilegeGranted(bankAddress);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);
}

function revokeKYCPrivilege(address bankAddress) public onlyOwner {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(banks[bankAddress].bankAddress != address(0), "Bank not found");
    banks[bankAddress].kycPrivilege = false;
    emit KYCPrivilegeRevoked(bankAddress);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);
}
```

```solidity
function addCustomer(string memory custName, bytes32 custData) public {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(bytes(custName).length > 0, "Customer name cannot be empty");
    require(custData != 0, "Customer data cannot be zero");
    require(banks[msg.sender].isAllowedToAddCustomer, "Requested Bank is blocked to add new customers");
    require(customersInfo[custName].validatedBank == address(0), "Requested Customer already exists");
    customersInfo[custName] = Customer(custName, custData, msg.sender, false);
    emit CustomerAdded(custName, custData, msg.sender);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);
}

function completeKYC(string memory custName) public {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(banks[msg.sender].kycPrivilege, "Requested Bank does not have KYC Privilege");
    require(customersInfo[custName].validatedBank != address(0), "Requested Customer not found");
    customersInfo[custName].isKYCCompleted = true;
    emit KYCCompleted(custName, msg.sender);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);
}
```

```solidity
function deposit() public payable returns (bool) {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(msg.value > 10 wei, "Please deposit at least 10 wei");

    userbalance[msg.sender] += msg.value;
    emit Deposit(msg.sender, msg.value);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);

    return true;
}

function withdraw(uint256 _amount) public nonReentrant payable returns (bool) {
    uint256 startGas = gasleft();
    uint256 startTime = block.timestamp;

    require(_amount <= userbalance[msg.sender], "You do not have sufficient balance");
    userbalance[msg.sender] -= _amount;
    payable(msg.sender).transfer(_amount);
    emit Withdrawal(msg.sender, _amount);

    uint256 gasUsed = startGas - gasleft();
    uint256 timeTaken = block.timestamp - startTime;
    emit GasConsumption(gasUsed);
    emit ElapsedTime(timeTaken);

    return true;
}
```

---

## System Architecture

The system is divided into three main layers:

1. **Central Bank**:
   - Acts as the administrator.
   - Manages commercial banks and their permissions.

2. **Commercial Banks**:
   - Manage customer accounts.
   - Perform KYC and validate customer data.

3. **Users**:
   - Register with personal details.
   - Deposit and withdraw funds.

The contract ensures that only authorized entities can perform specific actions, using modifiers like `onlyOwner` and `nonReentrant`.

---

## Diagrams

This section provides an overview of the diagrams used in the project to explain the blockchain structure, system architecture, and other key concepts.

### 1. **Block Structure in Blockchain**
![Block Structure in Blockchain](Util/Diagrams/block_structure_blockchain(2).png)
- **Description**: This diagram illustrates the structure of a block in the blockchain. It includes components such as the block header, transactions, and metadata. The block header contains the hash of the previous block, ensuring the immutability of the blockchain.

### 2. **Traditional KYC Process**
![Traditional KYC Process](Util/Diagrams/TraditionalKYCProcess.png)
- **Description**: This diagram illustrates traditiona KYC process.

### 3. **Web Based KYC Process**
![Traditional KYC Process](Util/Diagrams/WebBasedKYCProcess.png)
- **Description**: This diagram illustrates web base KYC process.

### 4. **Non Blockchain KYC Process**
![Traditional KYC Process](Util/Diagrams/NonBlockchainBasedKYCProcess.png)
- **Description**: This diagram illustrates Non Blockchain KYC process.

### 5. **Blockchain KYC Process**
![Traditional KYC Process](Util/Diagrams/BlockchainBasedKYCProcess.png)
- **Description**: This diagram illustrates Blockchain KYC process.

### 6. **Blockchain Based Bank DAPP**
![Traditional KYC Process](Util/Diagrams/BlockchainBasedBankDAPP.png)
- **Description**: This diagram illustrates Blockchain Base Bank DAPP.

### 7. **Blockchain Based Bank DAPP Sequential Diagram**
![Traditional KYC Process](Util/Diagrams/BlockchainBasedBankDAPPSequentialDiagram.png)
- **Description**: This diagram illustrates Blockchain Base Bank DAPP Sequential Diagram .
---

## Performance Analysis

The system tracks performance metrics such as:
- **Gas Usage**: The amount of gas consumed for each operation.
- **Transaction Speed**: The time taken to execute each transaction.
- **Network Fees**: The cost of executing transactions on the Ethereum network.

### Example Visualizations
Below are some visualizations generated using the data from the smart contract:

#### 1. Average Gas Usage
![Average Gas Usage](Util/avg_gas_usage.png)

#### 2. Average Network Fee
![Average Network Fee](Util/avg_network_fee.png)

#### 3. Average Transaction Speed
![Average Transaction Speed](Util/avg_transaction_speed.png)

#### 4. Function-Specific Gas Usage
![Function Gas Usage](Util/function_gas_usage.png)

#### 5. Function-Specific Network Fee
![Function Network Fee](Util/function_network_fee.png)

#### 6. Function-Specific Transaction Speed
![Function Transaction Speed](Util/function_transaction_speed.png)

---

## How to Use

1. **Deploy the Contract**:
   - Use a tool like Remix or Hardhat to deploy the `Bank_main.sol` contract on an Ethereum-compatible blockchain.

2. **Interact with the Contract**:
   - Use the provided functions to add banks, register users, and perform transactions.

3. **Analyze Performance**:
   - Use the data emitted by the contract to analyze gas usage, transaction speed, and network fees.

---

## Visualizations

The `Util/Plots.py` script generates performance visualizations using `matplotlib`. The script processes data from the smart contract and creates plots for metrics like gas usage, transaction speed, and network fees.

---

## User Interface (UI) Walkthrough

The following images provide a step-by-step walkthrough of the user interface for the Ethereum Bank Smart Contract with KYC system. These images demonstrate how users, banks, and administrators interact with the system.

### 1. **Home Page**

![Home Page](Util/homeLoginPage.png)
![Home Page](Util/executingTransaction.png)
![Home Page](Util/transactionActivityGetData.png)
![Home Page](Util/transactionActivity.png)
![Home Page](Util/transactionSucceed.png)
![Home Page](Util/transactionFailNotEnoughFundForNetworkFee.png)
![Home Page](Util/transactionFailNotEnoughFundForNetworkFeeNotification.png)

### 1. **Central Bank Dashboard**
The Central Bank page displays a form to add commercial banks and includes functionalities such as granting KKYC privileges, allowing customer addition, revoking KYC privileges, and blocking customer addition.

![Central Bank Dashboard](Util/2.png)

---

### 2. **Get Bank Data**
The "Get Bank Data" page is linked to a function that retrieves data about registered commercial banks based on the address of the bank.

![Get Bank Data](Util/1.png)

---

### 3. **Comercial Bank Dashboard**
The bank dashboard allows commercial banks to manage their accounts, add customers, and perform KYC operations.

![Comercial Bank Dashboard](Util/3.png)

---

### 4. **Get KYC Data and Customer Data**
This form allows the retrieval of KYC data by providing the user's address. The subsequent form, by specifying the customer's name, enables the acquisition of customer data.

![Get KYC Data](Util/4.png)

---

### 5. **Add Personal KYC Data**
This form specifies the necessary fields to add customer personal KYC data.

![KYC Data](Util/5.png)

---

### 6. **Add Address KYC Data**
This form specifies the necessary fields to add customer address KYC data.

![KYC Data](Util/6.png)

---

### 7. **Add Additional KYC Data**
This form specifies the necessary fields to add customer additional KYC data.

![KYC Data](Util/7.png)

---

### 8. **Add Identification KYC Data**
This form specifies the necessary fields to add customer identification KYC data.

![KYC Data](Util/8.png)

---

### 9. **Get KYC Data**
This form allows the retrieval of KYC data by providing the user's address.

![KYC Data](Util/9.png)

---

These images demonstrate the functionality and usability of the Ethereum Bank Smart Contract with KYC system. The UI is designed to be user-friendly and secure, ensuring a seamless experience for all participants.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

Special thanks to the Ethereum community for providing resources and tools to build decentralized applications.

