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
    "Add Comercial Bank": [18017.20, 28157.40, 19624.00, 19107.50, 13582.80, 11532.80, 7019.80, 15010.70, 10924.50, 9597.10],
    "Get Bank Data": [301.30, 704.00, 331.70, 33.60, 325.50, 33.80, 352.30, 13.90, 36.10, 652.60],
    "Add Customer": [12945.00, 17552.10, 10853.50, 17268.40, 8840.40, 7211.40, 8491.60, 9356.20, 16974.40, 9071.30],
    "Add KYC Customer Data": [55304.70, 7434.60, 23645.30, 54391.12, 9345.42, 34519.00, 72345.37, 82633.38, 99412.72, 13045.30],
    "Get KYC Data": [171.00, 706.20, 42.10, 307.00, 28.60, 316.90, 24.40, 18.20, 321.10, 12.10],
    "Deposit ETH": [21674.50, 13350.60, 17881.40, 9484.60, 15814.30, 12106.90, 17824.30, 10413.80, 10907.70, 14659.80],
    "Withdraw ETH": [14799.70, 13103.50, 14176.60, 19066.90, 11552.00, 16263.10, 19091.80, 14302.70, 5653.90, 12432.30],
    "Get Bank Balance": [626.30, 92.60, 193.60, 316.60, 28.90, 341.90, 27.00, 11.40, 342.90, 29.70]
}

# Cumulative Gas Used
cumulative_gas_used = {
    "Add Comercial Bank": [2038420.00, 318480.00, 186252.00, 2504570.00, 2198911.00, 714637.00, 496881.00, 197303.00, 85931.00, 495937.00],
    "Get Bank Data": [np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan],
    "Add Customer": [269777.00, 786207.00, 183208.00, 120208.00, 830029.00, 879395.00, 248813.00, 1012210.00, 162208.00, 120220.00],
    "Add KYC Customer Data": [1608905.00, 908905.00, 1128905.00, 908602.00, 808712.00, 1938612.00, 538205.00, 438601.00, 1328603.00, 1518202.00],
    "Get KYC Data": [np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan],
    "Deposit ETH": [69206.00, 73106.00, 796358.00, 211976.00, 140958.00, 243711.00, 4972421.00, 181662.00, 188156.00, 73106.00],
    "Withdraw ETH": [565010.00, 1816584.00, 112000.00, 133000.00, 213391.00, 206163.00, 253994.00, 91000.00, 167059.00, 844850.00],
    "Get Bank Balance": [np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan, np.nan]
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

# Plot 3: Average Transaction Speeds
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

# Plot 4: Average Cumulative Gas Used
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