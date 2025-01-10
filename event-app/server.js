require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Event = require('./models/events');

// Initialize the application
const app = express();

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// To get all the events
app.get('/', (req, res) => {
  Event.find()
    .then((result) => {
      res.render('index', { title: 'All event', events: result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred while fetching events.');
    });
});

// Posting data
app.post('/submit-event', (req, res) => {
  const event = new Event(req.body);
  event
    .save()
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.error(err);
      res.status(500).send('An error occurred while saving the event.');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
