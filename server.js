// Import the Express framework
const express = require('express');
// Import the database connection pool
const pool = require('./db');
// Load environment variables from .env file
require('dotenv').config();
// Create an instance of Express application
const app = express();

// Middleware to parse JSON payloads in incoming requests
// This middleware:
// 1. Automatically converts incoming JSON strings to JavaScript objects
// 2. Makes the parsed data available in req.body
// 3. Runs on POST/PUT/PATCH requests with Content-Type: application/json (ez)
// 4. Must be added before defining routes that need to handle JSON data (ez)
app.use(express.json());
// Define a GET route at '/test' endpoint
app.get('/test', (req, res) => {
  // Send a JSON response to confirm server is working
  res.json({ message: 'Castaway server is working!' });
});

// Test database connection
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Castaway server running on port ${PORT}`);
});