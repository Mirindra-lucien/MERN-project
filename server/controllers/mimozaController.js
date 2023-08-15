const Mimoza = require('../models/mimoza');
const path = require('path');
const CWDIR = process.cwd();
const fs = require('fs');

exports.create = async (req, res) => {
    var mimoza = new Mimoza(req.body);
    let filename = "" + Date.now() + Math.floor(Math.random() * 9000 + 1000);
    let filepath = "";
    if(req.files.image) {
        filename += path.extname(req.files.image.name);
        filepath = path.join(CWDIR, "public/mimoza", filename);
        req.files.image.mv(filepath, (err) => {
            if(err) return res.status(400).json({error: "image can't saved"});
        });
    }
    try {
        mimoza.image = filepath;
        await mimoza.save();
        res.status(200).json({message: "ok"});
    } catch(err) {
        return res.status(400).json({error: "not ok"});
    }
}

exports.show = (req, res) => {
    const mimoza = req.mimoza;
    res.json(mimoza);
}

exports.list = async (req, res) => {
    try {
        const mimozas = await Mimoza.find();
        res.json(mimozas);
    } catch(err) {
        return res.status(400).json({error: "Can't list all mimoza document"});
    }
}

exports.update = async (req, res) => {
    let mimoza = req.mimoza;
    let newMim = req.body;
    let oldpath = mimoza.image + "";
    let filename = "" + Date.now() + Math.floor(Math.random() * 9000 + 1000);
    let filepath = "";
    if(req.files.image) {
        filename += path.extname(req.files.image.name);
        filepath = path.join(CWDIR, "public/mimoza", filename);
        req.files.image.mv(filepath, (err) => {
            if(err) return res.status(400).json({error: "image can't saved"});
            fs.unlink(oldpath, (err) => {
                if(err) res.status(400).json({error: "tsy mety"});
            });
        });
        mimoza.image = filepath;
    }
    for(let key in newMim) {
        mimoza[key] = newMim[key];
    }
    mimoza.updatedat = Date.now();
    mimoza = new Mimoza(mimoza);
    try {
        newMim = await mimoza.save();
        res.json(newMim);
    } catch(er) {
        return res.status(400).json({error: "Can't update the document"});
    }
}

exports.delete = async (req, res) => {
    const mimoza = new Mimoza(req.mimoza);
    try {
        const mimozaDel = await mimoza.deleteOne();
        fs.unlink(mimozaDel.image, (err) => {
            if(err) return res.status(400).json({error: "file not deleted"});
        })
        res.json(mimozaDel);
    } catch(err) {
        return res.status(400).json({error: "Can't delete document"});
    }
}

exports.mimozaById = async (req, res, next, id) => {
    try {
        const mimoza = await Mimoza.findById(id);
        req.mimoza = mimoza;
        next();
    } catch(e) {
        return res.status(400).json({error: "Can't find mimoza document"});
    }
}