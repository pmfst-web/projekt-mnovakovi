import React, {useEffect, useState} from 'react'
import NovaObjavaForma from './components/NovaObjavaForma'
import LoginForma from './components/LoginForma'
import RegisterForma from './components/RegisterForma'
import NavTraka from './components/NavTraka'
import SveObjave from './components/SveObjave'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import objaveAkcije from './components/services/objave'
import komentariAkcije from './components/services/komentari'

const App = (props) => {

    const [objave, postaviObjave] = useState([])
    const [komentari, postaviKomentare] = useState([])
    const [korisnik, postaviKorisnika] = useState(null)
    const [registracija, postaviRegistracija] = useState(false)

    useEffect(()=>{
        console.log('Dohvaćanje objava')
        axios.get('http://localhost:3001/api/objave')
        .then(res => {
            postaviObjave(res.data)
        })
    },[])

    useEffect(()=>{
        console.log('Dohvaćanje komentara')
        axios.get('http://localhost:3001/api/komentari')
        .then(res => {
            postaviKomentare(res.data)
        })
    },[])

    useEffect( () => {
            const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
            if (logiraniKorisnikJSON) {
            const korisnik = JSON.parse(logiraniKorisnikJSON)
            postaviKorisnika(korisnik)
            objaveAkcije.postaviToken(korisnik.token)
            komentariAkcije.postaviToken(korisnik.token)
            }
        }, [])

    return(
        <div className='white'  style = {{height:"100vh"}}>

            <NavTraka korisnik={korisnik} 
            postaviKorisnika={postaviKorisnika}/>

            <RegisterForma registracija={registracija} 
            postaviRegistracija={postaviRegistracija}/>

            <LoginForma korisnik={korisnik} 
            postaviKorisnika={postaviKorisnika} 
            postaviRegistracija={postaviRegistracija} 
            registracija={registracija}/>

            <NovaObjavaForma objave={objave} 
            postaviObjave={postaviObjave} 
            korisnik={korisnik}/>

            <SveObjave objave={objave} 
            postaviObjave={postaviObjave} 
            komentari={komentari} 
            postaviKomentare={postaviKomentare} 
            korisnik={korisnik}/>
            
        </div>
    )
}

export default App