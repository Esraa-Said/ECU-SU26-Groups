const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/books.json');

function readBooks() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
}

function writeBooks(books) {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

module.exports = { readBooks, writeBooks };