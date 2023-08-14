const mongoose = require("mongoose");
const crypto = require("crypto");

const account = new mongoose.Schema({
    _id: {
        type: 'UUID',
        default: () => crypto.randomUUID()
    },
    name: {
        first: {type: String, required: true},
        last: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String
    },
    birthday: Date,
    school: String,
    city: String,
    createdat: {
        type: Date,
        default: Date.now
    },
    updatedat: Date,
    photo: {
        profile: String,
        coverProfile: String
    },
    type: {
        type: String,
        enum: ["user", "admin", "sadmin"]
    },
    encoder: String
});

account.virtual("fullname")
    .get(function( ) {
        return this.name.first + " " + this.name.last;
    })
    .set(function(v) {
        this.name.first = v.substr(0, v.indexOf(" "));
        this.name.last = v.substr(v.indexOf(" ")+1); 
    });
account.virtual("pass")
    .get(function() {
        return this.vpass;
    })
    .set(function(passw) {
        this.vpass = passw;
        this.encoder = this.makeEncoder();
        this.password = this.hashPass(passw + "");
    });
account.methods.hashPass = function(pass) {
    if(pass === "") return "";
    try {
        return crypto
            .createHmac('sha1', this.encoder)
            .update(pass)
            .digest('hex')
    } catch (error) {
        return "";
    }
};
account.methods.makeEncoder = function() {
    return Math.floor(Math.random()*1000000) + "";
};
account.methods.autenthicate = function(passwordText) {
    return this.hashPass(passwordText) === this.password;
}

module.exports = mongoose.model("Account", account);