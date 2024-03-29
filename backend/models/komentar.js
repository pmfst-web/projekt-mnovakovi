const mongoose = require('mongoose')
const Objava = require('./objava')
const Korisnik = require('./korisnik')

const komentarSchema = new mongoose.Schema({
    sadrzaj: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    objava: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Objava'
    },
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik'
    }
  })

  komentarSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
  })

const Komentar = mongoose.model('Komentar', komentarSchema, 'komentari')

module.exports = Komentar