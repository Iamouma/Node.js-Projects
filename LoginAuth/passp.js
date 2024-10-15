const LocalStrategy = require("passport-local").Strategy;
const User = require("./models");
const bcrypt = require("bcrypt");

// Define the local strategy
const localStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        // Find the user by username in the database
        const user = await User.findOne({ username });

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        // Compare the password
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect password" });
        }
    } catch (err) {
        return done(err);
    }
});

// Export the local strategy
module.exports = localStrategy;