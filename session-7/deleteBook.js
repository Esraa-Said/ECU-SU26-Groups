const { readBooks, writeBooks } = require('../utils/fileHandler');

function deleteBook(id) {
    let books = readBooks();
    books = books.filter(b => b.id !== id);
    writeBooks(books);
}

module.exports = deleteBook;