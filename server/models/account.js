const mongoose = require("mongoose");

const account = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    birthday: Date,
    school: String,
    city: String,
    createdat: {
        type: Date,
        default: new Date.now()
    },
    updatedat: Date
});

module.exports = mongoose.model("Account", account);