import { encrypt, decrypt } from "./encryption.js";    

var loginButton = document.getElementById('connect_to_metamask');

// Personal Information
var firstName = document.getElementById('firstName');
var middleName = document.getElementById('middleName');
var lastName = document.getElementById('lastName');
var dob = document.getElementById('dob');
var email = document.getElementById('email');
var phone = document.getElementById('phone');
var maritalStatus = document.getElementById('maritalStatus');
// Address Information
var address_s = document.getElementById('address_s');
var city = document.getElementById('city');
var state = document.getElementById('state');
var country = document.getElementById('country');
var zip = document.getElementById('zip');
// Additional Information
var nationality = document.getElementById('nationality');
var occupation = document.getElementById('occupation');
var employmentStatus = document.getElementById('employmentStatus');
var annualIncome = document.getElementById('annualIncome');
// Identification Information
var idType = document.getElementById('idType');
var idNumber = document.getElementById('idNumber');
var idExpiry = document.getElementById('idExpiry');
var idUpload = document.getElementById('idUpload');
// Submit Button
var registerUserKYCButton = document.getElementById('registerUserKYCButton');

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

        registerUserKYCButton.addEventListener('click', () => {
						console.log("Started executing registerUserKYCButton");
            var start = performance.now();

            /*
            // Encrypt data
            const encryptedFirstName = encrypt(firstName.value);
            const encryptedMiddleName = encrypt(middleName.value);
            const encryptedLastName = encrypt(lastName.value);
            const encryptedDob = encrypt(dob.value);
            const encryptedEmail = encrypt(email.value);
            const encryptedPhone = encrypt(phone.value);
            const encryptedMaritalStatus = encrypt(maritalStatus.value);
            const encryptedAddress = encrypt(address_s.value);
            const encryptedCity = encrypt(city.value);
            const encryptedState = encrypt(state.value);
            const encryptedCountry = encrypt(country.value);
            const encryptedZip = encrypt(zip.value);
            const encryptedNationality = encrypt(nationality.value);
            const encryptedOccupation = encrypt(occupation.value);
            const encryptedEmploymentStatus = encrypt(employmentStatus.value);
            const encryptedAnnualIncome = encrypt(annualIncome.value.toString());
            const encryptedIdType = encrypt(idType.value);
            const encryptedIdNumber = encrypt(idNumber.value);
            // const encryptedIdUpload = encrypt(idUpload.value);
            const encryptedIdExpiry = encrypt(idExpiry.value);
            */

            // Encrypt data
            const encryptedFirstName = (firstName.value);
            const encryptedMiddleName = (middleName.value);
            const encryptedLastName = (lastName.value);
            const encryptedDob = (dob.value);
            const encryptedEmail = (email.value);
            const encryptedPhone = (phone.value);
            const encryptedMaritalStatus = (maritalStatus.value);
            const encryptedAddress = (address_s.value);
            const encryptedCity = (city.value);
            const encryptedState = (state.value);
            const encryptedCountry = (country.value);
            const encryptedZip = (zip.value);
            const encryptedNationality = (nationality.value);
            const encryptedOccupation = (occupation.value);
            const encryptedEmploymentStatus = (employmentStatus.value);
            const encryptedAnnualIncome = (annualIncome.value.toString());
            const encryptedIdType = (idType.value);
            const encryptedIdNumber = (idNumber.value);
            // const encryptedIdUpload = (idUpload.value);
            const encryptedIdExpiry = (idExpiry.value);

            // Create the UserRegistrationData object
            const userRegistrationData = {
                firstName: encryptedFirstName,
                middleName: encryptedMiddleName,
                lastName: encryptedLastName,
                dob: encryptedDob,
                email: encryptedEmail,
                phone: encryptedPhone,
                maritalStatus: encryptedMaritalStatus,
                address_: encryptedAddress,
                city: encryptedCity,
                state: encryptedState,
                country: encryptedCountry,
                zip: encryptedZip,
                nationality: encryptedNationality,
                occupation: encryptedOccupation,
                employmentStatus: encryptedEmploymentStatus,
                annualIncome: parseInt(encryptedAnnualIncome),
                idType: encryptedIdType,
                idNumber: encryptedIdNumber,
                idExpiry: encryptedIdExpiry
            };

            // Call the registerUser function with the UserRegistrationData object
            myContract.methods.registerUser(userRegistrationData).send({ from: address })
            .then(res => {
                    var end = performance.now();
                    var timeTaken = end - start;
					console.log('Register KYC User successful:');
					console.log(res);
                    console.log(`Gas Used: ${res.gasUsed}`);
                    console.log(`Time Taken: ${timeTaken} ms`);
                    Swal.fire({
                        title: 'KYC User info registered Successful!',
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
                    Swal.fire('Error', 'Error Registering KYC User: ' + err.message, 'error');
                });
        });


    }
});
