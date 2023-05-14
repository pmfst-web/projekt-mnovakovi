const objaveRouter = require('express').Router()
const Objava = require('../models/objava')
const Korisnik = require('../models/korisnik')
const Komentar = require('../models/komentar')
const autorizacija = require('../utils/autorizacija')

objaveRouter.get('/', async (req, res) => {
    const rezultat = await Objava.find({})
    .populate('korisnik', {_id: 1, username: 1})
    .populate('komentari', {_id: 1})
    res.json(rezultat)
})

objaveRouter.get('/:id', async (req, res) => {
    const objava = await Objava.findById(req.params.id)
    if (objava) {
        res.json(objava)
    } 
    else {
        res.status(404).end()
    }
})

objaveRouter.delete('/:id', async (req, res) => {
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }

    const obrisanaObjava = await Objava.findByIdAndRemove(req.params.id)
    await Komentar.deleteMany({objava: obrisanaObjava._id}).exec()
    await Korisnik.findByIdAndUpdate(obrisanaObjava.korisnik, {$pull: {"objave": {_id: obrisanaObjava._id}}}).exec()
    res.status(204).end()
})

objaveRouter.put('/:id', async (req, res) => {
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }
    const podatak = req.body
    const id = req.params.id
    
    const objava = {
        sadrzaj: podatak.sadrzaj,
        likeovi: podatak.likeovi,
    }
    const novaObjava = await Objava.findOneAndUpdate({_id: id}, objava, {new: true,  runValidators: true})
    res.json(novaObjava)
})

objaveRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }

    const objava = new Objava({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        korisnik: podatak.korisnik_ID
    })

    const spremljenaObjava = await objava.save()
    await Korisnik.findByIdAndUpdate(spremljenaObjava.korisnik, {$push: {"objave": {_id: spremljenaObjava._id}}}).exec()
    res.json(spremljenaObjava)   
})

module.exports = objaveRouter

