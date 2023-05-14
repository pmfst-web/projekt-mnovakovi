import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import LoginForma from '../components/LoginForma'

describe('Komponenta <LoginForma/>', ()=>{

    test('Vrati formu ako korisnik nije prijavljen i ako nije u registracijskoj formi', ()=>{
        const korisnik = null
        const registracija = null

        const komponenta = render(
            <LoginForma korisnik={korisnik} registracija={registracija}/>
        )
        expect(komponenta.container).toBeTruthy()
    })

    test('Vrati null ako je korisnik u registracijskoj formi', ()=>{
        const korisnik = null
        const registracija = true

        const komponenta = render(
            <LoginForma korisnik={korisnik} registracija={registracija}/>
        )

        expect(komponenta.container).toBeEmptyDOMElement();
    })

    test('Pritisak gumba za registraciju skriva formu i poziva event handler postaviRegistracija', ()=>{
        const korisnik = null
        const registracija = null
        const postaviRegistracija = jest.fn()
        const postaviKorisnika = jest.fn()
          
        const komponenta = render(
            <LoginForma korisnik={korisnik} registracija={registracija} 
            postaviRegistracija={postaviRegistracija} postaviKorisnika={postaviKorisnika}/>
        )
        
        const btnRegistracija = komponenta.container.getElementsByClassName('btn btn-link btn-floating mb-1')[0]

        fireEvent.click(btnRegistracija)
        expect(postaviRegistracija.mock.calls).toHaveLength(1)
        komponenta.rerender()
        expect(komponenta.container).toBeEmptyDOMElement(); 
    })
})