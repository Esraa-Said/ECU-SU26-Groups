const readBooks = require("./read.books");
const saveBooks = require("./save.books");

async function updateBook(id, title) {
  if (!title) {
    console.log("❌ Title is missing.");
    return;
  }

  const books = await readBooks();
  const book = books.find((book) => book.id === Number(id));

  if (!book) {
    console.log("❌ Book not found. Invalid ID.");
    return;
  }

  book.title = title;

  try {
    await saveBooks(books);  
    console.log("✅ Book updated successfully.");
  } catch (error) {
    console.log(`❌ Error saving updated book: ${error.message}`);
  }
}

module.exports = updateBook;
