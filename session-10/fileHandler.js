const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

function readTasks() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
}

function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };