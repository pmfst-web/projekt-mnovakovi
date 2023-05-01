import React, {useEffect, useState} from 'react'
import komentariAkcije from './services/komentari'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../node_modules/bootstrap/dist/js/bootstrap"
import "../index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

library.add(faTrashCan)

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
        <div className='d-flex justify-content-between border-bottom border-2'>
            <div className='col my-1 align-items-start'>
                <span className=' col fw-bold me-2'>{komentar.korisnik.username}:</span>
                <span className='col text-secondary komentar-sadr'>{komentar.sadrzaj}</span>
            </div>
            <div className=' d-flex'></div>
            <button type='button' className='btn btn-tertiary text-danger py-0' onClick={obrisiKomentar} hidden={!pripada}><FontAwesomeIcon icon={faTrashCan}/>  Obriši</button>
        </div>
    )
}

export default Komentar