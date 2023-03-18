const komentariRouter = require('express').Router()
const Komentar = require('../models/komentar')
const Korisnik = require('../models/korisnik')

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
    await Komentar.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

komentariRouter.put('/:id', async (req, res) => {
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
    const korisnik = await Korisnik.findById(podatak.korisnikId)

  
    const komentar = new Komentar({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        ID_objava: podatak.ID_objava,
        korisnik: korisnik._id
    })
    const spremljeniKomentar = await komentar.save()
    await korisnik.save()
    korisnik.komentari = korisnik.komentari.concat(spremljeniKomentar._id)
    res.json(spremljeniKomentar)
    
})

module.exports = komentariRouter