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
doc.virtual("group")
        .set(function(v) {
            this.sokajy.group = v;
        })
        .get(function() {
            return this.sokajy.group;
        });
doc.virtual("category")
        .set(function(v) {
            this.sokajy.category = v;
        })
        .get(function() {
            return this.sokajy.category;
        });
doc.virtual("year")
        .set(function(v) {
            this.sokajy.year = v;
        })
        .get(function() {
            return this.sokajy.year;
        });
module.exports = mongoose.model("Doc", doc);