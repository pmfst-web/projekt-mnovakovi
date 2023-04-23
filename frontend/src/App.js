import React, {useEffect, useState} from 'react'
import Objava from './components/Objava'
import NovaObjavaForma from './components/NovaObjavaForma'
import LoginForma from './components/LoginForma'
import RegisterForma from './components/RegisterForma'
import SveObjave from './components/SveObjave'
import axios from 'axios'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

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
        <div  style = {{height:"100vh"}}>
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