// 1. Inputs
const customerName = "  Ahmed Ali  ";
const mealName = "Burger";
const quantity = 2;
const basePrice = 100; // سعر الوجبة الواحدة
const mealSize = "Large"; // Options: Small, Medium, Large
const drinkOption = true;
const isDelivery = true;

// 2. Logic
const cleanName = customerName.trim();
let subtotal = basePrice * quantity;

// زيادة تكلفة الحجم
if (mealSize === "Large") {
    subtotal += 30;
} else if (mealSize === "Medium") {
    subtotal += 15;
}

// زيادة تكلفة المشروب (15 جنيه لكل وجبة)
if (drinkOption) {
    subtotal += 15 * quantity;
}

// حساب الخصم لو المبلغ معدي 200 جنيه
let discount = 0;
if (subtotal > 200) {
    discount = subtotal * 0.10; // خصم 10%
}

// رسوم التوصيل
let deliveryFee = isDelivery ? 20 : 0;

// المجموع النهائي
const finalTotal = subtotal - discount + deliveryFee;

// 3. Output
console.log("=================================");
console.log(`Customer Name: ${cleanName}`);
console.log(`Order: ${quantity}x ${mealName} (${mealSize})`);
console.log(`Subtotal: ${subtotal} EGP`);
console.log(`Delivery Fee: ${deliveryFee} EGP`);
console.log(`Discount: -${discount} EGP`);
console.log("---------------------------------");
console.log(`Final Total: ${finalTotal} EGP`);
console.log("=================================");