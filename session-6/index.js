const addToCart = require('./modules/addToCart');
const removeFromCart = require('./modules/removeFromCart');
const listCart = require('./modules/listCart');
const calculateTotal = require('./modules/calculateTotal');

addToCart(1);
addToCart(2);
listCart();
console.log("Total Price:", calculateTotal());

removeFromCart(1);
listCart();
console.log("Total Price:", calculateTotal());