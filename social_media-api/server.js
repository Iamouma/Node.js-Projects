const express = require('express');
const connectDB = require('./db');
require('dotenv').config();
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api',userRouter);
app.use('/api', authRouter);
app.use('/api',postRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
 
module.exports = app;