const komentariRouter = require('express').Router()
const Komentar = require('../models/komentar')
const Korisnik = require('../models/korisnik')
const autorizacija = require('../utils/autorizacija')

komentariRouter.get('/', async (req, res) => {
    const rezultat = await Komentar.find({})
    .populate('korisnik', { username: 1, ime: 1 })
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
        //ako nisi autentificiran, nemaš prava
    }
    const korisnikId = req.get('korisnikId')
    const korisnik = await Korisnik.findById(korisnikId)
    await Komentar.findByIdAndRemove(req.params.id)
    korisnik.objave = korisnik.objave.filter(o => o.id !== req.params.id)
    await korisnik.save()
    res.status(204).end()
})

komentariRouter.put('/:id', async (req, res) => {
    const token = autorizacija.dohvatiToken(req)
    const dekodiraniToken = autorizacija.verificirajToken(token)
    if(!token || !dekodiraniToken.id){
        return res.status(401).json({error: 'Neispravan token'})
        //ako nisi autentificiran, nemaš prava
    }
    const podatak = req.body
    const id = req.params.id
  
    const komentar = {
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        ID_objava: podatak.ID_objava
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
        //ako nisi autentificiran, nemaš prava
    }
    const korisnik = await Korisnik.findById(podatak.korisnikId)

  
    const komentar = new Komentar({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        ID_objava: podatak.ID_objava,
        korisnik: podatak.korisnikId
    })
    const spremljeniKomentar = await komentar.save()
    await korisnik.save()
    korisnik.komentari = korisnik.komentari.concat(spremljeniKomentar._id)
    res.json(spremljeniKomentar)
    
})

module.exports = komentariRouter