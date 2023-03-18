const objaveRouter = require('express').Router()
const Objava = require('../models/objava')
const Korisnik = require('../models/korisnik')

objaveRouter.get('/', async (req, res) => {
    const rezultat = await Objava.find({})
    .populate('korisnik', {_id: 1})
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
    await Objava.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

objaveRouter.put('/:id', async (req, res) => {
    const podatak = req.body
    const id = req.params.id
  
    const objava = {
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        likeovi: podatak.likeovi,
        komentari: podatak.komentari
    }
  
    const novaObjava = await Objava.findByIdAndUpdate(id, objava, {new: true})
    res.json(novaObjava)
  
})

objaveRouter.post('/', async (req, res, next) => {
    const podatak = req.body
    const korisnik = await Korisnik.findById(podatak.korisnikId)
  
    const objava = new Objava({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        korisnik: podatak.korisnikId
    })
    const spremljenaObjava = await objava.save()
    korisnik.objave = korisnik.objave.concat(spremljenaObjava._id)
    await korisnik.save()
    res.json(spremljenaObjava)
    
})

module.exports = objaveRouter

