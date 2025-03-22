// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CombinedKYC {
    struct Bank {
        string name;
        uint balance;
        address bankAddress;
        bool kycPrivilege;
        bool isAllowedToAddCustomer;
    }

    struct Customer {
        string name;
        bytes32 customerHash;
        address validatedBank;
        bool isKYCCompleted;
    }

    mapping(address => Bank) public banks;
    mapping(string => Customer) public customersInfo;

    event BankAdded(string name, address bankAddress);
    event KYCPrivilegeGranted(address bankAddress);
    event CustomerAdditionAllowed(address bankAddress);
    event KYCPrivilegeRevoked(address bankAddress);
    event CustomerAdditionBlocked(address bankAddress);
    event CustomerAdded(string name, bytes32 customerHash, address bankAddress);
    event KYCCompleted(string customerName, address bankAddress);
    event CustomerDataRetrieved(string customerName, bytes32 data, bool kycStatus);
    event KYCStatusRetrieved(string customerName, bool kycStatus);

    function addBank(string memory bankName, address bankAddress) public {
        require(!areStringSame(banks[bankAddress].name, bankName), "A Bank already exists with same name");
        banks[bankAddress] = Bank(bankName, 0, bankAddress, true, true);
        emit BankAdded(bankName, bankAddress);
    }

    function grantKYCPrivilege(address bankAddress) public {
        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        banks[bankAddress].kycPrivilege = true;
        emit KYCPrivilegeGranted(bankAddress);
    }

    function allowCustomerAddition(address bankAddress) public {
        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        require(!banks[bankAddress].isAllowedToAddCustomer, "Requested Bank is already allowed to add new customers");
        banks[bankAddress].isAllowedToAddCustomer = true;
        emit CustomerAdditionAllowed(bankAddress);
    }

    function revokeKYCPrivilege(address bankAddress) public {
        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        banks[bankAddress].kycPrivilege = false;
        emit KYCPrivilegeRevoked(bankAddress);
    }

    function blockCustomerAddition(address bankAddress) public {
        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        require(banks[bankAddress].isAllowedToAddCustomer, "Requested Bank is already blocked to add new customers");
        banks[bankAddress].isAllowedToAddCustomer = false;
        emit CustomerAdditionBlocked(bankAddress);
    }

    function addCustomer(string memory custName, bytes32 custData) public {
        require(banks[msg.sender].isAllowedToAddCustomer, "Requested Bank is blocked to add new customers");
        require(customersInfo[custName].validatedBank == address(0), "Requested Customer already exists");
        customersInfo[custName] = Customer(custName, custData, msg.sender, false);
        emit CustomerAdded(custName, custData, msg.sender);
    }

    function completeKYC(string memory custName) public {
        require(banks[msg.sender].kycPrivilege, "Requested Bank does not have KYC Privilege");
        customersInfo[custName].isKYCCompleted = true;
        emit KYCCompleted(custName, msg.sender);
    }

    function getCustomerData(string memory custName) public view returns (bytes32, bool) {
        require(customersInfo[custName].validatedBank != address(0), "Requested Customer not found");
        return (customersInfo[custName].customerHash, customersInfo[custName].isKYCCompleted);
    }

    function getKYCStatus(string memory custName) public view returns (bool) {
        require(customersInfo[custName].validatedBank != address(0), "Requested Customer not found");
        return customersInfo[custName].isKYCCompleted;
    }

    function areStringSame(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function stringToBytes32(string memory source) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}