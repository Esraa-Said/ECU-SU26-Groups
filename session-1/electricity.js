// 1. Inputs
const customerName = "Mahmoud Hassan";
const customerType = "Commercial"; // Options: Residential, Commercial
const unitsConsumed = 450; // عدد الكيلووات

// 2. Logic
let unitPrice = 0;

// سعر الكيلووات حسب نوع العميل
if (customerType === "Residential") {
    unitPrice = 1.2;
} else if (customerType === "Commercial") {
    unitPrice = 2.0;
}

let subtotal = unitsConsumed * unitPrice;
let tax = subtotal * 0.14; // ضريبة 14%
let finalAmount = subtotal + tax;

// 3. Output
console.log(`Customer: ${customerName}`);
console.log(`Customer Type: ${customerType}`);
console.log(`Units Consumed: ${unitsConsumed} kWh`);
console.log(`Total Bill: ${subtotal} EGP`);
console.log(`Taxes (14%): ${tax.toFixed(2)} EGP`);
console.log(`Final Amount: ${finalAmount.toFixed(2)} EGP`);

// تقسيط الفاتورة لو معدية 800 جنيه
if (finalAmount > 800) {
    let monthlyInstallment = finalAmount / 4; // تقسيط على 4 شهور
    console.log(`Monthly Installment (4 Months): ${monthlyInstallment.toFixed(2)} EGP/month`);
}