const mongoose = require('mongoose')

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
    komentari: {
        type: Array,
        default: []
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

module.exports = mongoose.model('Objava', objavaSchema, 'objave')