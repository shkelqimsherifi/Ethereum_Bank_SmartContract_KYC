// UserBankAccount variables
var loginButton = document.getElementById('connect_to_metamask');
var depositButton = document.getElementById('depositbutton');
var withdrawButton = document.getElementById('withdrawbutton');
var getBalanceButton = document.getElementById('getbalance');
var getContractBalanceButton = document.getElementById('getContractBalance');
var withdrawContractButton = document.getElementById('withdrawcontractbutton');
var getBankDataButton = document.getElementById('getBankDataButton');
var getCustomerDataButton = document.getElementById('getCustomerDataButton');

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

        ethereum.on('accountsChanged', async function (accounts) {
			var userAddress = document.getElementById('accountaddress');
            var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            address = accounts[0];
            userAddress.innerText = address;
        });

        depositButton.addEventListener('click', () => {
			
			console.log("Started executing depositButton");
            var start = performance.now();
			var depositInput = document.getElementById('depositeth');
            myContract.methods.deposit().send({ from: address, value: web3.utils.toWei(depositInput.value, 'ether') })
				.then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Deposit susuccessful:');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
                        title: 'Deposit Successful!',
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
                    Swal.fire('Error', 'Error depositing: ' + err.message, 'error');
                });
        });

        withdrawButton.addEventListener('click', () => {
			
			console.log("Started executing withdrawButton");
            var start = performance.now();
			var withdrawInput = document.getElementById('withdraweth');
            myContract.methods.withdraw(web3.utils.toWei(withdrawInput.value, 'ether')).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Withdrawal susuccessful:');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
                        title: 'Withdrawal Successful!',
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
                    Swal.fire('Error', 'Error withdrawing: ' + err.message, 'error');
                });
            });

        withdrawContractButton.addEventListener('click', () => {
			
			console.log("Started executing withdrawContractButton");
            var start = performance.now();
			var withdrawConstractInput = document.getElementById('withdrawethcontract');
            myContract.methods.withdrawfundsFromContract(web3.utils.toWei(withdrawConstractInput.value, 'ether')).send({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Withdrawal from Contract susuccessful');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
                        title: 'Withdrawal from Contract Successful!',
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
                    Swal.fire('Error', 'Error withdrawing from Contract: ' + err.message, 'error');
                });
            });

        getBalanceButton.addEventListener('click', () => {

			console.log("Started executing getBalanceButton");
            var start = performance.now();
            myContract.methods.getbalance().call({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Get Balance executed susuccessfully:');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    var balance = document.getElementById('balance');
                    balance.innerText = web3.utils.fromWei(res, 'ether') + ' ETH';
					
					Swal.fire({
                        title: 'Bank account!',
                        html: `
                            <p><strong>Time Taken:</strong> ${timeTaken} ms</p>
                            <p><strong>Balance:</strong> ${web3.utils.fromWei(res, 'ether') + ' ETH'}</p>
                        `,
                        icon: 'success'
                    });
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire('Error', 'Error retrieving balance: ' + err.message, 'error');
                });
        });

        getContractBalanceButton.addEventListener('click', () => {
			        
			console.log("Started executing getContractBalanceButton");
            var start = performance.now();
            myContract.methods.getcontractbalance().call({ from: address })
                .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Get Contract Balance executed susuccessfully:');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    var contractbalance = document.getElementById('contractbalance');
                    contractbalance.innerText = web3.utils.fromWei(res, 'ether') + ' ETH';
					
					Swal.fire({
                        title: 'Contract account balance!',
                        html: `
                            <p><strong>Time Taken:</strong> ${timeTaken} ms</p>
                            <p><strong>Balance:</strong> ${web3.utils.fromWei(res, 'ether') + ' ETH'}</p>
                        `,
                        icon: 'success'
                    });
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire('Error', 'Error retrieving Contract balance: ' + err.message, 'error');
                });
        });


    } else {
        alert('Please install MetaMask!');
    }

});

