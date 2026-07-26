const readBooks = require("./read.books");
const saveBooks = require("./save.books");

async function deleteBook(id) {
  const books = await readBooks();
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    console.log("❌ Invalid ID: Book not found.");
    return;
  }

  books.splice(index, 1);

  try {
    await saveBooks(books); 
    console.log("✅ Book deleted.");
  } catch (error) {
    console.log(`❌ Error deleting book: ${error.message}`);
  }
}

module.exports = deleteBook;
