import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import  Objava from '../components/Objava'

describe('Komponenta <Objava/>', ()=>{

    const objava = {
        id: '12345',
        sadrzaj: 'Test sadrzaj',
        datum: '2011-10-05T14:48:00.000Z',
        korisnik: {
            username: 'usernameTest',
            id: '1t2e3s4t'
        },
        likeovi: ['1111','2222']
    }
    const komentari = [
        {
            id: '12345',
            sadrzaj: 'Test komentar',
            datum: '2011-10-05T14:48:00.000Z',
            objava: {
                id: '12345'
            },
            korisnik: {
                username: 'usernameTest',
                id: '1t2e3s4t'
            }
        }
    ]
    var korisnik = {
        ime: 'Test Korisnik',
        username: 'usernameTest',
        id: '1t2e3s4t'
    }
    
    test('Objava ima element sa sadržajem objave i sadržajem komentara', ()=>{
        const komponenta = render(<Objava korisnik={korisnik} objava={objava} komentari={komentari}/>)
        const sadrzajObj = komponenta.container.getElementsByClassName('form-control border-0')[0]
        expect(sadrzajObj).toHaveTextContent('Test sadrzaj')
        const sadrzajKom = komponenta.container.getElementsByClassName('col text-secondary komentar-sadr')[0]
        expect(sadrzajKom).toHaveTextContent('Test komentar')
    })

    test('Klik gumba za komentiranje onemogućuje gumb za lajkanje', ()=>{
        const komponenta = render(<Objava korisnik={korisnik} objava={objava} komentari={komentari}/>)
        const btnLike = komponenta.container.getElementsByClassName('btn btn-tertiary text-secondary')[0]
        expect(btnLike).not.toBeDisabled()
        const btnKomentiraj = komponenta.container.getElementsByClassName('btn btn-tertiary text-secondary')[1]
        fireEvent.click(btnKomentiraj)
        expect(btnLike).toBeDisabled()
    })

    test('Gumb za izbornik nije vidljiv ako objava ne pripada korisniku', ()=>{
        korisnik = {
            ime: 'Test Other',
            username: 'usernameOther',
            id: 'o1t2h3e4r'
        }
        const komponenta = render(<Objava korisnik={korisnik} objava={objava} komentari={komentari}/>)
        const btnLike = komponenta.container.getElementsByClassName('btn btn-tertiary text-secondary')[0]
        expect(btnLike).not.toBeDisabled()
        const btnKomentiraj = komponenta.container.getElementsByClassName('btn btn-tertiary text-secondary')[1]
        fireEvent.click(btnKomentiraj)
        expect(btnLike).toBeDisabled()
    })
})