import React, {useEffect, useState} from 'react'
import Objava from './components/Objava'
import NovaObjavaForma from './components/NovaObjavaForma'
import LoginForma from './components/LoginForma'
import RegisterForma from './components/RegisterForma'
import axios from 'axios'

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

    return(
        <div>
            <RegisterForma registracija={registracija} postaviRegistracija={postaviRegistracija}/>
            <LoginForma korisnik={korisnik} postaviKorisnika={postaviKorisnika} postaviRegistracija={postaviRegistracija} registracija={registracija}/>
            <NovaObjavaForma objave={objave} postaviObjave={postaviObjave} korisnik={korisnik}/>
            <h1>Objave</h1>
            <ul>
                {
                    objave.map( o => <Objava objava={o} key={o.id} objave={objave} postaviObjave={postaviObjave} komentari={komentari} postaviKomentare={postaviKomentare} korisnik={korisnik}/>)
                }
            </ul>

        </div>
    )
}

export default App