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
                <button className=' py-1 me-2 ms-1 btn btn-primary my-1' type='submit'>Potvrdi</button>
                <button className=' py-1 btn btn-danger' onClick={ponistiUredjivanje}>Odustani</button>
            </form>
        )
    }
    else{
        return null
    }
}

const NoviKomentar = ({komentiranje, postaviKomentiranje, komentari, postaviKomentare, objava, objave, korisnik}) => {
    const [komentarNoviSadrzaj, postaviKomentrNovi] = useState('')
    const upozorenjeRef = useRef(null)

    useEffect(()=>{
        if(korisnik){
            komentariAkcije.postaviToken(korisnik.token)
        }
    }, [korisnik, objave])

    const promijeniKomentarNovi = (e) =>{
        postaviKomentrNovi(e.target.value)
    }

    const dodajKomentar = async (e) =>{
        e.preventDefault()
        const upozorenje = upozorenjeRef.current
        upozorenje.hidden=true
        const komentarNovi = {
            sadrzaj: komentarNoviSadrzaj,
            objava: objava.id,
            korisnikId: korisnik.id
        }
        try{
            const res = await komentariAkcije.stvori(komentarNovi)
            const odgovor = {
                ...res.data,
                objava: {id: objava.id},
                korisnik: {id: korisnik.id, username: korisnik.username}
            }
            postaviKomentare(komentari.concat(odgovor)) /////??????????
            ponistiKomentiranje()
        }
        catch(err){
            upozorenje.hidden=false     
            upozorenje.innerText=err.response.data.error
        }   
    }

    const ponistiKomentiranje = () =>{
        postaviKomentrNovi('')
        postaviKomentiranje(false)
        upozorenjeRef.current.hidden=true
    }

    if(komentiranje){
        return(
            <form className='border-bottom mt-1' onSubmit={dodajKomentar}>
            <input className='form-control' value={komentarNoviSadrzaj} onChange={promijeniKomentarNovi} placeholder='Unesite novi komentar'></input>
            <button className=' py-1 me-2 ms-1 btn btn-primary my-1' type='submit'>Potvrdi</button>
            <button className=' py-1 btn btn-danger' onClick={ponistiKomentiranje}>Odustani</button>
            <span ref={upozorenjeRef} className='row my-1 mx-0 py-1 alert alert-danger' hidden={true}></span>
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
    const [contentEditClass, postaviContentEditClass] = useState('form-control border-0 pt-0');
    const sadrzajRef = useRef(null)
    const upozorenjeRef = useRef(null)

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

    const obrisiObjavu = () =>{
        objaveAkcije.brisi(objava.id)
        .then(res => {
            postaviKomentare(komentari.filter(k => k.objava !== objava.id))
            postaviObjave(objave.filter(o => o.id !== objava.id))
        })       
    }

    const promjenaSadrzaja = (e) => {
        postaviSadrzajNovi(e.target.innerText)
        var el = sadrzajRef.current
        var range = document.createRange();
        var sel = window.getSelection();
        if (el.childNodes.length > 0) {
            var el2 = el.childNodes[el.childNodes.length - 1];
            range.setStartAfter(el2);
          } else {
            range.setStartAfter(el);
          }
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
    }

    const promijeniUredjivanje = () => {
        postaviUredjivanje(!uredjivanje)
        if(!uredjivanje){
            postaviContentEditClass('form-control edit pt-0')
        }
        else{
            postaviContentEditClass('form-control border-0 pt-0')
        }
    }

    const promijeniKomentiranje = () =>{
        postaviKomentiranje(!komentiranje)
    }
    
    const osvjeziSadrzaj = async(e) =>{
        e.preventDefault()
        postaviSadrzaj(sadrzajNovi)
        const upozorenje = upozorenjeRef.current
        upozorenje.hidden=true
        const modObjava = {
            ...objava,
            sadrzaj: sadrzajNovi
        }
        try{
            const res = await objaveAkcije.osvjezi(objava.id, modObjava)
            const odgovor = {
                ...res.data,
                korisnik: {id: korisnik.id, username:korisnik.username}
            }
            postaviObjave(objave.map(o => o.id !== objava.id ? o : odgovor))
            promijeniUredjivanje()
        }
        catch(err){
            upozorenje.hidden=false
            upozorenje.innerText=err.response.data.error
        }    
    }

    const ponistiUredjivanje = () => {
        postaviSadrzajNovi(sadrzaj)
        upozorenjeRef.current.hidden=true
        sadrzajRef.current.innerText = sadrzajNovi
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
        <div className='card shadow mt-3 col-lg-7'>
            <div className='objava-header card-header d-flex justify-content-between'>
                <h6 className='fw-bold'>{objava.korisnik.username}</h6>
                <div className="dropdown">
                    <button hidden={!pripada || uredjivanje} disabled={komentiranje} className="btn btn btn-tertiary text-white dropdown-toggle py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" onMouseUp={promijeniUredjivanje}>Uredi</a></li>
                      <li><a className="dropdown-item" onClick={obrisiObjavu} >Obriši</a></li>
                    </ul>
                </div>
            </div>
            <div className='text-muted ms-3 pt-1'>{new Date(objava.datum).toDateString()}</div>
            {/* <textarea ref={sadrzajRef} className="form-control edit no-resize mt-2 mb-0" value={sadrzajNovi} onChange={promjenaSadrzaja} disabled={!uredjivanje}></textarea> */}
            <span ref={sadrzajRef} className={contentEditClass} contentEditable={uredjivanje} suppressContentEditableWarning={true} onInput={promjenaSadrzaja}>{sadrzajNovi}</span>
            <span ref={upozorenjeRef} className='col-auto my-1 py-1 alert alert-danger' hidden={true}></span>
            <UrediObjavu uredjivanje={uredjivanje} 
            ponistiUredjivanje={ponistiUredjivanje} 
            osvjeziSadrzaj={osvjeziSadrzaj} />
            <div className='card-footer border-bottom py-0 d-flex justify-content-between'>
                <div>
                    <button type='button' disabled={komentiranje || uredjivanje} className={btnLikeClass} onClick={like_unlike}><FontAwesomeIcon icon={faThumbsUp}/>  Like</button>
                    <button type='button' disabled={komentiranje || uredjivanje} className='btn btn-tertiary text-secondary' onClick={promijeniKomentiranje}><FontAwesomeIcon icon={faComment}/>  Komentiraj</button>   
                </div>
                <div className='d-flex align-items-center'>
                    <span className='fw-bold text-secondary me-2'>Likeovi: {objava.likeovi.length}</span>
                    <span className='fw-bold text-secondary'>Komentari: {komentariOdObjave.length}</span>
                </div>
                             
            </div>

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