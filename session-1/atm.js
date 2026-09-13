// 1. Inputs
const correctPIN = "1234";
const enteredPIN = "1234";
let balance = 5000;
const selectedOperation = "withdraw"; // Options: withdraw, deposit, checkBalance, changePIN
const amount = 1000;
const newPIN = "5678";

// 2. Logic
if (enteredPIN !== correctPIN) {
    console.log("Error: Invalid PIN code!");
} else {
    console.log("PIN Verified Successfully.");
    
    switch (selectedOperation) {
        case "withdraw":
            if (amount <= 0) {
                console.log("Error: Amount must be greater than zero.");
            } else if (amount > balance) {
                console.log("Error: Insufficient balance!");
            } else {
                balance -= amount;
                console.log(`Success: Withdrew ${amount} EGP. Remaining Balance: ${balance} EGP.`);
            }
            break;

        case "deposit":
            if (amount > 0) {
                balance += amount;
                console.log(`Success: Deposited ${amount} EGP. New Balance: ${balance} EGP.`);
            } else {
                console.log("Error: Deposit amount must be greater than zero.");
            }
            break;

        case "checkBalance":
            console.log(`Your Current Balance is: ${balance} EGP.`);
            break;

        case "changePIN":
            if (newPIN.length === 4) {
                console.log(`Success: Your PIN has been changed to ${newPIN}.`);
            } else {
                console.log("Error: New PIN must be exactly 4 digits.");
            }
            break;

        default:
            console.log("Invalid Operation Selected.");
    }
}