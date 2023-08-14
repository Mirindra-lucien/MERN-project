const mongoose = require('mongoose');
const crypto = require('crypto');

const espa = new mongoose.Schema({
    _id: {
        type: 'UUID',
        default: crypto.randomUUID()
    },
    option: {
        type: String,
        required: true
    },
    filiere: {
        type: String,
        required: true
    },
    descritpion: {
        type: String
    },
    _id_account: 'UUID'
});

module.exports = mongoose.model("Espa", espa);