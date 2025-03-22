import matplotlib.pyplot as plt
import numpy as np

# Data from the table
functions = [
    "Add Comercial Bank", "Get Bank Data", "Add Customer", 
    "Add KYC Customer Data", "Get KYC Data", "Deposit ETH", 
    "Withdraw ETH", "Get Bank Balance"
]

parameters = ["Transaksionit Speed", "Cumulative Gas Used", "Network fee"]

# Transaction speeds (in ms)
transaction_speeds = {
    "Add Comercial Bank": [18017.20000, 28157.40000, 19624.00000, 19107.50000, 13582.80000, 11532.80000, 7019.80000, 15010.70000, 10924.50000, 9597.10000],
    "Get Bank Data": [301.30000, 704.00000, 331.70000, 33.60000, 325.50000, 33.80000, 352.30000, 13.90000, 36.10000, 652.60000],
    "Add Customer": [12945.00000, 17552.10000, 10853.50000, 17268.40000, 8840.40000, 7211.40000, 8491.60000, 9356.20000, 16974.40000, 9071.30000],
    "Add KYC Customer Data": [55304.70000, 7434.60003, 23645.30000, 54391.12000, 9345.42000, 34519.00000, 72345.37000, 82633.38000, 99412.72000, 13045.30000],
    "Get KYC Data": [171.00000, 706.20000, 42.10000, 307.00000, 28.60000, 316.90000, 24.40000, 18.20000, 321.10000, 12.10000],
    "Deposit ETH": [21674.50000, 13350.60000, 17881.40000, 9484.60000, 15814.30000, 12106.90000, 17824.30000, 10413.80000, 10907.70000, 14659.80000],
    "Withdraw ETH": [14799.70000, 13103.50000, 14176.60000, 19066.90000, 11552.00000, 16263.10000, 19091.80000, 14302.70000, 5653.90000, 12432.30000],
    "Get Bank Balance": [626.30000, 92.60000, 193.60000, 316.60000, 28.90000, 341.90000, 27.00000, 11.40000, 342.90000, 29.70000]
}

# Cumulative Gas Used
cumulative_gas_used = {
    "Add Comercial Bank": [2038420.00000, 318480.00000, 186252.00000, 2504570.00000, 2198911.00000, 714637.00000, 496881.00000, 197303.00000, 85931.00000, 495937.00000],
    "Get Bank Data": [np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan],
    "Add Customer": [269777.00000, 786207.00000, 183208.00000, 120208.00000, 830029.00000, 879395.00000, 248813.00000, 1012210.00000, 162208.00000, 120220.00000],
    "Add KYC Customer Data": [1608905.00000, 908905.00000, 1128905.00000, 908602.00000, 808712.00000, 1938612.00000, 538205.00000, 438601.00000, 1328603.00000, 1518202.00000],
    "Get KYC Data": [np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan],
    "Deposit ETH": [69206.00000, 73106.00000, 796358.00000, 211976.00000, 140958.00000, 243711.00000, 4972421.00000, 181662.00000, 188156.00000, 73106.00000],
    "Withdraw ETH": [565010.00000, 1816584.00000, 112000.00000, 133000.00000, 213391.00000, 206163.00000, 253994.00000, 91000.00000, 167059.00000, 844850.00000],
    "Get Bank Balance": [np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan]
}

# Network fee (in SepoliaETH)
network_fee = {
    "Add Comercial Bank": [0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010],
    "Get Bank Data": [0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000],
    "Add Customer": [0.00030, 0.00030, 0.00030, 0.00030, 0.00030, 0.00030, 0.00030, 0.00030, 0.00030, 0.00030],
    "Add KYC Customer Data": [0.00130, 0.03850, 0.03150, 0.03280, 0.02150, 0.03270, 0.03270, 0.03270, 0.03350, 0.03830],
    "Get KYC Data": [0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000],
    "Deposit ETH": [0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010, 0.00010],
    "Withdraw ETH": [0.00020, 0.00020, 0.00020, 0.00020, 0.00020, 0.00020, 0.00020, 0.00020, 0.00020, 0.00020],
    "Get Bank Balance": [0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000, 0.00000]
}

# Plot 1: Transaction Speeds for Each Function
plt.figure(figsize=(12, 6))
for func in functions:
    speeds = transaction_speeds[func]
    plt.plot(range(1, 11), speeds, label=func, marker='o')

plt.title("Transaction Speeds for Each Function")
plt.xlabel("Transaction Number")
plt.ylabel("Transaction Speed (ms)")
plt.xticks(range(1, 11))
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(True)
plt.tight_layout()
plt.show()

# Plot 2: Cumulative Gas Used for Each Function
plt.figure(figsize=(12, 6))
for func in functions:
    gas_used = cumulative_gas_used[func]
    plt.plot(range(1, 11), gas_used, label=func, marker='o')

plt.title("Cumulative Gas Used for Each Function")
plt.xlabel("Transaction Number")
plt.ylabel("Cumulative Gas Used")
plt.xticks(range(1, 11))
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(True)
plt.tight_layout()
plt.show()

# Plot 3: Network Fee for Each Function
plt.figure(figsize=(12, 6))
for func in functions:
    fee = network_fee[func]
    plt.plot(range(1, 11), fee, label=func, marker='o')

plt.title("Network Fee for Each Function")
plt.xlabel("Transaction Number")
plt.ylabel("Network Fee (SepoliaETH)")
plt.xticks(range(1, 11))
plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
plt.grid(True)
plt.tight_layout()
plt.show()

# Plot 4: Average Transaction Speeds
avg_speeds = [np.nanmean(transaction_speeds[func]) for func in functions]
plt.figure(figsize=(10, 6))
plt.bar(functions, avg_speeds, color='skyblue')
plt.title("Average Transaction Speeds for Each Function")
plt.xlabel("Function")
plt.ylabel("Average Transaction Speed (ms)")
plt.xticks(rotation=45, ha='right')
plt.grid(True)
plt.tight_layout()
plt.show()

# Plot 5: Average Cumulative Gas Used
avg_gas_used = [np.nanmean(cumulative_gas_used[func]) for func in functions]
plt.figure(figsize=(10, 6))
plt.bar(functions, avg_gas_used, color='lightgreen')
plt.title("Average Cumulative Gas Used for Each Function")
plt.xlabel("Function")
plt.ylabel("Average Cumulative Gas Used")
plt.xticks(rotation=45, ha='right')
plt.grid(True)
plt.tight_layout()
plt.show()

# Plot 6: Average Network Fee
avg_network_fee = [np.nanmean(network_fee[func]) for func in functions]
plt.figure(figsize=(10, 6))
plt.bar(functions, avg_network_fee, color='orange')
plt.title("Average Network Fee for Each Function")
plt.xlabel("Function")
plt.ylabel("Average Network Fee (SepoliaETH)")
plt.xticks(rotation=45, ha='right')
plt.grid(True)
plt.tight_layout()
plt.show()
