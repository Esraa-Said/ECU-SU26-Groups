const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});