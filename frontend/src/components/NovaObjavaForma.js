import React, {useEffect, useState} from 'react'
import axios from 'axios'
import objaveAkcije from './services/objave'

const NovaObjavaForma = ({objave, postaviObjave, korisnik}) =>{
    const [unosSadrzaja, postaviUnos] = useState('')

    const promjenaSadrzaja = (e) => {
        postaviUnos(e.target.value)
      }

    const novaObjava = (e) =>{
        e.preventDefault()
        objaveAkcije.postaviToken(korisnik.token)
        console.log(korisnik.token)
        const novaObjava = {
            sadrzaj: unosSadrzaja,
            korisnikId: korisnik.id
        }
        console.log(korisnik.id)
        objaveAkcije.stvori(novaObjava)
        .then(res => {
            const odgovor = {
                ...res.data,
                korisnik: {id: korisnik.id}
            }
            postaviObjave(objave.concat(odgovor))
            console.log(res.data)
            postaviUnos('')
        })  
    }

    if(korisnik){
        return(
            <div>
                <h1>Dodaj objavu</h1>
                <form onSubmit={novaObjava}>
                    <input value={unosSadrzaja} onChange={promjenaSadrzaja}></input>
                    <button type='submit'>Objavi</button>
                </form>
            </div>           
        )
    }
    else{
        return null
    }
    

}

export default NovaObjavaForma