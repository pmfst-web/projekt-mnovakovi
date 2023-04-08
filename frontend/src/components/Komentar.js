import React, {useEffect, useState} from 'react'
import axios from 'axios'
import komentariAkcije from './services/komentari'
import objaveAkcije from './services/objave'

const Komentar = (props) => {

    const [pripada, postaviPripada] = useState(props.korisnik ? true : false)

    useEffect(()=>{
        if(props.korisnik){
            postaviPripada(props.korisnik.id === props.komentar.korisnik.id)            
        }
    }, [props.korisnik])

    const obrisiKomentar = () => {
        komentariAkcije.brisi(props.komentar.id)
        .then(res => {
            props.postaviKomentare(props.komentari.filter(k => k.id !== props.komentar.id))
        })
        
    }
    return(
        <div>
            {props.komentar.sadrzaj}
            <button onClick={obrisiKomentar} hidden={!pripada}>Obriši</button>
        </div>
    )
}

export default Komentar