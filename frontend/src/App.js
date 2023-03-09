import React, {useEffect, useState} from 'react'
import Objava from './components/Objava'
import NovaObjavaForma from './components/NovaObjavaForma'
import axios from 'axios'

const App = (props) => {

    const [objave, postaviObjave] = useState([])
    const [komentari, postaviKomentare] = useState([])

    useEffect(()=>{
        console.log('Dohvaćanje objava')
        axios.get('http://localhost:3001/api/objave')
        .then(res => postaviObjave(res.data))
    },[])

    useEffect(()=>{
        console.log('Dohvaćanje komentara')
        axios.get('http://localhost:3001/api/komentari')
        .then(res => postaviKomentare(res.data))
    },[])


    return(
        <div>
            <h1>Dodaj objavu</h1>
            <NovaObjavaForma objave={objave} postaviObjave={postaviObjave}/>
            <h1>Objave</h1>
            <ul>
                {
                    objave.map( o => <Objava objava={o} key={o.id} objave={objave} postaviObjave={postaviObjave} komentari={komentari} postaviKomentare={postaviKomentare}/>)
                }
            </ul>

        </div>
    )
}

export default App