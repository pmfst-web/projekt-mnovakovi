const objaveRouter = require('express').Router()
const Objava = require('../models/objava')

objaveRouter.get('/', async (req, res) => {
    const rezultat = await Objava.find({})
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

objaveRouter.put('/:id', (req, res) => {
    const podatak = req.body
    const id = req.params.id
  
    const objava = {
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        likeovi: podatak.likeovi,
        komentari: podatak.komentari
    }
  
    Objava.findByIdAndUpdate(id, objava, {new: true})
    .then( novaObjava => {
        res.json(novaObjava)
    })
    .catch(err => next(err))
  
})

objaveRouter.post('/', async (req, res, next) => {
    const podatak = req.body
  
    const objava = new Objava({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString()
    })
    const spremljenaObjava = await objava.save()
        res.json(spremljenaObjava)
    
})

module.exports = objaveRouter

