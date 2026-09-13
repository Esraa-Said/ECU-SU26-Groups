const http = require('http');
const handleUserRoutes = require('./routes/userRoutes');

const PORT = 3000;

const server = http.createServer((req, res) => {
    handleUserRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});