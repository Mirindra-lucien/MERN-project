const mongoose = require("mongoose");

const mimoza = new mongoose.Schema({
    legende: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: String,
    addedat: {
        type: Date,
        default: Date.now
    },
    updatedat: Date,
    _id_account: 'UUID'
});

module.exports = mongoose.model("Mimoza", mimoza);