class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    borrowBook() {
        if (this.isAvailable) {
            this.isAvailable = false;
            return true;
        }
        return false;
    }

    returnBook() {
        this.isAvailable = true;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    findBookByISBN(isbn) {
        return this.books.find(book => book.isbn === isbn) || null;
    }

    listAvailableBooks() {
        return this.books.filter(book => book.isAvailable);
    }
}