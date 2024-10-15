const express = require("express");
const router = express.Router();

// Home page route
router.get("/", (req, res) => {
    const name = req.session.name || null; // Use null if session name is not defined
    res.render("home", { name }); // Render home with the user's name
});

// Login page route
router.get("/login", (req, res) => {
    if (req.session.name) {
        return res.redirect("/"); // Use return to prevent further execution
    }
    res.render("login", { error: null }); // Render login page
});

// Registration page route
router.get("/register", (req, res) => {
    if (req.session.name) {
        return res.redirect("/"); // Use return to prevent further execution
    }
    res.render("register", { error: null }); // Render registration page
});

module.exports = router;