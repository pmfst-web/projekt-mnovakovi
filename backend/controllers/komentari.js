const komentariRouter = require('express').Router()
const Komentar = require('../models/komentar')
const Korisnik = require('../models/korisnik')
const Objava = require('../models/objava')
const autorizacija = require('../utils/autorizacija')

komentariRouter.get('/', async (req, res) => {
    const rezultat = await Komentar.find({})
    .populate('korisnik', {_id: 1})
    .populate('objava', {_id: 1})
    res.json(rezultat)
})

komentariRouter.get('/:id', async (req, res) => {
    const komentar = await Komentar.findById(req.params.id)
    if (komentar) {
        res.json(komentar)
    } 
    else {
        res.status(404).end()
    }
})

komentariRouter.delete('/:id', async (req, res) => {
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }

    const obrisaniKomentar = await Komentar.findByIdAndRemove(req.params.id)
    await Objava.findByIdAndUpdate(obrisaniKomentar.objava, {$pull: {"komentari": {_id: obrisaniKomentar._id}}}).exec()
    await Komentar.findByIdAndUpdate(obrisaniKomentar.objava, {$pull: {"komentari": {_id: obrisaniKomentar._id}}}).exec()
    res.status(204).end()
})

komentariRouter.put('/:id', async (req, res) => {
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }
    const podatak = req.body
    const id = req.params.id
  
    const komentar = {
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        objava: podatak.ID_objava
    }
  
    const noviKomentar = await Komentar.findByIdAndUpdate(id, komentar, {new: true})
    res.json(noviKomentar)
})

komentariRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }
  
    const komentar = new Komentar({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        objava: podatak.objava,
        korisnik: podatak.korisnikId
    })

    const spremljeniKomentar = await komentar.save()
    await Objava.findByIdAndUpdate(spremljeniKomentar.objava, {$push: {"komentari": {_id: spremljeniKomentar._id}}}).exec()
    await Korisnik.findByIdAndUpdate(spremljeniKomentar.korisnik, {$push: {"komentari": {_id: spremljeniKomentar._id}}}).exec()
    res.json(spremljeniKomentar)
})

module.exports = komentariRouter