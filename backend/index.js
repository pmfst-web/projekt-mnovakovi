const app = require('./app')  // Express aplikacija
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
})

// let objave = [
//   {
//     id: 1,
//     sadrzaj: 'Prva objava',
//     datum: '2019-05-30T17:30:31.098Z',
//     likeovi: [],
//     komentari: [1]
//   },
//   {
//     id: 2,
//     sadrzaj: 'Druga objava',
//     datum: '2019-05-30T17:30:31.098Z',
//     likeovi: [],
//     komentari: [2]
//   },
//   {
//     id: 3,
//     sadrzaj: 'Treća objava',
//     datum: '2019-05-30T17:30:31.098Z',
//     likeovi: [],
//     komentari: [3]
//   }
// ]
// let komentari = [
//   {
//     id: 1,
//     sadrzaj: 'Prvi komentar prve objave',
//     datum: '2019-05-30T17:30:31.098Z',
//     ID_objava: 1
//   },
//   {
//     id: 2,
//     sadrzaj: 'Prvi komentar druge objave',
//     datum: '2019-05-30T17:30:31.098Z',
//     ID_objava: 2
//   },
//   {
//     id: 3,
//     sadrzaj: 'Prvi komentar treće objave',
//     datum: '2019-05-30T17:30:31.098Z',
//     ID_objava: 3
//   }
// ]



// const express = require('express')
// const cors = require('cors')
// const app = express()
// app.use(express.json())
// app.use(cors())
  
// app.get('/', (req, res) =>{
//     res.send('<h1>Pozdrav od Express servera!</h1>')
// })

// app.get('/api/objave', (req, res) =>{
//     res.json(objave)
// })

// app.get('/api/komentari', (req, res) =>{

//     res.json(komentari)
// })

// app.get('/api/objave/:id', (req, res) =>{
//     const id = Number(req.params.id)
//     const objava = objave.find(o => o.id === id)
  
//     if (objava){
//         res.json(objava)
//     } 
//     else {
//         res.status(404).end()
//     }
// })

// app.get('/api/komentari/:id', (req, res) =>{
//     const id = Number(req.params.id)
//     const komentar = komentari.find(k => k.id === id)
    
//     if (komentar){
//       res.json(komentar)
//     } 
//     else {
//       res.status(404).end()
//     }
// })

// app.delete('/api/objave/:id', (req, res) => {
//     const id = Number(req.params.id)
//     objave = objave.filter(o => o.id !== id)
    
//     res.status(204).end()
// })

// app.delete('/api/komentari/:id', (req, res) => {
//     const id = Number(req.params.id)
//     komentari = komentari.filter(k => k.id !== id)
    
//     res.status(204).end()
// })

// app.post('/api/objave', (req, res) => {

//     const podatak = req.body
//     if(!podatak.sadrzaj){
//       return res.status(400).json({
//         error: 'Nedostaje sadržaj'
//       })
//     }
    
//     const objava = {
//         id: generirajID(objave),
//         sadrzaj: podatak.sadrzaj,
//         datum: new Date().toISOString(),
//         likeovi: [],
//         komentari: podatak.komentari
//     }
//     objave = objave.concat(objava)
    
//     res.json(objava)
// })

// app.post('/api/komentari', (req, res) => {

//     const podatak = req.body
//     if(!podatak.sadrzaj){
//       return res.status(400).json({
//         error: 'Nedostaje sadržaj'
//       })
//     }
    
//     const komentar = {
//         id: generirajID(komentari),
//         sadrzaj: podatak.sadrzaj,
//         datum: new Date().toISOString(),
//         ID_objava: podatak.ID_objava
//     }
//     komentari = komentari.concat(komentar)
    
//     res.json(komentar)
// })

// app.put('/api/objave/:id', (req,res) =>{
//     const id =Number(req.params.id)
//     const modObjava = req.body
//     objave = objave.map(o => o.id !== id ? o : modObjava)
//     res.json(modObjava)
// })

// const generirajID = (arr) => {
//     const maxId = arr.length > 0
//       ? Math.max(...arr.map(a => a.id))
//       : 0
//     return maxId + 1
// }

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
// })

