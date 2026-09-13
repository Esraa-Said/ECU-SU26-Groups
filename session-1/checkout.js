// 1. Inputs
const customerName = "Mohamed Ali";
const productCategory = "Electronics"; // Options: Electronics, Clothing, Books
const productPrice = 1200;
const quantity = 1;
const couponCode = "DISCOUNT10";
const paymentMethod = "E-Wallet"; // Options: Cash, Credit Card, E-Wallet

// 2. Logic
const subtotal = productPrice * quantity;

// خصم الفئة (Category Discount)
let categoryDiscount = 0;
if (productCategory === "Electronics") {
    categoryDiscount = subtotal * 0.10; // 10% للأجهزة
} else if (productCategory === "Clothing") {
    categoryDiscount = subtotal * 0.15; // 15% للملابس
}

// خصم الكوبون
let couponDiscount = 0;
if (couponCode === "DISCOUNT10") {
    couponDiscount = subtotal * 0.10;
}

// خصم إضافي لطريقة الدفع
let paymentDiscount = 0;
if (paymentMethod === "E-Wallet") {
    paymentDiscount = 50; // خصم 50 جنيه عند الدفع بالمحفظة
}

// المجموع بعد الخصومات وقبل الضريبة
const totalDiscount = categoryDiscount + couponDiscount + paymentDiscount;
let priceAfterDiscount = subtotal - totalDiscount;

// تطبيق شرط البونص: لو السعر بالسالب نخليه 0
if (priceAfterDiscount < 0) {
    priceAfterDiscount = 0;
}

// حساب ضريبة القيمة المضافة VAT (14%)
const vat = priceAfterDiscount * 0.14;
const finalTotal = priceAfterDiscount + vat;

// 3. Output
console.log(`Customer: ${customerName}`);
console.log(`Product Category: ${productCategory}`);
console.log(`Subtotal: ${subtotal} EGP`);
console.log(`Total Discount: -${totalDiscount} EGP`);
console.log(`VAT (14%): ${vat.toFixed(2)} EGP`);
console.log(`Final Total: ${finalTotal.toFixed(2)} EGP`);