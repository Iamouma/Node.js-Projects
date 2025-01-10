const express = require('express');

// Initialize the application
const app = express();

// Routing path
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});