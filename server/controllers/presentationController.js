const Presentation = require('../models/presentation');

exports.create = async (req, res) => {
    const pres = new Presentation(req.body);
    try {
        await pres.save();
        res.status(200).json({message: "document iserted"});
    } catch (error) {
        return res.status(400).json({error: "not saved"});
    }
}

exports.show = (req, res) => {
    const pres = req.pres;
    res.json(pres);
}

exports.list = async (req, res) => {
    try {
        const press = await Presentation.find();
        res.json(press);
    } catch (error) {
        return res.status(400).json({error: "Can't list all documents"});
    }
}

exports.update = async (req, res) => {
    const pres = req.pres;
    const newPres = req.body;
    pres.updatedat = Date.now();
    for(let key in newPres) {
        pres[key] = newPres[key];
    }
    const doc = new Presentation(pres);
    try {
        const newDoc = await doc.save();
        res.json(newDoc);
    } catch (error) {
        return res.status(400).json({error: "Document has not updated"});
    }
}

exports.delete = async (req, res) => {
    const pres = new Presentation(req.pres);
    try {
        const presDel = await pres.deleteOne();
        res.status(200).json(presDel);
    } catch (error) {
        return res.status(400).json({error: "tsy mety fafana"});
    }    
}

exports.presById = async (req, res, next, id) => {
    try {
        const pres = await Presentation.findById(id);
        req.pres = pres;
        next();
    } catch (error) {
        return res.status(400).json({error: "Can't find document"});
    }
}