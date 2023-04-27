const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const Objava = require('../models/objava')
const pomocni = require('./test-pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Testovi s objavama', () => {
    beforeEach( async () => {
        await Objava.deleteMany({})
        const korisnik = await api
        .post('/api/login')
        .send(pomocni.pocetniKorisnik)
        var novaObjava = new Objava({sadrzaj: pomocni.pocetneObjave[0].sadrzaj, korisnik: korisnik.body.id, datum: new Date().toISOString()})
        await novaObjava.save()
         novaObjava = new Objava({sadrzaj: pomocni.pocetneObjave[1].sadrzaj, korisnik: korisnik.body.id, datum: new Date().toISOString()})
        await novaObjava.save()
        novaObjava = new Objava({sadrzaj: pomocni.pocetneObjave[2].sadrzaj, korisnik: korisnik.body.id, datum: new Date().toISOString()})
        await novaObjava.save()
        
        
      })

      test('Dohvaćanje svih objava', async () => {
        const odgovor = await api.get('/api/objave')
        expect(odgovor.body).toHaveLength(3)  
      })

      test('Postavljanje nove objave', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pomocni.pocetniKorisnik)
        
        const novaObjava = {
            sadrzaj: "Nova objava",
            korisnikId: korisnik.body.id
        }

        const odgovor = await api
        .post('/api/objave')
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .send(novaObjava)

        const objaveNaKraju = await pomocni.objaveIzBaze()
        expect(objaveNaKraju).toHaveLength(4)
      })

      test('Postavljanje nove objave s previše kratkim sadržajem', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pomocni.pocetniKorisnik)
        
        const novaObjava = {
            sadrzaj: "Nova",
            korisnikId: korisnik.body.id
        }

        const odgovor = await api
        .post('/api/objave')
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .send(novaObjava)
        expect(odgovor.body.error).toContain('Objava mora imati između 5 i 160 znakova')

        const objaveNaKraju = await pomocni.objaveIzBaze()
        expect(objaveNaKraju).toHaveLength(3)
      })

      test('Postavljanje nove objave s neispravnim tokenom', async () => {
        const korisnik = await api
        .post('/api/login')
        .send(pomocni.pocetniKorisnik)
        
        const novaObjava = {
            sadrzaj: "Nova objava",
            korisnikId: korisnik.body.id
        }

        const kriviToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

        const odgovor = await api
        .post('/api/objave')
        .set('Authorization', kriviToken)
        .send(novaObjava)
        expect(odgovor.body.error).toContain('Neispravan token')

        const objaveNaKraju = await pomocni.objaveIzBaze()
        expect(objaveNaKraju).toHaveLength(3)
      })

      test('Brisanje objave', async () => {
        const pocetneObjave = await pomocni.objaveIzBaze()
        
        const korisnik = await api
        .post('/api/login')
        .send(pomocni.pocetniKorisnik)

        const odgovor = await api
        .delete(`/api/objave/${pocetneObjave[0].id}`)
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .expect(204)

        const objaveNaKraju = await pomocni.objaveIzBaze()
        expect(objaveNaKraju).toHaveLength(2)
        
      })

      test('Brisanje objave s neispravnim tokenom', async () => {
        const pocetneObjave = await pomocni.objaveIzBaze()

        const kriviToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

        const odgovor = await api
        .delete(`/api/objave/${pocetneObjave[0].id}`)
        .set('Authorization', kriviToken)
        .expect(401)

        const objaveNaKraju = await pomocni.objaveIzBaze()
        expect(objaveNaKraju).toHaveLength(3)
        
      })

      test('Uređivanje objave', async () => {
        const pocetneObjave = await pomocni.objaveIzBaze()
        
        const korisnik = await api
        .post('/api/login')
        .send(pomocni.pocetniKorisnik)

        const modObjava = {
            ...pocetneObjave[0],
            sadrzaj: "Prva objava uređena"
        }

        const odgovor = await api
        .put(`/api/objave/${pocetneObjave[0].id}`)
        .set('Authorization', `Bearer ${korisnik.body.token}`)
        .send(modObjava)
        .expect(200)

        const objaveNaKraju = await pomocni.objaveIzBaze()
        expect(objaveNaKraju[0].sadrzaj).toContain('uređena')
        
      })
})

afterAll(() => {
    mongoose.connection.close()
  })