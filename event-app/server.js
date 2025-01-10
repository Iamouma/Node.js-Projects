require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Event = require('../models/Events');

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

// posting a data
app.post('/submit-event', (req, res) => {
  const event = new Event(req.body);
  event.save()
  .then((result) => {
    res.redirect('/');
  })
  .catch((err) => {
    console.error(err);
  });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});