const logger = require('./logger')

const zahtjevInfo = (req, res, next) => {  
  logger.info('Metoda:', req.method)
  logger.info('Putanja:', req.path)
  logger.info('Tijelo:', req.body)
  logger.info('---')
  next()
}

const nepoznataRuta = (req, res) => {
  res.status(404).send({ error: 'nepostojeca ruta' })
}

const errorHandler = (err, req, res, next ) => {
  logger.greska(err.message);

  if (err.name === 'CastError') {
      console.log(err.message)
      return res.status(400).send({error: 'krivi format ID-a'})
  } else if (err.name === 'ValidationError'){
      if(err.message.startsWith('Objava validation failed')){
        return res.status(400).json({error: 'Objava mora imati između 5 i 160 znakova'})
      }
      return res.status(400).send({error: err.message})
  }  else if (err.name === 'JsonWebTokenError'){
      return res.status(401).json({error: 'nesipravni token'})
  } else if(err.name ==='MongoServerError' && err.code === 11000){
    return res.status(422).json({error: 'Korisnik s ovim korisničkim imenom već postoji'})
  }
  next(err)
}

module.exports = {zahtjevInfo, nepoznataRuta, errorHandler}