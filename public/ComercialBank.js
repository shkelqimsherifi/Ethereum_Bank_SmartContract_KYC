import { encrypt, decrypt } from "./encryption.js";    

// Commercial Bank variables
// var kycCustomerDataInput = document.getElementById('kycCustData');
var loginButton = document.getElementById('connect_to_metamask');
var addCustomerButton = document.getElementById('addCustomerButton');
var completeKYCButton = document.getElementById('completeKYCButton');
var getCustomerDataButton = document.getElementById('getCustomerDataButton');
var showCustomerDataButton = document.getElementById('showCustomerDataButton');
var getCustomerKYCStatusButton = document.getElementById('getCustomerKYCStatusButton');
var getUserKYCButton = document.getElementById('getUserKYCButton');

var ContractABI = 
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "bankName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "addBank",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "custName",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "custData",
				"type": "bytes32"
			}
		],
		"name": "addCustomer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "allowCustomerAddition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "BankAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "blockCustomerAddition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "custName",
				"type": "string"
			}
		],
		"name": "completeKYC",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ContractWithdrawal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "customerHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "CustomerAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "CustomerAdditionAllowed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "CustomerAdditionBlocked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "customerName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "data",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "kycStatus",
				"type": "bool"
			}
		],
		"name": "CustomerDataRetrieved",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timeTaken",
				"type": "uint256"
			}
		],
		"name": "ElapsedTime",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gasUsed",
				"type": "uint256"
			}
		],
		"name": "GasConsumption",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "grantKYCPrivilege",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "customerName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "KYCCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "KYCPrivilegeGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "KYCPrivilegeRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "customerName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "kycStatus",
				"type": "bool"
			}
		],
		"name": "KYCStatusRetrieved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "firstName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "middleName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phone",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "maritalStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "address_",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "zip",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nationality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "occupation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "employmentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "annualIncome",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "idNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "idExpiry",
						"type": "string"
					}
				],
				"internalType": "struct CombinedBankWithKYC.UserRegistrationData",
				"name": "data",
				"type": "tuple"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "revokeKYCPrivilege",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawfundsFromContract",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "banks",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "kycPrivilege",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isAllowedToAddCustomer",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "customersInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "customerHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "validatedBank",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isKYCCompleted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getbalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getcontractbalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "custName",
				"type": "string"
			}
		],
		"name": "getCustomerData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "custName",
				"type": "string"
			}
		],
		"name": "getCustomerKYCStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "firstName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "middleName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "phone",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "maritalStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "address_",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "state",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "zip",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nationality",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "occupation",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "employmentStatus",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "annualIncome",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "idType",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "idNumber",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "idExpiry",
						"type": "string"
					}
				],
				"internalType": "struct CombinedBankWithKYC.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bankAddress",
				"type": "address"
			}
		],
		"name": "showBankData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "custName",
				"type": "string"
			}
		],
		"name": "showCustomerData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "source",
				"type": "string"
			}
		],
		"name": "stringToBytes32",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "result",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];

var ContractAddress = '0xF9481A6331939662C8249360d79A405650Dbe1c1';

var address, web3, myContract;

