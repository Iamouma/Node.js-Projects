const mongoose = require("mongoose");

// Creating the user model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

const User = mongoose.model("User", userSchema);

model.exports = User;