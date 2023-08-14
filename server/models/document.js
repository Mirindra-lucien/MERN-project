const mongoose = require("mongoose");

const doc = new mongoose.Schema({
    filepath: String,
    uploadat: {
        type: Date,
        default: Date.now
    },
    sokajy: {
        group: String,
        category: String,
        year: Date
    },
    isdeleted: Boolean,
    downloads: Number
});

module.exports = mongoose.model("Doc", doc);