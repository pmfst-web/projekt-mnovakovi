import React, {useEffect, useState} from 'react'
import Komentar from './Komentar'
import axios from 'axios'
import objaveAkcije from './services/objave'
import komentariAkcije from './services/komentari'

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
        <div>
            <input value={sadrzajNovi} onChange={promjenaSadrzaja} disabled={!uredjivanje} size={sadrzajNovi.length}></input>
            <button onClick={promijeniUredjivanje} hidden={!pripada || uredjivanje}>Uredi</button>
            <button onClick={obrisiObjavu} hidden={!pripada || uredjivanje}>Obriši</button>
            <br></br>
            Likeovi: {objava.likeovi.length}
            
            <UrediObjavu uredjivanje={uredjivanje} 
            ponistiUredjivanje={ponistiUredjivanje} 
            osvjeziSadrzaj={osvjeziSadrzaj} />

            <div>
                <button onClick={like_unlike} hidden={!korisnik}>Like</button>
                <button onClick={promijeniKomentiranje} hidden={!korisnik}>Komentiraj</button>                
            </div>

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