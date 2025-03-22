// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CombinedBankWithKYC {
    address public owner;
    
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
    
    struct User {
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
        // bytes32 encryptedData; // Store encrypted data
        string idExpiry;
    }

    mapping(address => uint256) private userbalance;
    mapping(address => Bank) public banks;
    mapping(string => Customer) public customersInfo;
    mapping(address => User) private users;

    event BankAdded(string name, uint amount, address bankAddress);
    event KYCPrivilegeGranted(address bankAddress);
    event CustomerAdditionAllowed(address bankAddress);
    event KYCPrivilegeRevoked(address bankAddress);
    event CustomerAdditionBlocked(address bankAddress);
    event CustomerAdded(string name, bytes32 customerHash, address bankAddress);
    event KYCCompleted(string customerName, address bankAddress);
    event CustomerDataRetrieved(string customerName, bytes32 data, bool kycStatus);
    event KYCStatusRetrieved(string customerName, bool kycStatus);
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event ContractWithdrawal(address indexed owner, uint256 amount);
    event GasConsumption(uint256 gasUsed);
    event ElapsedTime(uint256 timeTaken);
    event UserRegistered(address indexed userAddress);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this contract");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyOnce() {
        require(bytes(users[msg.sender].firstName).length == 0, "User is already registered");
        _;
    }

    bool private locked = false;

    // START KYC Functions

    // Define a struct to hold the user registration data
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

    // Modify the registerUser function to accept the struct as a parameter
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

    // END KYC Functions

    // START Central Bank Functions 

    function showBankData(address bankAddress) public view returns (string memory, uint, address, bool, bool) {
        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        Bank memory bank = banks[bankAddress];
        return (bank.name, bank.balance, bank.bankAddress, bank.kycPrivilege, bank.isAllowedToAddCustomer);
    }

    function showCustomerData(string memory custName) public view returns (string memory, bytes32, address, bool) {
        require(customersInfo[custName].validatedBank != address(0), "Customer not found");
        Customer memory customer = customersInfo[custName];
        return (customer.name, customer.customerHash, customer.validatedBank, customer.isKYCCompleted);
    }
    
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

    function allowCustomerAddition(address bankAddress) public onlyOwner {
        uint256 startGas = gasleft();
        uint256 startTime = block.timestamp;

        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        require(!banks[bankAddress].isAllowedToAddCustomer, "Requested Bank is already allowed to add new customers");
        banks[bankAddress].isAllowedToAddCustomer = true;
        emit CustomerAdditionAllowed(bankAddress);

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

    function blockCustomerAddition(address bankAddress) public onlyOwner {
        uint256 startGas = gasleft();
        uint256 startTime = block.timestamp;

        require(banks[bankAddress].bankAddress != address(0), "Bank not found");
        require(banks[bankAddress].isAllowedToAddCustomer, "Requested Bank is already blocked to add new customers");
        banks[bankAddress].isAllowedToAddCustomer = false;
        emit CustomerAdditionBlocked(bankAddress);

        uint256 gasUsed = startGas - gasleft();
        uint256 timeTaken = block.timestamp - startTime;
        emit GasConsumption(gasUsed);
        emit ElapsedTime(timeTaken);
    }
    // END Central Bank Functions 

    // START Commercial Bank Functions 
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

    function getCustomerData(string memory custName) public view returns (bytes32, bool) {
        require(customersInfo[custName].validatedBank != address(0), "Requested Customer not found");
        return (customersInfo[custName].customerHash, customersInfo[custName].isKYCCompleted);
    }

    function getCustomerKYCStatus(string memory custName) public view returns (bool) {
        require(customersInfo[custName].validatedBank != address(0), "Requested Customer not found");
        return customersInfo[custName].isKYCCompleted;
    }
    // END Bank Functions 

    // START User Functions 
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

    function getbalance() public view returns (uint256) {
        return userbalance[msg.sender];
    }

    function getcontractbalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function withdrawfundsFromContract(uint256 _amount) public payable onlyOwner nonReentrant returns (bool) {
        uint256 startGas = gasleft();
        uint256 startTime = block.timestamp;

        require(_amount <= address(this).balance, "Insufficient contract balance");
        payable(owner).transfer(_amount);
        emit ContractWithdrawal(owner, _amount);

        uint256 gasUsed = startGas - gasleft();
        uint256 timeTaken = block.timestamp - startTime;
        emit GasConsumption(gasUsed);
        emit ElapsedTime(timeTaken);

        return true;
    }
    // END User Functions 

    // START Utility
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
    // END Utility

    // Fallback function to handle ether sent to the contract
    fallback() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Receive function to handle plain ether transfers
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}


