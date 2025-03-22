// Central Bank variables
var loginButton = document.getElementById('connect_to_metamask');
var addBankButton = document.getElementById('addBankButton');
var grantKYCButton = document.getElementById('grantKYCButton');
var allowCustomerButton = document.getElementById('allowCustomerButton');
var revokeKYCButton = document.getElementById('revokeKYCButton');
var blockCustomerButton = document.getElementById('blockCustomerButton');

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

        //Central Bank functions
        addBankButton.addEventListener('click', () => {

			console.log("Before executing addBankButton");
			
			var bankNameInput = document.getElementById('bankName');
			var bankAmountInput = document.getElementById('bankAmount');
			var bankAddressInput = document.getElementById('bankAddress');
            var bankNameValue = bankNameInput.value;
            var bankAmountValue = bankAmountInput.value;
            var bankAddressValue = bankAddressInput.value;

            console.log(bankNameValue, bankAmountValue, bankAddressValue);

            if (!bankNameValue || !bankAmountValue || !bankAddressValue) {
                console.error('Bank name, amount, and address are required');
                Swal.fire('Error', 'Bank name, amount, and address are required', 'error');
                return;
            }

			// Validate the Ethereum address
    		if (!web3.utils.isAddress(bankAddressValue)) {
        		Swal.fire('Error', 'Invalid bank address', 'error');
        		return;
    		}

            var start = performance.now();
			myContract.methods.addBank(bankNameValue, web3.utils.toWei(bankAmountValue, 'ether') , bankAddressValue).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Bank added successfully');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
						title: 'Bank Added Successfully!',
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
					Swal.fire('Error', 'Error adding bank: ' + err.message, 'error');
                });

        });

        grantKYCButton.addEventListener('click', () => {

			console.log("Before executing grantKYCButton");

			var kycBankAddressInput = document.getElementById('kycBankAddress');
            var bankAddressValue = kycBankAddressInput.value;

            if (!bankAddressValue) {
                console.error('Bank address is required');
                Swal.fire('Error', 'Bank address is required', 'error');
                return;
            }

			// Validate the Ethereum address
    		if (!web3.utils.isAddress(bankAddressValue)) {
        		Swal.fire('Error', 'Invalid bank address', 'error');
        		return;
    		}

            var start = performance.now();
			myContract.methods.grantKYCPrivilege(bankAddressValue).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('KYC privilege granted successfully to bank:', bankAddressValue);
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
						title: 'KYC Privilege Granted Successfully!',
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
					Swal.fire('Error', 'Error granting KYC privilege: ' + err.message, 'error');
                });

        });

        allowCustomerButton.addEventListener('click', () => {

			console.log("Before executing allowCustomerButton");
			
			var allowBankAddressInput = document.getElementById('allowBankAddress');
            var bankAddressValue = allowBankAddressInput.value;

            if (!bankAddressValue) {
                console.error('Bank address is required');
                Swal.fire('Error', 'Bank address is required', 'error');
                return;
            }

			// Validate the Ethereum address
    		if (!web3.utils.isAddress(bankAddressValue)) {
        		Swal.fire('Error', 'Invalid bank address', 'error');
        		return;
    		}

            var start = performance.now();
			myContract.methods.allowCustomerAddition(bankAddressValue).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Customer addition allowed successfully for bank:', bankAddressValue);
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
						title: 'Customer Addition Allowed Successfully!',
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
					Swal.fire('Error', 'Error allowing customer addition: ' + err.message, 'error');
                });

        });

        revokeKYCButton.addEventListener('click', () => {
			
			console.log("Before executing revokeKYCButton");

			var revokeKYCAddressInput = document.getElementById('revokeKYCAddress');
            var bankAddressValue = revokeKYCAddressInput.value;

            if (!bankAddressValue) {
                console.error('Bank address is required');
                Swal.fire('Error', 'Bank address is required', 'error');
                return;
            }

			// Validate the Ethereum address
    		if (!web3.utils.isAddress(bankAddressValue)) {
        		Swal.fire('Error', 'Invalid bank address', 'error');
        		return;
    		}

            var start = performance.now();
			myContract.methods.revokeKYCPrivilege(bankAddressValue).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('KYC privilege revoked successfully for bank:', bankAddressValue);
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
						title: 'KYC Privilege Revoked Successfully!',
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
					Swal.fire('Error', 'Error revoking KYC privilege: ' + err.message, 'error');
                });
        });

        blockCustomerButton.addEventListener('click', () => {
			
			console.log("Before executing blockCustomerButton");
			
			var blockBankAddressInput = document.getElementById('blockBankAddress');
            var bankAddressValue = blockBankAddressInput.value;

            if (!bankAddressValue) {
                console.error('Bank address is required');
                Swal.fire('Error', 'Bank address is required', 'error');
                return;
            }

			// Validate the Ethereum address
    		if (!web3.utils.isAddress(bankAddressValue)) {
        		Swal.fire('Error', 'Invalid bank address', 'error');
        		return;
    		}

            var start = performance.now();
			myContract.methods.blockCustomerAddition(bankAddressValue).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Customer addition blocked successfully for bank:', bankAddressValue);
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
						title: 'Customer Addition Blocked Successfully!',
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
					Swal.fire('Error', 'Error blocking customer addition: ' + err.message, 'error');
                });
        });

		getBankDataButton.addEventListener('click', () => {
			        
			console.log("Started executing getBankDataButton");
            var start = performance.now();
			var bankDataInput = document.getElementById('bankdata');
			var bankDataValue = bankDataInput.value;
			
			// Validate the Ethereum address
    		if (!web3.utils.isAddress(bankDataValue)) {
        		Swal.fire('Error', 'Invalid bank address', 'error');
        		return;
    		}

			myContract.methods.showBankData(bankDataValue).call()
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					var bankDataDiv = document.getElementById('bankData');
					console.log('Showing Bank Data:');
					console.log(res);
					console.log(`Time Taken: ${timeTaken} ms`);
					console.log(`Gas Used: ${res.gasUsed}`);

					// Check if the response values are defined
            		if (res[0] && res[1] && res[2] && res[3] !== undefined && res[4] !== undefined) {
                		bankDataDiv.innerHTML = `
                    		<p><strong>Name:</strong> ${res[0]}</p>
                    		<p><strong>Balance:</strong> ${web3.utils.fromWei(res[1], 'ether')} ETH</p>
                    		<p><strong>Address:</strong> ${res[2]}</p>
                    		<p><strong>KYC Privilege:</strong> ${res[3]}</p>
                    		<p><strong>Allowed to Add Customer:</strong> ${res[4]}</p>
                		`;
            		} else {
                		Swal.fire('Error', 'Invalid data received from the contract', 'error');
            		}
                })
                .catch(err => {
                    console.error(err);
					Swal.fire('Error', 'Error retrieving bank data: ' + err.message, 'error');
                });
        });

    } else {
        alert('Please install MetaMask!');
    }

});

