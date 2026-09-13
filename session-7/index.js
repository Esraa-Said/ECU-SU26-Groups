const addBook = require('./modules/addBook');
const listBooks = require('./modules/listBooks');
const updateBook = require('./modules/updateBook');
const deleteBook = require('./modules/deleteBook');

addBook("Clean Code", "Robert C. Martin", 40);
addBook("The Pragmatic Programmer", "Andrew Hunt", 50);

listBooks();

updateBook(1, { price: 45 });
listBooks();

deleteBook(2);
listBooks();