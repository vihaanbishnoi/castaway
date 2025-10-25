const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();

//middleware to parse JSON payloads in incoming requests
app.use(express.json());

// Define a GET route at '/test' endpoint
app.get('/test', (req, res) => {
  
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