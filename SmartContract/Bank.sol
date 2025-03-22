
//Users can do the followings:
// 1) Deposit ether into a contract (to account balance and bank balance).
// 2) Withdraw money from the Bank to an address provided by the user through the payable function in ERC20.sol .
// 3) Transfer money between accounts of the Bank with the transfer function in ERC20.sol.
// 4) Check the balance from the Bank

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract Bank {

    address public owner;
    mapping(address => uint256) private userbalance;

    //A constructor is basically a function that run only once, which is at the time of deploying the smart contract.
    constructor() { 
        owner = msg.sender;
    } 

    modifier onlyOwner() {
        require(msg.sender == owner, 'you are not the owner of this contract');
        _;
    }

    function deposite() public payable  returns (bool){
        require(msg.value > 10 wei, 'please deposite at least 10 wei');
        userbalance[msg.sender] += msg.value;
        return true;
    }

    function withdraw(uint256 _amount) public payable returns (bool){
        require(_amount <= userbalance[msg.sender], 'you do not have sufficient');
        userbalance[msg.sender] -= _amount;
        payable (msg.sender).transfer(_amount);
        return true;
    } 

    function getbalance() public view returns(uint256){
        return userbalance[msg.sender];
    }

    function getcontractbalance() public view onlyOwner returns(uint256){
        return address(this).balance;
    }

    function withdrawfunds(uint256 _amount) public payable onlyOwner returns(bool){
        payable(owner).transfer(_amount);
        return true;
    }



}