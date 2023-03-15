const komentariRouter = require('express').Router()
const Komentar = require('../models/komentar')

komentariRouter.get('/', async (req, res) => {
    const rezultat = await Komentar.find({})
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

komentariRouter.put('/:id', (req, res) => {
    const podatak = req.body
    const id = req.params.id
  
    const komentar = {
        sadrzaj: podatak.sadrzaj,
        datum: podatak.datum,
        ID_objava: podatak.ID_objava
    }
  
    Komentar.findByIdAndUpdate(id, komentar, {new: true})
    .then( noviKomentar => {
        res.json(noviKomentar)
    })
    .catch(err => next(err))
  
})

komentariRouter.post('/', async (req, res, next) => {
    const podatak = req.body
  
    const komentar = new Komentar({
        sadrzaj: podatak.sadrzaj,
        datum: new Date().toISOString(),
        ID_objava: podatak.ID_objava
    })
    const spremljeniKomentar = await komentar.save()
        res.json(spremljeniKomentar)
    
})

module.exports = komentariRouter