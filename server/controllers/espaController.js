const Espa = require('../models/espa');

exports.create = async (req, res) => {
    let espa = new Espa(req.body);
    try {
        await espa.save();
        res.json({message: "Espa has inserted"});
    } catch (error) {
        return res.status(400).json({error: "Can't save the document"});
    }
}

exports.show = (req, res) => {
    const espa = req.espa;
    res.status(200).json(espa);
}

exports.list = async (req, res) => {
    try {
        let espas = await Espa.find()
        res.status(200).json(espas);
    } catch (error) {
        return res.status(400).json({error: "Can't list all documents"});
    }
}

exports.delete = async (req, res) => {
    const espa = new Espa(req.espa);
    try{
        const espaDel = await espa.deleteOne();
        res.status(200).json(espaDel);
    } catch(err) {
        return res.status(400).json({error: "Document can't deleted try again"});
    }
}

exports.update = async (req, res) => {
    let espa = req.espa;
    const newEspa = req.body;
    for(key in newEspa) {
        espa[key] = newEspa[key];
    }
    espa.updatedat = Date.now();
    const doc = new Espa(espa);
    try {
        const savedEspa = await doc.save();
        res.status(200).json(savedEspa);
    } catch(er) {
        return res.status(400).json({error: "Can't upadate document"});
    }
}

exports.espaById = async (req, res, next, id) => {
    try {
        const espa = await Espa.findById(id);
        req.espa = espa;
        next();
    } catch (error) {
        res.status(400).json({error: "Espa is not found"});
    }
}