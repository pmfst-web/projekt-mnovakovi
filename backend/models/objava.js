const mongoose = require('mongoose')
const Komentar = require('./komentar')
const Korisnik = require('./korisnik')

const objavaSchema = new mongoose.Schema({
    sadrzaj: {
        type: String,
        minlength: 5,
        maxlength: 160,
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

  //KASKADIRANJE?

  //prema službenoj dokumentaciji findByIdAndRemove() funkcija okida findOneAndRemove() middleware
  objavaSchema.post('findOneAndRemove', async function(){
    await Komentar.deleteMany({objava: this._id}).exec()
    await Korisnik.findByIdAndUpdate(this.korisnik, {$pull: {"objave": {_id: this._id}}}).exec()
    
  })

  //prema službenoj dokumentaciji save() funkcija okida validate() hook
  objavaSchema.post('validate', async function(){
    await Korisnik.findByIdAndUpdate(this.korisnik._id, {$push: {"objave": {_id: this._id}}}).exec()
    
  })


const Objava = mongoose.model('Objava', objavaSchema, 'objave')

module.exports = Objava