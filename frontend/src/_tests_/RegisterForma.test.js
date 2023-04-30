import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import  RegisterForma from '../components/RegisterForma'

describe('Komponenta <RegisterForma/>', ()=>{
    test('Vrati formu ako je korisnik u registracijskoj formi', ()=>{
        const registracija = true

        const komponenta = render(
            <RegisterForma registracija={registracija}/>
        )
        expect(komponenta.container).toBeTruthy()
    })

    test('Vrati null ako korisnik nije u registracijskoj formi', ()=>{
        const registracija = false

        const komponenta = render(
            <RegisterForma registracija={registracija}/>
        )
        expect(komponenta.container).toBeEmptyDOMElement(); 
    })

    test('Izbaci upozorenje ako je pri registraciji neko od traženih polja prazno', async()=>{
        const registracija = true
        const postaviRegistracija = jest.fn()

        const komponenta = render(
            <RegisterForma registracija={registracija} postaviRegistracija={postaviRegistracija}/>
        )
        
        const btnRegistracija = komponenta.container.getElementsByClassName('btn btn-primary form-control mt-3')[0]
        fireEvent.click(btnRegistracija)
        
        
        const upozorenje = komponenta.container.getElementsByClassName('alert alert-danger py-2 mt-2')[0]
        expect(upozorenje).toBeVisible()
    })

    test('Pritisak gumba za prijavu skriva formu i poziva event handler postaviRegistracija', ()=>{
        const registracija = true
        const postaviRegistracija = jest.fn()
          
        const komponenta = render(
            <RegisterForma registracija={registracija} 
            postaviRegistracija={postaviRegistracija}/>
        ) 
        
        const btnLogin = komponenta.container.getElementsByClassName('btn btn-link btn-floating mb-1')[0]

        fireEvent.click(btnLogin)
        expect(postaviRegistracija.mock.calls).toHaveLength(1)
        komponenta.rerender()
        expect(komponenta.container).toBeEmptyDOMElement(); 
    })

})
