import React, {useEffect, useState} from 'react'
import axios from 'axios'
import komentariAkcije from './services/komentari'
import objaveAkcije from './services/objave'

const Komentar = ({komentar, komentari, postaviKomentare, korisnik}) => {

    const [pripada, postaviPripada] = useState(korisnik ? true : false)

    useEffect(()=>{
        if(korisnik){
            postaviPripada(korisnik.id === komentar.korisnik.id)            
        }
    }, [korisnik])

    const obrisiKomentar = () => {
        komentariAkcije.brisi(komentar.id)
        .then(res => {
            postaviKomentare(komentari.filter(k => k.id !== komentar.id))
        })
        
    }
    return(
        <div>
            {komentar.sadrzaj}
            <button onClick={obrisiKomentar} hidden={!pripada}>Obriši</button>
        </div>
    )
}

export default Komentar