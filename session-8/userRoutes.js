const { readUsers, writeUsers } = require('../utils/fileHandler');

function handleUserRoutes(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/users' && method === 'GET') {
        const users = readUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else if (url === '/users' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newUser = JSON.parse(body);
            const users = readUsers();
            newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            users.push(newUser);
            writeUsers(users);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    } else if (url.startsWith('/users/') && method === 'PUT') {
        const id = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedData = JSON.parse(body);
            const users = readUsers();
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                users[index] = { ...users[index], ...updatedData };
                writeUsers(users);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users[index]));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    } else if (url.startsWith('/users/') && method === 'DELETE') {
        const id = parseInt(url.split('/')[2]);
        let users = readUsers();
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            users = users.filter(u => u.id !== id);
            writeUsers(users);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
}

module.exports = handleUserRoutes;