const komentariRouter = require('express').Router()
const Komentar = require('../models/komentar')
const Korisnik = require('../models/korisnik')
const Objava = require('../models/objava')
const autorizacija = require('../utils/autorizacija')

komentariRouter.get('/', async (req, res) => {
    const rezultat = await Komentar.find({})
    .populate('korisnik', {_id: 1, username: 1})
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

komentariRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
    }

    const postojiObjava = await autorizacija.validirajIdObjave(podatak.objava_ID)

    if(!postojiObjava){
        return res.status(400).json({error: 'Pripadajuća objava ne postoji ili je obrisana'})
    }
  
    const komentar = new Komentar({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        objava: podatak.objava_ID,
        korisnik: podatak.korisnik_ID
    })

    const spremljeniKomentar = await komentar.save()
    await Objava.findByIdAndUpdate(spremljeniKomentar.objava, {$push: {"komentari": {_id: spremljeniKomentar._id}}}).exec()
    await Korisnik.findByIdAndUpdate(spremljeniKomentar.korisnik, {$push: {"komentari": {_id: spremljeniKomentar._id}}}).exec()
    res.json(spremljeniKomentar)
})

module.exports = komentariRouter