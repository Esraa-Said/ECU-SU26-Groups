const cart = require('../data/cart');

function removeFromCart(productId) {
    const index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
}

module.exports = removeFromCart;