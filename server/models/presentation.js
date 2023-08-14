const mongoose = require('mongoose')

const presentation = new mongoose.Schema({
    id_espa: 'UUID',
    titre: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    _id_account: 'UUID'
});

module.exports = mongoose.model("Presentation", presentation);