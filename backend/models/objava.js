const mongoose = require('mongoose')
const Komentar = require('./komentar')
const Korisnik = require('./korisnik')

const objavaSchema = new mongoose.Schema({
    sadrzaj: {
        type: String,
        minLength: 5,
        maxLength: 160,
        required: true
    },
    datum: {
        type: String,
        required: true
    },
    likeovi: {
        type: Array,
        default: []
    },
    komentari: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Komentar'
        }
    ],
    korisnik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Korisnik'
    }
  })

  objavaSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
  })

const Objava = mongoose.model('Objava', objavaSchema, 'objave')

module.exports = Objava