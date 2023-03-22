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

  //KASKADIRANJE?
  //prema službenoj dokumentaciji findByIdAndRemove() funkcija okida findOneAndRemove() middleware
  komentarSchema.post('findOneAndRemove', async function(){ 
    await Objava.findByIdAndUpdate(this.objava, {$pull: {"komentari": {_id: this._id}}}).exec()
    await Korisnik.findByIdAndUpdate(this.korisnik, {$pull: {"komentari": {_id: this._id}}}).exec()
  })

  //prema službenoj dokumentaciji save() funkcija okida validate() hook
  komentarSchema.post('validate', async function(){
    const objava = await Objava.findByIdAndUpdate(this.objava._id, {$push: {"komentari": {_id: this._id}}}).exec()
    await Korisnik.findByIdAndUpdate(this.korisnik._id, {$push: {"komentari": {_id: this._id}}}).exec()
    
  })


const Komentar = mongoose.model('Komentar', komentarSchema, 'komentari')

module.exports = Komentar