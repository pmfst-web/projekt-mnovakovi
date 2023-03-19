const jwt = require('jsonwebtoken')

const dohvatiToken = (req) =>{
  //token je zapisan u zaglavlju
  const auth = req.get('authorization')
  if( auth && auth.toLowerCase().startsWith('bearer')){
    return auth.substring(7) //token
  }
  return null
}

const verificirajToken = (token) =>{
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {dohvatiToken, verificirajToken}