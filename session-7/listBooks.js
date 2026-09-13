const { readBooks } = require('../utils/fileHandler');

function listBooks() {
    const books = readBooks();
    console.log("Books List:", books);
}

module.exports = listBooks;