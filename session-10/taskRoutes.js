const express = require('express');
const router = express.Router();
const { readTasks, writeTasks } = require('../utils/fileHandler');

router.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.status(200).json(tasks);
});

router.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);

    if (task) {
        res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

router.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const tasks = readTasks();
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: completed || false
    };

    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

router.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...req.body };
        writeTasks(tasks);
        res.status(200).json(tasks[index]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

router.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let tasks = readTasks();
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
        tasks = tasks.filter(t => t.id !== id);
        writeTasks(tasks);
        res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

module.exports = router;