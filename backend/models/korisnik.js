const mongoose = require('mongoose')
const Objava = require('./objava')
// const uniqueValidator = require('mongoose-unique-validator')

const korisnikSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 5,
        maxLength: 10
    },
    ime: {
        type: String,
        minLength: 6,
        maxLength: 25
    },
    passHash: String,
    objave: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Objava'
        }
    ],
    komentari: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Komentar'
        }
    ]
})
// korisnikSchema.plugin(uniqueValidator)
korisnikSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passHash
        return ret
    }
})

const Korisnik = mongoose.model('Korisnik', korisnikSchema, 'korisnici')

module.exports = Korisnik