// 1. Inputs
const customerName = "  Sara Ahmed  ";
const restaurantName = "Pizza Hub";
const mealName = "Super Supreme";
const quantity = 2;
const price = 150;
const deliveryDistanceKm = 8;
const couponCode = "SAVE20";
const paymentMethod = "Credit Card"; // Options: Cash, Credit Card
const isPremiumMember = true;

// 2. Logic
const cleanCustomerName = customerName.trim();
const subtotal = price * quantity;

// حساب رسوم التوصيل بناءً على المسافة (5 جنيه لكل كيلو، وتجاني للأعضاء المميزين)
let deliveryFee = deliveryDistanceKm * 5;
if (isPremiumMember) {
    deliveryFee = 0;
}

// فحص الكوبون وتطبيق الخصم
let discount = 0;
if (couponCode === "SAVE20") {
    discount = subtotal * 0.20; // خصم 20%
}

// رسوم الخدمة بناءً على طريقة الدفع
let serviceFee = 0;
if (paymentMethod === "Cash") {
    serviceFee = 10; // رسوم تحصيل كاش
} else if (paymentMethod === "Credit Card") {
    serviceFee = 5;  // رسوم بوابة الدفع
}

// حساب الضرائب (14%) والمبلغ النهائي
const tax = (subtotal - discount) * 0.14;
const finalTotal = subtotal - discount + deliveryFee + serviceFee + tax;

// 3. Output
console.log("=================================");
console.log(`Customer: ${cleanCustomerName} ${isPremiumMember ? '(Premium)' : ''}`);
console.log(`Restaurant: ${restaurantName}`);
console.log(`Order: ${quantity}x ${mealName}`);
console.log(`Subtotal: ${subtotal} EGP`);
console.log(`Delivery Fee: ${deliveryFee} EGP`);
console.log(`Discount: -${discount} EGP`);
console.log(`Service Fee: ${serviceFee} EGP`);
console.log(`Tax (14%): ${tax.toFixed(2)} EGP`);
console.log("---------------------------------");
console.log(`Final Total: ${finalTotal.toFixed(2)} EGP`);
console.log(`Payment Method: ${paymentMethod}`);
console.log("=================================");