document.addEventListener('DOMContentLoaded', async () => {

    // Ensure elements exist before adding event listeners

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask successfully detected!')

        var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts);

        web3 = new Web3(window.ethereum);
        console.log("web3 is loaded", web3);

        myContract = new web3.eth.Contract(ContractABI, ContractAddress);
        console.log("Contract is loaded", myContract);

		loginButton.addEventListener('click', async () => {
			var userAddress = document.getElementById('accountaddress');
            var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            address = accounts[0];
            userAddress.innerText = address;
            userAddress.classList.remove('d-none');
            loginButton.classList.add('d-none');
            console.log(accounts);
            console.log(accounts[0]);
        });

        ethereum.on('accountsChanged', async function () {
			var userAddress = document.getElementById('accountaddress');
            var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            address = accounts[0];
            userAddress.innerText = address;
        });

        //Commercial Bank functions
        addCustomerButton.addEventListener('click', () => {
			
			console.log("Started executing addCustomerButton");
			var customerNameInput = document.getElementById('custName');
			var customerDataInput = document.getElementById('custSpecData');
            var customerName = customerNameInput.value;
            var customerData = customerDataInput.value;

            if (!customerName || !customerData) {
                console.error('Customer name and data are required');
                Swal.fire('Error', 'Customer name and data are required', 'error');
                return;
            }


			var customerDataBytes32 = web3.utils.padRight(web3.utils.asciiToHex(customerData), 64);
			var start = performance.now();
			myContract.methods.addCustomer(customerName, customerDataBytes32).send({ from: address })
			.then(res => {
				var end = performance.now();
				var timeTaken = end - start;
				console.log('Customer added successfully');
				console.log(res);
				console.log(`Gas Used: ${res.gasUsed}`);
				console.log(`Time Taken: ${timeTaken} ms`);
				Swal.fire({
					title: 'Customer Added Successfully!',
					html: `
						<p><strong>Transaction Hash:</strong> ${res.transactionHash}</p>
						<p><strong>Gas Used:</strong> ${res.gasUsed}</p>
						<p><strong>Time Taken:</strong> ${timeTaken} ms</p>
						<p><strong>Block Number:</strong> ${res.blockNumber}</p>
					`,
					icon: 'success'
				});
			})
			.catch(err => {
			console.error(err);
			Swal.fire('Error', 'Error adding Customer: ' + err.message, 'error');
			});
		});

        completeKYCButton.addEventListener('click', () => {

			console.log("Started executing completeKYCButton");
			var kycCustomerNameInput = document.getElementById('kycCustName');
            var customerName = kycCustomerNameInput.value;

            if (!customerName) {
                console.error('Customer name is required');
                Swal.fire('Error', 'Customer name is required', 'error');
                return;
            }

			var start = performance.now();
			myContract.methods.completeKYC(customerName).send({ from: address })
			.then(res => {
				var end = performance.now();
				var timeTaken = end - start;
				console.log('KYC completed successfully for customer:', customerName);
				console.log(res);
				console.log(`Gas Used: ${res.gasUsed}`);
				console.log(`Time Taken: ${timeTaken} ms`);
				Swal.fire({
					title: 'KYC Completed Successfully!',
					html: `
						<p><strong>Transaction Hash:</strong> ${res.transactionHash}</p>
						<p><strong>Gas Used:</strong> ${res.gasUsed}</p>
						<p><strong>Time Taken:</strong> ${timeTaken} ms</p>
						<p><strong>Block Number:</strong> ${res.blockNumber}</p>
					`,
					icon: 'success'
				});
			})
			.catch(err => {
				console.error(err);
				Swal.fire('Error', 'Error completing KYC: ' + err.message, 'error');
			});
		});


		/*
        getCustomerDataButton.addEventListener('click', () => {

			console.log("Started executing getCustomerDataButton");
			var kycCustomerNameInput = document.getElementById('customerdata');
            var customerName = kycCustomerNameInput.value;

            if (!customerName) {
                console.error('Customer name is required');
                Swal.fire('Error', 'Customer Completing KYC', 'error');
                return;
            }

			var start = performance.now();
			myContract.methods.getCustomerData(customerName).call({ from: address })
			.then(res => {
				var end = performance.now();
				var timeTaken = end - start;
                var customerHash = res[0];
                var isKYCCompleted = res[1];
				console.log('Get Customer Data executed susuccessfully:');
				console.log(res);
				console.log(`Gas Used: ${res.gasUsed}`);
				console.log(`Time Taken: ${timeTaken} ms`);

                // Display the result in the UI
				var customerData = document.getElementById('customerData');
				var kycStatus = document.getElementById('kycStatus');
                customerData.innerText = `Customer Data: ${customerHash}`;
                kycStatus.innerText = `KYC Status: ${isKYCCompleted ? 'Completed' : 'Not Completed'}`;

				Swal.fire({
					title: 'Customer data retrieved successfully!',
					html: `
						<p><strong>Transaction Hash:</strong> ${res.transactionHash}</p>
						<p><strong>Gas Used:</strong> ${res.gasUsed}</p>
						<p><strong>Time Taken:</strong> ${timeTaken} ms</p>
						<p><strong>Block Number:</strong> ${res.blockNumber}</p>
					`,
					icon: 'success'
				});
			})
			.catch(err => {
				console.error(err);
				Swal.fire('Error', 'Error retrieving customer data: ' + err.message, 'error');
			});
        });
		*/

		/*
        getCustomerKYCStatusButton.addEventListener('click', () => {
			
			console.log("Started executing getCustomerKYCStatusButton");
			var kycStatusCustomerNameInput = document.getElementById('kycStatusCustName');
            var customerName = kycStatusCustomerNameInput.value;

            if (!customerName) {
                console.error('Customer name is required');
                Swal.fire('Error', 'Customer name is required', 'error');
                return;
            }

			var start = performance.now();
            myContract.methods.getCustomerKYCStatus(customerName).call({ from: address })
			.then(res => {
				var end = performance.now();
				var timeTaken = end - start;
                var customerHash = res[0];
                var isKYCCompleted = res[1];
				console.log('Get Customer KYC Status executed susuccessfully:');
				console.log(res);
				console.log(`Gas Used: ${res.gasUsed}`);
				console.log(`Time Taken: ${timeTaken} ms`);

                // Display the result in the UI
				var kycStatusResult = document.getElementById('kycStatusResult');
                kycStatusResult.innerText = `KYC Status: ${res ? 'Completed' : 'Not Completed'}`;

				Swal.fire({
					title: 'KYC status retrieved successfully!',
					html: `
						<p><strong>Transaction Hash:</strong> ${res.transactionHash}</p>
						<p><strong>Gas Used:</strong> ${res.gasUsed}</p>
						<p><strong>Time Taken:</strong> ${timeTaken} ms</p>
						<p><strong>Block Number:</strong> ${res.blockNumber}</p>
					`,
					icon: 'success'
				});
			})
			.catch(err => {
				console.error(err);
				Swal.fire('Error', 'Error retrieving KYC status: ' + err.message, 'error');
			});
        });
		*/


		showCustomerDataButton.addEventListener('click', () => {
			        
			console.log("Started executing showCustomerDataButton");
            var start = performance.now();
			var customerNameInput = document.getElementById('customerdata');
			myContract.methods.showCustomerData(customerNameInput.value).call()
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Show Customer Data executed susuccessfully:');
					console.log(res);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    console.log(`Gas Used: ${res.gasUsed}`);

					customerDataDiv = document.getElementById('customerData');
					customerDataDiv.innerHTML = `
					<p><strong>Name:</strong> ${res[0]}</p>
					<p><strong>Customer Hash:</strong> ${res[1]}</p>
					<p><strong>Validated Bank:</strong> ${res[2]}</p>
					<p><strong>KYC Status:</strong> ${res[3]}</p>
					`;
                })
                .catch(err => {
                    console.error(err);
					Swal.fire('Error', 'Error showing customer data: ' + err.message, 'error');
                });
			});

		
		// 0xf0031eb2bd98d12e37D317b3c6243A9696255bff
        getUserKYCButton.addEventListener('click', () => {
			
			console.log("Started executing getUserKYCButton");
            var start = performance.now();

			var KYCdataAddressInput = document.getElementById('KYCdataAddress');
            var KYCdataAddress = KYCdataAddressInput.value;

            myContract.methods.getUser(KYCdataAddress).call()
            .then(res => {
                var end = performance.now();
                var timeTaken = end - start;
                console.log('Get KYC User susuccessful:');
                console.log(res);
                console.log(`Gas Used: ${res.gasUsed}`);
                console.log(`Time Taken: ${timeTaken} ms`);

				/*
                // Decrypt data
                const decryptedFirstName = decrypt(res.firstName);
                const decryptedMiddleName = decrypt(res.middleName);
                const decryptedLastName = decrypt(res.lastName);
                const decryptedDob = decrypt(res.dob);
                const decryptedEmail = decrypt(res.email);
                const decryptedPhone = decrypt(res.phone);
                const decryptedMaritalStatus = decrypt(res.maritalStatus);
                const decryptedAddress = decrypt(res.address_);
                const decryptedCity = decrypt(res.city);
                const decryptedState = decrypt(res.state);
                const decryptedCountry = decrypt(res.country);
                const decryptedZip = decrypt(res.zip);
                const decryptedNationality = decrypt(res.nationality);
                const decryptedOccupation = decrypt(res.occupation);
                const decryptedEmploymentStatus = decrypt(res.employmentStatus);
                const decryptedAnnualIncome = decrypt(res.annualIncome);
                const decryptedIdType = decrypt(res.idType);
                const decryptedIdNumber = decrypt(res.idNumber);
                const decryptedIdExpiry = decrypt(res.idExpiry);
				*/

				// Decrypt data
                const decryptedFirstName = (res.firstName);
                const decryptedMiddleName = (res.middleName);
                const decryptedLastName = (res.lastName);
                const decryptedDob = (res.dob);
                const decryptedEmail = (res.email);
                const decryptedPhone = (res.phone);
                const decryptedMaritalStatus = (res.maritalStatus);
                const decryptedAddress = (res.address_);
                const decryptedCity = (res.city);
                const decryptedState = (res.state);
                const decryptedCountry = (res.country);
                const decryptedZip = (res.zip);
                const decryptedNationality = (res.nationality);
                const decryptedOccupation = (res.occupation);
                const decryptedEmploymentStatus = (res.employmentStatus);
                const decryptedAnnualIncome = (res.annualIncome);
                const decryptedIdType = (res.idType);
                const decryptedIdNumber = (res.idNumber);
                const decryptedIdExpiry = (res.idExpiry);

				var customerDataDiv = document.getElementById('KYCData');
				customerDataDiv.innerHTML = `
						<p><strong>First Name:</strong> ${decryptedFirstName}</p>
						<p><strong>Middle Name:</strong> ${decryptedMiddleName}</p>
						<p><strong>Last Name:</strong> ${decryptedLastName}</p>
						<p><strong>Date of Birth:</strong> ${decryptedDob}</p>
						<p><strong>Email:</strong> ${decryptedEmail}</p>
						<p><strong>Phone:</strong> ${decryptedPhone}</p>
						<p><strong>Marital Status:</strong> ${decryptedMaritalStatus}</p>
						<p><strong>Address:</strong> ${decryptedAddress}</p>
						<p><strong>City:</strong> ${decryptedCity}</p>
						<p><strong>State:</strong> ${decryptedState}</p>
						<p><strong>Country:</strong> ${decryptedCountry}</p>
						<p><strong>ZIP:</strong> ${decryptedZip}</p>
						<p><strong>Nationality:</strong> ${decryptedNationality}</p>
						<p><strong>Occupation:</strong> ${decryptedOccupation}</p>
						<p><strong>Employment Status:</strong> ${decryptedEmploymentStatus}</p>
						<p><strong>Annual Income:</strong> ${decryptedAnnualIncome}</p>
						<p><strong>ID Type:</strong> ${decryptedIdType}</p>
						<p><strong>ID Number:</strong> ${decryptedIdNumber}</p>
						<p><strong>ID Expiry:</strong> ${decryptedIdExpiry}</p>
					`;

                    Swal.fire({
                        title: 'User Data Retrieved Successful!',
                        html: `
                            <p><strong>First Name:</strong> ${decryptedFirstName}</p>
                            <p><strong>Middle Name:</strong> ${decryptedMiddleName}</p>
                            <p><strong>Last Name:</strong> ${decryptedLastName}</p>
                        `,
                        icon: 'success'
                    });

                })
                .catch(err => {
                    console.error(err);
                    Swal.fire('Error', 'Error Geetting KYC User: ' + err.message, 'error');
                });
        });

    } else {
        alert('Please install MetaMask!');
    }

});

