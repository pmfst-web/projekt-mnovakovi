const Korisnik = require('../models/korisnik')
const Objava = require('../models/objava')
const Komentar = require('../models/komentar')

const pocetniKorisnik = {
    ime: "Pocetni Korisnik",
    pass: 'password',
    username: 'pKorisnik'
}


const pocetneObjave = [
    {
        sadrzaj: "Prva objava",
    },
    {
        sadrzaj: "Druga objava",
    },
    {
        sadrzaj: "Treća objava",
    }
]

const pocetniKomentari = [
    {
        sadrzaj: "Pripadam prvoj objavi",
    },
    {
        sadrzaj: "Pripadam drugoj objavi",
    },
    {
        sadrzaj: "Pripadam trećoj objavi",
    }
]

const korisniciIzBaze = async () => {
    const korisnici = await Korisnik.find({})
    return korisnici.map(k => k.toJSON())
}

const objaveIzBaze = async () => {
    const objave = await Objava.find({})
    return objave.map(o => o.toJSON())
}

const komentariIzBaze = async () => {
    const komentari = await Komentar.find({})
    return komentari.map(k => k.toJSON())
}

module.exports = {
    pocetniKorisnik, pocetneObjave, pocetniKomentari, korisniciIzBaze, objaveIzBaze, komentariIzBaze
}