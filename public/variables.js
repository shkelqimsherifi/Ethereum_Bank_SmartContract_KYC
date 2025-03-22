// UserBankAccount variables
export const userAddress = document.getElementById('accountaddress');
export const balance = document.getElementById('balance');

export const depositInput = document.getElementById('depositeth');
export const withdrawInput = document.getElementById('withdraweth');

export const loginButton = document.getElementById('connect_to_metamask');
export const depositButton = document.getElementById('depositbutton');
export const withdrawButton = document.getElementById('withdrawbutton');
export const getBalanceButton = document.getElementById('getbalance');

// Commercial Bank variables

export const customerData = document.getElementById('customerData');
export const kycStatus = document.getElementById('kycStatus');
export const kycStatusResult = document.getElementById('kycStatusResult');

export const customerNameInput = document.getElementById('custName');
export const customerDataInput = document.getElementById('custData');
export const kycCustomerNameInput = document.getElementById('kycCustName');
export const kycCustomerDataInput = document.getElementById('kycCustData');
export const kycStatusCustomerNameInput = document.getElementById('kycStatusCustName');

export const addCustomerButton = document.getElementById('addCustomerButton');
export const completeKYCButton = document.getElementById('completeKYCButton');
export const getCustomerDataButton = document.getElementById('getCustomerDataButton');
export const getCustomerKYCStatusButton = document.getElementById('getCustomerKYCStatusButton');

// Central Bank variables
export const bankNameInput = document.getElementById('bankName');
export const bankAmountInput = document.getElementById('bankAmount');
export const bankAddressInput = document.getElementById('bankAddress');
export const kycBankAddressInput = document.getElementById('kycBankAddress');
export const allowBankAddressInput = document.getElementById('allowBankAddress');
export const revokeKYCAddressInput = document.getElementById('revokeKYCAddress');
export const blockBankAddressInput = document.getElementById('blockBankAddress');

export const addBankButton = document.getElementById('addBankButton');
export const grantKYCButton = document.getElementById('grantKYCButton');
export const allowCustomerButton = document.getElementById('allowCustomerButton');
export const revokeKYCButton = document.getElementById('revokeKYCButton');
export const blockCustomerButton = document.getElementById('blockCustomerButton');

// Check for null elements
if (!loginButton || !userAddress || !depositInput || !depositButton || !withdrawInput || !withdrawButton || !getBalanceButton || !balance) {
    console.error('One or more UserBankAccount elements are missing');
}

if (!customerNameInput || !customerDataInput || !addCustomerButton || !kycCustomerNameInput || !completeKYCButton || !kycCustomerDataInput || !getCustomerDataButton || !customerData || !kycStatus || !kycStatusCustomerNameInput || !getCustomerKYCStatusButton || !kycStatusResult) {
    console.error('One or more Commercial Bank elements are missing');
}

if (!bankNameInput || !bankAmountInput || !bankAddressInput || !addBankButton || !kycBankAddressInput || !grantKYCButton || !allowBankAddressInput || !allowCustomerButton || !revokeKYCAddressInput || !revokeKYCButton || !blockBankAddressInput || !blockCustomerButton) {
    console.error('One or more Central Bank elements are missing');
}