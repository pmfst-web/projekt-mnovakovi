import React, {useEffect, useState} from 'react'
import Objava from './Objava'

const SveObjave = ({objave, postaviObjave, komentari, postaviKomentare, korisnik}) =>{

    const [prikaz, postaviPrikaz] = useState("sve")

    const promijeniPrikaz = (e) =>{
        if(e.target.checked){
            postaviPrikaz(e.target.value)
        }
    }

    const objaveZaPrikaz = () =>{
        if(prikaz=="sve")
        return objave
        else
        return objave.filter(o=>o.korisnik.id===korisnik.id)
    }

    if(korisnik){
        return(
            <div>
                <h1>Objave</h1>
                <input type="radio" onClick={promijeniPrikaz} id="sve" name='prikazObjave' value="sve" defaultChecked></input>
                <label htmlFor='sve'>Sve objave</label>
                <input type="radio" onClick={promijeniPrikaz} id="moje" name='prikazObjave' value="moje"></input>
                <label htmlFor='moje'>Moje objave</label>
                <ul>
                {
                    objaveZaPrikaz().map( o => 
                    <Objava objava={o} 
                    key={o.id} 
                    objave={objave} 
                    postaviObjave={postaviObjave} 
                    komentari={komentari} 
                    postaviKomentare={postaviKomentare} 
                    korisnik={korisnik}/>)
                }
            </ul>
            </div>
        )
    }
    else{
        return null
    }
}

export default SveObjave