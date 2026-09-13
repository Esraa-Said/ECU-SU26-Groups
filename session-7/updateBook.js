const { readBooks, writeBooks } = require('../utils/fileHandler');

function updateBook(id, newDetails) {
    const books = readBooks();
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...newDetails };
        writeBooks(books);
    }
}

module.exports = updateBook;