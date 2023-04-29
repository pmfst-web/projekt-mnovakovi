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

})
