import React, {useEffect, useState, useRef} from 'react'
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
                objava: {id: objava.id},
                korisnik: {id: korisnik.id, username: korisnik.username}
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
    const [liked, postaviLiked] = useState(false)
    const [btnLikeClass, postaviBtnLikeClass] = useState('btn btn-tertiary text-secondary me-4')
    const sadrzajRef = useRef(null)

    const komentariOdObjave = komentari.filter( k => k.objava.id === objava.id)

    useEffect(()=>{
        if(korisnik){
            objaveAkcije.postaviToken(korisnik.token)
            postaviPripada(korisnik.id === objava.korisnik.id)            
        }
    }, [korisnik])

    useEffect(()=>{
        if(objava.likeovi.includes(korisnik.id)){
            postaviLiked(true)
            postaviBtnLikeClass('btn btn-tertiary text-primary me-4')
        }
        else{
            postaviLiked(false)
            postaviBtnLikeClass('btn btn-tertiary text-secondary me-4')
        }

    }, [objava])

    useEffect(() => {
        if (sadrzajRef && sadrzajRef.current) {
          sadrzajRef.current.style.height = "0px";
          const taHeight = sadrzajRef.current.scrollHeight;
          sadrzajRef.current.style.height = taHeight + "px";
        }
    },[]);

    

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
        objaveAkcije.osvjezi(objava.id, modObjava)
        .then(res =>{
            const odgovor = {
                ...res.data,
                korisnik: {id: korisnik.id, username:korisnik.username}
            }
            postaviObjave(objave.map(o => o.id !== objava.id ? o : odgovor))
            promijeniUredjivanje()
        })
    }

    const ponistiUredjivanje = () => {
        postaviSadrzajNovi(sadrzaj)
        promijeniUredjivanje()

    }

    const like_unlike = (e) =>{
        if(liked){
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
        <div className='card shadow mt-3'>
            <div className='objava-header card-header d-flex justify-content-between'>
                <h6 className='fw-bold'>{objava.korisnik.username}</h6>
                <div className="dropdown">
                    <button hidden={!pripada || uredjivanje} className="btn btn btn-tertiary text-white dropdown-toggle py-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" onMouseUp={promijeniUredjivanje} href="javascript:return false;">Uredi</a></li>
                      <li><a className="dropdown-item" onClick={obrisiObjavu} href="javascript:return false;">Obriši</a></li>
                    </ul>
                </div>
            </div>
            <textarea ref={sadrzajRef} className="form-control edit no-resize mt-2 mb-0" value={sadrzajNovi} onChange={promjenaSadrzaja} disabled={!uredjivanje}></textarea>
            <div className='card-footer border-bottom py-0 d-flex justify-content-between'>
                <div>
                    <button type='button' className={btnLikeClass} onClick={like_unlike}><FontAwesomeIcon icon={faThumbsUp}/>  Like</button>
                    <button type='button' className='btn btn-tertiary text-secondary' onClick={promijeniKomentiranje}><FontAwesomeIcon icon={faComment}/>  Komentiraj</button>   
                </div>
                <div className='d-flex align-items-center'>
                    <span className='fw-bold text-secondary me-2'>Likeovi: {objava.likeovi.length}</span>
                    <span className='fw-bold text-secondary'>Komentari: {komentariOdObjave.length}</span>
                </div>
                             
            </div>
            
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

            <ul className='container'>
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