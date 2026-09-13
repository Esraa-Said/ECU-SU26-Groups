const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use('/', studentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});