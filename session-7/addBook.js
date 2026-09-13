const { readBooks, writeBooks } = require('../utils/fileHandler');

function addBook(title, author, price) {
    const books = readBooks();
    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        price
    };
    books.push(newBook);
    writeBooks(books);
}

module.exports = addBook;