import React, {useEffect, useState} from 'react'
import Komentar from './Komentar'
import axios from 'axios'
import objaveAkcije from './services/objave'
import komentariAkcije from './services/komentari'

const UrediObjavu = (props) => {

    if(props.uredjivanje){
        return(
            <form onSubmit={props.osvjeziSadrzaj}>
                <button type='submit'>Potvrdi</button>
                <button onClick={props.ponistiUredjivanje}>Odustani</button>
            </form>
        )
    }
    else{
        return null
    }
}

const NoviKomentar = (props) => {
    const [komentarNoviSadrzaj, postaviKomentrNovi] = useState('')

    useEffect(()=>{
        if(props.korisnik){
            komentariAkcije.postaviToken(props.korisnik.token)
        }
    }, [props.korisnik, props.objave])

    const promijeniKomentarNovi = (e) =>{
        postaviKomentrNovi(e.target.value)
    }

    const dodajKomentar = (e) =>{
        e.preventDefault()
        const komentarNovi = {
            sadrzaj: komentarNoviSadrzaj,
            objava: props.objava.id,
            korisnikId: props.korisnik.id
        }
        komentariAkcije.stvori(komentarNovi)
        .then(res => {
            props.postaviKomentare(props.komentari.concat(res.data))
            ponistiKomentiranje()
        })
        
    }

    const ponistiKomentiranje = () =>{
        postaviKomentrNovi('')
        props.postaviKomentiranje(false)
    }

    if(props.komentiranje){
        return(
            <form onSubmit={dodajKomentar}>
            <input value={komentarNoviSadrzaj} onChange={promijeniKomentarNovi}></input>
            <button type='submit'>Potvrdi</button>
            <button onClick={props.ponistiKomentiranje}>Odustani</button>
            </form>
        )
    }
    else{
        return null
    }
}

const Objava = (props) => {

    const [sadrzaj, postaviSadrzaj] = useState(props.objava.sadrzaj)
    const [sadrzajNovi, postaviSadrzajNovi] = useState(props.objava.sadrzaj)
    const [uredjivanje, postaviUredjivanje] = useState(false)
    const [komentiranje, postaviKomentiranje] = useState(false)
    const [pripada, postaviPripada] = useState(props.korisnik ? true : false)

    useEffect(()=>{
        if(props.korisnik){
            objaveAkcije.postaviToken(props.korisnik.token)
            postaviPripada(props.korisnik.id === props.objava.korisnik.id)             
        }
    }, [props.korisnik])

    

    // useEffect(()=>{
    //     if(props.korisnik){
    //         postaviPripada(props.korisnik.id === props.objava.korisnik.id)      
    //     }
    // }, [])

    // const pripadaKorisniku = props.korisnik ? props.korisnik.id === props.objava.korisnik.id : false
    const komentariOdObjave = props.komentari.filter( k => k.objava === props.objava.id)

    const obrisiObjavu = () =>{
        objaveAkcije.brisi(props.objava.id)
        .then(res => {
            props.postaviKomentare(props.komentari.filter(k => k.objava !== props.objava.id))
            props.postaviObjave(props.objave.filter(o => o.id !== props.objava.id))
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
            ...props.objava,
            sadrzaj: sadrzajNovi
        }
        console.log(modObjava)
        objaveAkcije.osvjezi(props.objava.id, modObjava)
        .then(res =>{
            props.postaviObjave(props.objave.map(o => o.id !== props.objava.id ? o : res.data))
            promijeniUredjivanje()
        })
    }

    const ponistiUredjivanje = () => {
        postaviSadrzajNovi(sadrzaj)
        promijeniUredjivanje()

    }

    return(
        <div>
            <input value={sadrzajNovi} onChange={promjenaSadrzaja} disabled={!uredjivanje} size={sadrzajNovi.length}></input>
            <button onClick={promijeniUredjivanje} hidden={!pripada || uredjivanje}>Uredi</button>
            <button onClick={obrisiObjavu} hidden={!pripada || uredjivanje}>Obriši</button>
            <UrediObjavu uredjivanje={uredjivanje} ponistiUredjivanje={ponistiUredjivanje} osvjeziSadrzaj={osvjeziSadrzaj} />

            <div>
                <button onClick={props.lajkajObjavu} hidden={!props.korisnik}>Like</button>
                <button onClick={promijeniKomentiranje} hidden={!props.korisnik}>Komentiraj</button>                
            </div>
            <NoviKomentar komentiranje={komentiranje} postaviKomentiranje={postaviKomentiranje} komentari={props.komentari} postaviKomentare={props.postaviKomentare} objava={props.objava} objave={props.objave} postaviObjave={props.postaviObjave} korisnik={props.korisnik}/>
            <ul>
                {
                    komentariOdObjave.map( k => <Komentar komentar={k} key={k.id} komentari={props.komentari} postaviKomentare={props.postaviKomentare} objave={props.objave} postaviObjave={props.postaviObjave} objava={props.objava} korisnik={props.korisnik}/>)
                }
            </ul>
        </div>
    )
}

export default Objava