const { writeFile } = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/books.json");

async function saveBooks(books) {
  try {
    await writeFile(filePath, JSON.stringify(books, null, 2));
  } catch (error) {
    console.log(`❌ Error saving books: ${error.message}`);
  }
}

module.exports = saveBooks;
