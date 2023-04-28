const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Korisnik = require('../models/korisnik')

loginRouter.post('/', async(req, res, next)=>{

    const podaci = req.body
    const korisnik = await Korisnik.findOne({username: podaci.username})

    const passDobar = korisnik === null
    ? false
    : await bcrypt.compare(podaci.pass, korisnik.passHash)

    if(!(korisnik && passDobar)){
        res.status(401).json(
            {error: 'Neispravna lozinka ili korisničko ime'})
    } 

    const userToken = {
        username : korisnik.username,
        id : korisnik._id
    }
    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200).send(
        {token, 
        username: korisnik.username, 
        ime: korisnik.ime,
        objave: korisnik.objave,
        id: korisnik._id
    })

    next()
})

module.exports = loginRouter;
