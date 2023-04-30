import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import  SveObjave from '../components/SveObjave'

describe('Komponenta <SveObjave/>', ()=>{

    var komponenta

    beforeEach(()=>{
        const objave = [
        {id: '11111',
        sadrzaj: 'Test sadrzaj 1',
        datum: '2011-10-05T14:48:00.000Z',
        korisnik: {
            username: 'usernameTest',
            id: '1t2e3s4t'
        },
        likeovi: ['1234']},
        {id: '22222',
        sadrzaj: 'Test sadrzaj 2',
        datum: '2011-10-05T14:48:00.000Z',
        korisnik: {
            username: 'usernameTest',
            id: '1t2e3s4t'
        },
        likeovi: ['1234']},
        {id: '33333',
        sadrzaj: 'Test sadrzaj 3',
        datum: '2011-10-05T14:48:00.000Z',
        korisnik: {
            username: 'usernameOther',
            id: 'o1t2h3e4r'
        },
        likeovi: ['1234']},
        {id: '44444',
        sadrzaj: 'Test sadrzaj 4',
        datum: '2011-10-05T14:48:00.000Z',
        korisnik: {
            username: 'usernameOther',
            id: 'o1t2h3e4r'
        },
        likeovi: ['1234']},
    ]
    const korisnik = {
        ime: 'Test Korisnik',
        username: 'usernameTest',
        id: '1t2e3s4t'
    }
    const komentari = [
        {
            id: '12345',
            sadrzaj: 'Test komentar',
            datum: '2011-10-05T14:48:00.000Z',
            objava: {
                id: '11111'
            },
            korisnik: {
                username: 'usernameTest',
                id: '1t2e3s4t'
            }
        },
        {
            id: '54321',
            sadrzaj: 'Test komentar 2',
            datum: '2011-10-05T14:48:00.000Z',
            objava: {
                id: '22222'
            },
            korisnik: {
                username: 'usernameTest',
                id: '1t2e3s4t'
            }
        }
    ]
    komponenta = render(<SveObjave objave={objave} korisnik={korisnik} komentari={komentari}/>)
})

    test('Renderira onoliko objava koliko je proslijeđeno props elementu', ()=>{
        const renderiraneObjave = komponenta.container.getElementsByClassName('card shadow mt-3 col-lg-7')
        expect(renderiraneObjave).toHaveLength(4)
    })

    test('Odabir prikaza samo korisnikovih objava renderira samo korisnikove objave', ()=>{
        const renderiraneObjave = komponenta.container.getElementsByClassName('card shadow mt-3 col-lg-7')
        expect(renderiraneObjave).toHaveLength(4)
        const labelMoje = komponenta.container.getElementsByClassName('form-check-label moje')[0]
        fireEvent.click(labelMoje)
        expect(renderiraneObjave).toHaveLength(2)
    })
})