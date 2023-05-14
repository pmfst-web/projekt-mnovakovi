const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const Objava = require('../models/objava')
const Komentar = require('../models/komentar')
const {pocetniKorisnik, pocetneObjave, pocetniKomentari, objaveIzBaze, komentariIzBaze} = require('./test-pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Testovi s komentarima', () =>{
    beforeEach( async () => {
        await Objava.deleteMany({})
        await Komentar.deleteMany({})
        const korisnik = await api
        .post('/api/login')
        .send(pocetniKorisnik)
        var novaObjava = new Objava({sadrzaj: pocetneObjave[0].sadrzaj, korisnik: korisnik.body.id, datum: new Date().toISOString()})
        const o1 = await novaObjava.save()
         novaObjava = new Objava({sadrzaj: pocetneObjave[1].sadrzaj, korisnik: korisnik.body.id, datum: new Date().toISOString()})
         const o2 = await novaObjava.save()
        novaObjava = new Objava({sadrzaj: pocetneObjave[2].sadrzaj, korisnik: korisnik.body.id, datum: new Date().toISOString()})
        const o3 = await novaObjava.save()  
        var noviKomentar = new Komentar({sadrzaj: pocetniKomentari[0].sadrzaj, korisnik: korisnik.body.id, objava: o1._id, datum: new Date().toISOString()})
        await noviKomentar.save()
        noviKomentar = new Komentar({sadrzaj: pocetniKomentari[1].sadrzaj, korisnik: korisnik.body.id, objava: o2._id, datum: new Date().toISOString()})
        await noviKomentar.save()
        noviKomentar = new Komentar({sadrzaj: pocetniKomentari[2].sadrzaj, korisnik: korisnik.body.id, objava: o3._id, datum: new Date().toISOString()})
        await noviKomentar.save()
    })
    
    test('Dohvaćanje svih komentara', async()=>{
        const odgovor = await komentariIzBaze()
        expect(odgovor).toHaveLength(3)
        expect(odgovor[0].sadrzaj).toContain('Pripadam prvoj objavi')
    })

    test('Postavljanje novog komentara', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pocetniKorisnik)

        const objave = await objaveIzBaze()
        const prvaObjava = objave[0]
        
        const noviKomentar = {
            sadrzaj: "Novi komentar",
            korisnik_ID: korisnik.body.id,
            objava_ID: prvaObjava.id
        }

        const odgovor = await api
        .post('/api/komentari')
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .send(noviKomentar)

        const komentariNaKraju = await komentariIzBaze()
        expect(komentariNaKraju).toHaveLength(4)

        const objaveNaKraju = await objaveIzBaze()
        expect(objaveNaKraju[0].komentari).toHaveLength(1)
    })

    test('Postavljanje novog komentara s previše kratkim sadržajem', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pocetniKorisnik)

        const objave = await objaveIzBaze()
        const prvaObjava = objave[0]
        
        const noviKomentar = {
            sadrzaj: "Novi",
            korisnik_ID: korisnik.body.id,
            objava_ID: prvaObjava.id
        }

        const odgovor = await api
        .post('/api/komentari')
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .send(noviKomentar)
        expect(odgovor.body.error).toContain('Komentar mora imati između 5 i 50 znakova')

        const komentariNaKraju = await komentariIzBaze()
        expect(komentariNaKraju).toHaveLength(3)

        const objaveNaKraju = await objaveIzBaze()
        expect(objaveNaKraju[0].komentari).toHaveLength(0)
    })

    test('Postavljanje novog komentara za objavu koja ne postoji', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pocetniKorisnik)
        
        const noviKomentar = {
            sadrzaj: "Novi komentar",
            korisnik_ID: korisnik.body.id,
            objava_ID: '644bb3facde46043bc515f69'
        }

        const odgovor = await api
        .post('/api/komentari')
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .send(noviKomentar)
        expect(odgovor.body.error).toContain('Pripadajuća objava ne postoji ili je obrisana')

        const komentariNaKraju = await komentariIzBaze()
        expect(komentariNaKraju).toHaveLength(3)

        const objaveNaKraju = await objaveIzBaze()
        expect(objaveNaKraju[0].komentari).toHaveLength(0)
    })

    test('Postavljanje novog komentara s neispravnim tokenom', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pocetniKorisnik)

        const objave = await objaveIzBaze()
        const prvaObjava = objave[0]
        
        const noviKomentar = {
            sadrzaj: "Novi komentar",
            korisnik_ID: korisnik.body.id,
            objava_ID: prvaObjava.id
        }

        const kriviToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

        const odgovor = await api
        .post('/api/komentari')
        .set('Authorization', kriviToken)
        .send(noviKomentar)
        expect(odgovor.body.error).toContain('Neispravan token')

        const komentariNaKraju = await komentariIzBaze()
        expect(komentariNaKraju).toHaveLength(3)

        const objaveNaKraju = await objaveIzBaze()
        expect(objaveNaKraju[0].komentari).toHaveLength(0)
    })

    test('Brisanje kometara', async () => {
        const pocetniKomentari = await komentariIzBaze()
        
        const korisnik = await api
        .post('/api/login')
        .send(pocetniKorisnik)

        const odgovor = await api
        .delete(`/api/komentari/${pocetniKomentari[0].id}`)
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .expect(204)

        const komentariNaKraju = await komentariIzBaze()
        expect(komentariNaKraju).toHaveLength(2)
    })

    
})