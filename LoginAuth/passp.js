const passport = require(passport);
const LocalStrategy = require("passport-local"). Strategy;
const User = require("./models");
const bcrypt = require("bcrypt");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            // Find user by username inthe database
            const user = await User.findOne({ username });
            // If user doesn't exist return error
            if (!user) {
                return done(null, false, { error: "Incorrect username" });
            }

            // Compare provided password with 
            // the hashed password inthe database
            const passwordsMatch = await bcrypt.compare(
                password,
                user.password
            );

            // If passwords match. return the user object
            if (passwordsMatch) {
                return done(null, user);
            } else {
                return done(null, false, { error: "Incorrect password" });
            }
        } catch (err) {
            return done(err);
        }
    })
);