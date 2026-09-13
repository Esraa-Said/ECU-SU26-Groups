const fs = require('fs');
const path = require('path');

function logMessage(message) {
    const logPath = path.join(__dirname, 'app.log');
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;

    fs.appendFileSync(logPath, logEntry, 'utf8');
}

logMessage("Application started");
logMessage("User logged in");