import React, { useState} from 'react'
import Objava from './Objava'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../node_modules/bootstrap/dist/js/bootstrap"
import "../index.css"

const SveObjave = ({objave, postaviObjave, komentari, postaviKomentare, korisnik}) =>{

    const [prikaz, postaviPrikaz] = useState("Sve objave")
    const [sortiraj, postaviSortiraj] = useState("Prvo najstarije")

    const promijeniPrikazSve = (e) =>{
        postaviPrikaz("Sve objave")
    }

    const promijeniPrikazMoje = (e) =>{
        postaviPrikaz("Moje objave")
    }

    const promijeniSortirajUzlazno = () =>{
        postaviSortiraj("Prvo najstarije")
    }

    const promijeniSortirajSilazno = () =>{
        postaviSortiraj("Prvo najnovije")
    }

    const vratiDatum = (a,b) => {
        return Number(new Date(a.datum)) - Number(new Date(b.datum))
    }

    const objaveZaPrikaz = () => {
        var zaPrikaz
        if(prikaz==="Sve objave"){
            zaPrikaz = objave
        }
        else{
            zaPrikaz = objave.filter(o=>o.korisnik.id===korisnik.id)
        }
        if(sortiraj==="Prvo najstarije"){
            zaPrikaz.sort(vratiDatum)
        }
        else{
            zaPrikaz.sort(vratiDatum).reverse()
        }
        return zaPrikaz
    }

    if(korisnik){
        return(
            <div className='container mt-5 wh-100'>
                <div className='col'>
                    <h1>Objave</h1>
                    <span className="dropdown me-1">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {prikaz}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href={this} onClick={promijeniPrikazSve}>Sve</a></li>
                            <li><a className="dropdown-item" href={this} onClick={promijeniPrikazMoje}>Samo moje</a></li>
                        </ul>
                    </span>
                    <span className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {sortiraj}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href={this} onClick={promijeniSortirajUzlazno}>Prvo najstarije</a></li>
                            <li><a className="dropdown-item" href={this} onClick={promijeniSortirajSilazno}>Prvo najnovije</a></li>
                        </ul>
                    </span>
                    
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