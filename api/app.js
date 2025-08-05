const express = require('express');
const cors = require('cors');
const { getEnv } = require('./utils/envHelper');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to WorkBridge API!' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = getEnv('PORT');
app.listen(PORT, () => {
  console.log(`WorkBridge API running on port ${PORT}`);
});