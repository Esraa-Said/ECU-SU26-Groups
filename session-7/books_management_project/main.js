const readBooks = require("./modules/read.books");
const addBook = require("./modules/add.books");
const deleteBook = require("./modules/delete.book");
const updateBook = require("./modules/update.book");

async function main() {
  console.log(await readBooks());

  await addBook("Book 5", "Ahmed", 2025);

  console.log(await readBooks());

  await deleteBook(5);
  console.log(await readBooks());

  await updateBook(2, "Updated Title");
  console.log(await readBooks());
}

main();