const products = require('../data/products');
const cart = require('../data/cart');

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
    }
}

module.exports = addToCart;