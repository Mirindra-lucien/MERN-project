const Account = require('../models/account');
const fs = require('fs');
const path = require('path');
const CWDIR = process.cwd();
const nodemailer = require('nodemailer'); 

exports.create = async (req, res) => {
    try{
        const user = new Account(req.body);
        await user.save();
        return res.status(200).json({message: "Signed up", error: ""});
    } catch(err) {
        res.status(400).json({error: "Cannot signed up", message: ""});
    }
}

exports.list = async (req, res) => {
    try {
        let accounts = await Account.find()
        .select('name username email birthday school city photo createdat');
        res.json(accounts);
    } catch (error) {
        res.status(400).json({error: "error"});
    };
}
exports.accountById = async (req, res, next, id) => {
    try {
        const user = await Account.findById(id);
        if(!user) {
            return res.status(400).json({error: "Account not found"});
        }
        req.account = user;
        next();
    } catch (error) {
        return res.status(400).json({error: "Cannot retreive account"});
    }
}

exports.delete = async (req, res) => {
    const account = new Account(req.account);
    try {
        const accountDel = await account.deleteOne();
        accountDel.password = undefined;
        accountDel.encoder = undefined;
        res.status(200).json(accountDel);
    } catch (error) {
        return res.status(400).json({error: "cannot delete account"});
    }    
}

function uploadfile(file, res) {
    let filename = "" + Date.now() + Math.floor(Math.random() * 9000 + 1000);
    filename += path.extname(file.name);
    let filepath = path.join(CWDIR, "public/images", filename);
    file.mv(filepath, (err) => {
        if(err) return res.status(400).json({message: err});
    });
    return filepath;
}

exports.update = async (req, res) => {
    try {
        let user = req.account;
        let usern = req.body;
        for(let name in usern) {
            user[name] = usern[name];
        }
        if(req.files.profile) {
            const profile = uploadfile(req.files.profile, res);
            user.photo.profile = profile;
        }
        if(req.files.coverProfile) {
            const cprof = uploadfile(req.files.coverProfile, res);
            user.photo.coverProfile = cprof;
        }
        user.updatedat = Date.now();
        const newUser = new Account(user);
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        return res.status(200).json({error: "retry again"});
    }
}

exports.show = (req, res) => {
    const account = req.account;
    account.password = undefined;
    account.encoder = undefined;
    res.json(account);
}

exports.verify = (req, res) => {
    const email = req.body.email;
    const code = Math.floor(Math.random() * 900000) + 100000;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mimoza.association@gmail.com',
            pass: 'lnkwymzdnhonkrhs'
        }
    });
    
    var mailOptions = {
        from: 'mimoza.association@gmail.com',
        to: email+"",
        subject: 'Fanamarinana fanokafana kaonty',
        text: "Ny teny miafina hanamarinana ny kaonty email anao dia : " + code
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            res.status(400).json({error: "verify your email"});
        }
        else {
            res.status(200).json({verificationCode: code, email: email});
        }
    });
}