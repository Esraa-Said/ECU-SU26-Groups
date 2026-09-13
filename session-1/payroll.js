// 1. Inputs
const employeeName = "Sara Mohamed";
const jobPosition = "Manager"; // Options: Manager, Developer, etc.
const basicSalary = 8000;
const overtimeHours = 10;
const hourlyRate = 50;
const insurance = 500;

// 2. Logic
// حساب الإضافي
let overtimePayment = overtimeHours * hourlyRate;

// بونص المدير
let managerBonus = 0;
if (jobPosition === "Manager") {
    managerBonus = 1000;
}

// إجمالي المرتب قبل الضريبة (Gross Salary)
const grossSalary = basicSalary + overtimePayment + managerBonus;

// حساب الضرائب (لو المرتب أكتر من 7000 بنخصم 15%، غير كده 10%)
let taxRate = grossSalary > 7000 ? 0.15 : 0.10;
let taxAmount = grossSalary * taxRate;

// صافي المرتب (Net Salary)
const netSalary = grossSalary - taxAmount - insurance;

// 3. Output
console.log(`Employee: ${employeeName} (${jobPosition})`);
console.log(`Gross Salary: ${grossSalary} EGP`);
console.log(`Taxes: ${taxAmount} EGP`);
console.log(`Insurance: ${insurance} EGP`);
console.log(`Net Salary: ${netSalary} EGP`);

// Bonus Rule: التوصية بمراجعة المرتب لو قليل
if (netSalary < 4000) {
    console.log("Note: Salary review is recommended for this employee.");
}