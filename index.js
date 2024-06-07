const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// File storage
const DATA_FILE = './tasks.json';

// Helper functions to read and write tasks
const readTasks = () => {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
  }
  return [];
};

const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// Initialize file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  writeTasks([]);
}

// API Endpoints

// endpoint to fetch all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// endpoint to create task
app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;

  if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const tasks = readTasks();
  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// endpoint to fetch a single task
app.get('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

// endpoint to edit a task 
app.put('/tasks/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title,
    description,
    completed,
    updated_at: new Date().toISOString(),
  };

  tasks[taskIndex] = updatedTask;
  writeTasks(tasks);

  res.json(updatedTask);
});

// endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  writeTasks(tasks);

  res.status(204).end();
});

// loging your server pot in the console
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
