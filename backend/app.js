const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const objaveRouter = require('./controllers/objave')
const komentariRouter = require('./controllers/komentari')
const korisniciRouter = require('./controllers/korisnici')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Spajam se na bazu')

mongoose.connect(config.DB_URI,)
.then(result => {
  logger.info("Spojeni smo na bazu");
}).catch(error => {
  logger.greska("Greška pri spajanju", error.message);
})


app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.zahtjevInfo)

app.use('/api/objave', objaveRouter)
app.use('/api/komentari', komentariRouter)
app.use('/api/korisnici', korisniciRouter)
app.use('/api/login', loginRouter)

app.use(middleware.nepoznataRuta)
app.use(middleware.errorHandler)

module.exports = app