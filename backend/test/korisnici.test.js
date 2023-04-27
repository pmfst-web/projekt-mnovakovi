const bcrypt = require('bcrypt')
const Korisnik = require('../models/korisnik')
const pomocni = require('./test-pomocni')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('Testovi s korisnicima', () => {
    beforeEach(async () => {
        await Korisnik.deleteMany({})
        const passHash = await bcrypt.hash(pomocni.pocetniKorisnik.pass, 10)
        const korisnik = new Korisnik({ime: pomocni.pocetniKorisnik.ime, username: pomocni.pocetniKorisnik.username, passHash})
        await korisnik.save()
    })

    test('Novi korisnik', async () =>{
        const novi = {
            username: 'testJedan',
            ime: 'Test Jedan',
            pass: 'testtest'
        }

        await api
        .post('/api/korisnici')
        .send(novi)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const korisniciKraj = await pomocni.korisniciIzBaze()
        expect(korisniciKraj).toHaveLength(2)

        const korImena = korisniciKraj.map(u => u.username)
        expect(korImena).toContain(novi.username)
    })

    test('Novi korisnik sa zauzetim korisničkim imenom', async () =>{
        const novi = {
            username: 'pKorisnik',
            ime: 'Test Dva',
            pass: 'testtest'
        }

        const rezultat = await api
        .post('/api/korisnici')
        .send(novi)
        .expect(422)
        .expect('Content-Type', /application\/json/)

        expect(rezultat.body.error).toContain('Korisnik s ovim korisničkim imenom već postoji')

        const korisniciKraj = await pomocni.korisniciIzBaze()
        expect(korisniciKraj).toHaveLength(1)
        })
    
    test('Novi korisnik sa previše kratkim korisničkim imenom', async () =>{
        const novi = {
            username: 't3',
            ime: 'Test Tri',
            pass: 'testtest'
        }
        const novi2 = {
            username: 'testTri',
            ime: 'Test Tri',
            pass: 't3'
        }
    
        const rezultat = await api
        .post('/api/korisnici')
        .send(novi)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
        expect(rezultat.body.error).toContain('Korisničko ime mora imati između 5 i 15 znakova')
    
        const korisniciKraj = await pomocni.korisniciIzBaze()
        expect(korisniciKraj).toHaveLength(1)
        })
    
    test('Prijava korisnika', async () =>{
        const korisnik = {
            username: 'pKorisnik',
            pass: 'password'
        }
        await api
        .post('/api/login')
        .send(korisnik)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('Prijava nepostojećeg korisnika', async () =>{
        const korisnik = {
            username: 'testPet',
            pass: 'password'
        }
        const rezultat = await api
        .post('/api/login')
        .send(korisnik)
        .expect(401)
        .expect('Content-Type', /application\/json/)
        expect(rezultat.body.error).toContain('Neispravna lozinka ili korisničko ime')
    })
    
})

afterAll(() => {
    mongoose.connection.close()
  })