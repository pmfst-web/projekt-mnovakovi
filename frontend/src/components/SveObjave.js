import React, {useEffect, useState} from 'react'
import Objava from './Objava'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../index.css"

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
            <div className='container mt-5 wh-100'>
                <div className='col'>
                <h1>Objave</h1>
                <div className='form-check form-check-inline'>
                    <input className='form-check-input' type="radio" onClick={promijeniPrikaz} id="sve" name='prikazObjave' value="sve" defaultChecked></input>
                    <label className='form-check-label sve' htmlFor='sve'>Sve objave</label>
                </div>
                <div className='form-check form-check-inline'>
                    <input className='form-check-input' type="radio" onClick={promijeniPrikaz} id="moje" name='prikazObjave' value="moje"></input>
                    <label className='form-check-label moje' htmlFor='moje'>Moje objave</label>
                </div>
                
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
                
            </div>
        )
    }
    else{
        return null
    }
}

export default SveObjave