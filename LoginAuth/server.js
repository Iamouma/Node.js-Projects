require('dotenv').config();
const express = require("express");
const passport = require("passport");
const User = require("./models.js");
const localStrategy = require("./passp.js");
const controllers = require('./controllers.js');
const cookieParser = require("cookie-parser");
const connectDB = require("./db");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const routes = require("./pages.js");
const session = require("express-session");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Set up session management
app.use(
    session({
        secret: process.env.SESSION_SECRET || "defaultSecret", // Use env variable for security
        resave: false,
        saveUninitialized: false,
    })
);

// Middleware
app.use(cookieParser());
passport.use('local', localStrategy);  // Pass a name 'local'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Initialize Passport.js for user authentication
app.use(passport.initialize());
app.use(passport.session());

// Use the local strategy for authentication
passport.use(localStrategy);

// Serialize and deserialize user objects to maintain sessions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

// Routes
app.use("/api", controllers);
app.use("/", routes);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});