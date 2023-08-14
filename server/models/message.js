const mongoose = require('mongoose');

const message = new mongoose.Schema({
    content: {
        type: {type: String, enum: ["file", "image", "video", "text"]},
        filepath: String,
        text: String
    },
    sendat: {
        type: Date,
        default: Date.now
    },
    id_account: 'UUID'
});

module.exports = mongoose.model("Message", message);