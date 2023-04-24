import React, {useEffect, useState} from 'react'
import Komentar from './Komentar'
import axios from 'axios'
import objaveAkcije from './services/objave'
import komentariAkcije from './services/komentari'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../node_modules/bootstrap/dist/js/bootstrap"
import "../index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {faComment} from '@fortawesome/free-solid-svg-icons'
import {faEllipsis} from '@fortawesome/free-solid-svg-icons'


library.add(faThumbsUp, faComment, faEllipsis)

const UrediObjavu = ({uredjivanje, ponistiUredjivanje, osvjeziSadrzaj}) => {

    if(uredjivanje){
        return(
            <form onSubmit={osvjeziSadrzaj}>
                <button type='submit'>Potvrdi</button>
                <button onClick={ponistiUredjivanje}>Odustani</button>
            </form>
        )
    }
    else{
        return null
    }
}

const NoviKomentar = ({komentiranje, postaviKomentiranje, komentari, postaviKomentare, objava, objave, korisnik}) => {
    const [komentarNoviSadrzaj, postaviKomentrNovi] = useState('')

    useEffect(()=>{
        if(korisnik){
            komentariAkcije.postaviToken(korisnik.token)
        }
    }, [korisnik, objave])

    const promijeniKomentarNovi = (e) =>{
        postaviKomentrNovi(e.target.value)
    }

    const dodajKomentar = (e) =>{
        e.preventDefault()
        const komentarNovi = {
            sadrzaj: komentarNoviSadrzaj,
            objava: objava.id,
            korisnikId: korisnik.id
        }
        komentariAkcije.stvori(komentarNovi)
        .then(res => {
            const odgovor = {
                ...res.data,
                objava: {id: objava.id}
            }
            postaviKomentare(komentari.concat(odgovor)) /////??????????
            ponistiKomentiranje()
        })
        
    }

    const ponistiKomentiranje = () =>{
        postaviKomentrNovi('')
        postaviKomentiranje(false)
    }

    if(komentiranje){
        return(
            <form onSubmit={dodajKomentar}>
            <input value={komentarNoviSadrzaj} onChange={promijeniKomentarNovi}></input>
            <button type='submit'>Potvrdi</button>
            <button onClick={ponistiKomentiranje}>Odustani</button>
            </form>
        )
    }
    else{
        return null
    }
}

const Objava = ({objava, objave, postaviObjave, komentari, postaviKomentare, korisnik}) => {

    const [sadrzaj, postaviSadrzaj] = useState(objava.sadrzaj)
    const [sadrzajNovi, postaviSadrzajNovi] = useState(objava.sadrzaj)
    const [uredjivanje, postaviUredjivanje] = useState(false)
    const [komentiranje, postaviKomentiranje] = useState(false)
    const [pripada, postaviPripada] = useState(korisnik ? true : false)

    useEffect(()=>{
        if(korisnik){
            objaveAkcije.postaviToken(korisnik.token)
            postaviPripada(korisnik.id === objava.korisnik.id)            
        }
    }, [korisnik])

    const komentariOdObjave = komentari.filter( k => k.objava.id === objava.id)

    const obrisiObjavu = () =>{
        objaveAkcije.brisi(objava.id)
        .then(res => {
            postaviKomentare(komentari.filter(k => k.objava !== objava.id))
            postaviObjave(objave.filter(o => o.id !== objava.id))
        })       
    }

    const promjenaSadrzaja = (e) => {
        postaviSadrzajNovi(e.target.value)

    }

    const promijeniUredjivanje = () => {
        postaviUredjivanje(!uredjivanje)
    }

    const promijeniKomentiranje = () =>{
        postaviKomentiranje(!komentiranje)
    }
    
    const osvjeziSadrzaj = (e) =>{
        e.preventDefault()
        postaviSadrzaj(sadrzajNovi)
        const modObjava = {
            ...objava,
            sadrzaj: sadrzajNovi
        }
        console.log(modObjava)
        objaveAkcije.osvjezi(objava.id, modObjava)
        .then(res =>{
            postaviObjave(objave.map(o => o.id !== objava.id ? o : res.data))
            promijeniUredjivanje()
        })
    }

    const ponistiUredjivanje = () => {
        postaviSadrzajNovi(sadrzaj)
        promijeniUredjivanje()

    }

    const like_unlike = () =>{
        if(objava.likeovi.includes(korisnik.id)){
            const modObjava = {
                ...objava,
                likeovi: objava.likeovi.filter(k => k !== korisnik.id)
            }
            objaveAkcije.osvjezi(objava.id, modObjava)
            .then(res=>{
                postaviObjave(objave.map(o => o.id !== objava.id ? o : modObjava))
            })
        }
        else{
            const modObjava = {
                ...objava,
                likeovi: objava.likeovi.concat(korisnik.id)
            }
            objaveAkcije.osvjezi(objava.id, modObjava)
            .then(res=>{
                postaviObjave(objave.map(o => o.id !== objava.id ? o : modObjava))
            })
        }
    }

    return(
        <div className='card mt-3'>
            <div className='objava-header card-header d-flex justify-content-between'>
                <h6 className='fw-bold'>{objava.korisnik.username}</h6>
                <div class="dropdown">
                    <button hidden={!pripada || uredjivanje} class="btn btn btn-tertiary text-white dropdown-toggle py-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item" onClick={promijeniUredjivanje} href="javascript:return false;">Uredi</a></li>
                      <li><a class="dropdown-item" onClick={obrisiObjavu} href="javascript:return false;">Obriši</a></li>
                    </ul>
                </div>
            </div>
            <textarea className="form-control mt-2 mb-0" value={sadrzajNovi} onChange={promjenaSadrzaja} disabled={!uredjivanje} size={sadrzajNovi.length}></textarea>
            <div className='card-footer'>
                <button type='button' className='btn btn-tertiary text-primary me-4' onClick={like_unlike}><FontAwesomeIcon icon={faThumbsUp}/>  Like</button>
                <button type='button' className='btn btn-tertiary text-primary' onClick={promijeniKomentiranje}><FontAwesomeIcon icon={faComment}/>  Komentiraj</button>                
            </div>
            Likeovi: {objava.likeovi.length}
            
            <UrediObjavu uredjivanje={uredjivanje} 
            ponistiUredjivanje={ponistiUredjivanje} 
            osvjeziSadrzaj={osvjeziSadrzaj} />

            

            <NoviKomentar komentiranje={komentiranje} 
            postaviKomentiranje={postaviKomentiranje} 
            komentari={komentari} 
            postaviKomentare={postaviKomentare} 
            objava={objava} 
            objave={objave} 
            korisnik={korisnik}/>

            <ul>
                {
                    komentariOdObjave.map( k => 
                    <Komentar komentar={k} 
                    key={k.id} 
                    komentari={komentari} 
                    postaviKomentare={postaviKomentare} 
                    objave={objave} 
                    postaviObjave={postaviObjave} 
                    objava={objava} 
                    korisnik={korisnik}/>)
                }
            </ul>
        </div>
    )
}

export default Objava