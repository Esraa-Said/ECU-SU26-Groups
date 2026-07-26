const readBooks = require("./read.books");
const saveBooks = require("./save.books");

async function addBook(title, author, year) {
  if (!title || !author || !year) {
    console.log("❌ Invalid Book Data");
    return;
  }

  try {
    const books = await readBooks();
    let book = { id: books.length + 1, title, author, year };
    books.push(book);
    await saveBooks(books); 
    console.log("✅ Book added successfully.");
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

module.exports = addBook;
