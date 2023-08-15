const Doc = require('../models/document');
const path = require('path');
const fs = require('fs');
const CWDIR = process.cwd();

exports.upload = async (req, res) => {
    let doc = new Doc(req.body);
    const file = req.files.document;
    let filename = "" + Date.now() + Math.floor(Math.random() * 9000 + 1000);
    filename += path.extname(file.name);
    let filepath = path.join(CWDIR, "public/documents", filename);
    file.mv(filepath, (err) => {
        if(err) return res.status(400).json({error: "file not uploaded"});
    });
    doc.filepath = filepath;
    await doc.save();
    res.status(200).json({message: "file uploaded"});
}

exports.download = (req, res) => {
    const doc = req.doc;
    res.download(doc.filepath, path.basename(doc.filepath));
}

exports.delete = async (req, res) => {
    let doc = new Doc(req.doc);
    try {
        const docDel = await doc.deleteOne();
        fs.unlink(docDel.filepath, (err) => {
            if(err) return res.status(400).json({error: "not deleted"});
        });
        res.status(200).json(docDel);
    } catch (error) {
        return res.status(400).json({error: "not deleted"});
    }
}

exports.docById = async (req, res, next, id) => {
    try {
        const doc = await Doc.findById(id);
        req.doc = doc;
        next();
    } catch (error) {
        return res.status(400).json({error: "document not found"});
    }
}

exports.list = async (req, res) => {
    try {
        const docs = await Doc.find();
        res.status(200).json(docs);
    } catch (error) {
        return res.status(400).json({error: "documents can't found"});
    }
}