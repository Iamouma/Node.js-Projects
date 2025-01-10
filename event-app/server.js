require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose')

// Initialize the application
const app = express();

app.set('view engine', 'ejs');


mongoose
  .connect(process.env.dbURI)
  .then((result) => {
    console.log('Connected to MongoDB...');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });

// Routing path
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});