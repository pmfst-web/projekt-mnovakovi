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

    const promijeniKomentarNovi = (e) =>{
        postaviKomentrNovi(e.target.value)
    }

    const dodajKomentar = (e) =>{
        e.preventDefault()
        const komentarNovi = {
            sadrzaj: komentarNoviSadrzaj,
            ID_objava: props.objava.id
        }
        komentariAkcije.stvori(komentarNovi)
        // axios.post('http://localhost:3001/api/komentari', komentarNovi)
        .then(res => {
            props.postaviKomentare(props.komentari.concat(res.data))
            const modObjava ={
                ...props.objava,
                komentari: props.objava.komentari.concat(res.data.id)
            }
            objaveAkcije.osvjezi(res.data.ID_objava, modObjava)
            // axios.put(`http://localhost:3001/api/objave/${res.data.ID_objava}`, modObjava)
            .then(res => {
                console.log(res)
                props.postaviObjave(props.objave.map(o => o.id !== res.data.id ? o : modObjava))
            })
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

    // const pripadaKorisniku = props.korisnik ? props.korisnik.id === props.objava.korisnik.id : false
    const komentariOdObjave = props.komentari.filter( k => k.ID_objava === props.objava.id)

    const obrisiObjavu = () =>{
        if(props.objava.komentari.length!==0){
            for(let k_ID of props.objava.komentari){
                komentariAkcije.brisi(k_ID)
                // const url_komentar = `http://localhost:3001/api/komentari/${k_ID}`
                // axios.delete(url_komentar)
            }

        }
        objaveAkcije.brisi(props.objava.id)
        // const url_objava = `http://localhost:3001/api/objave/${props.objava.id}`
        // axios.delete(url_objava)
        .then(res => {
            props.postaviKomentare(props.komentari.filter(k => k.ID_objava !== props.objava.id))
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
        objaveAkcije.osvjezi(props.objava.id, modObjava)
        // axios.put(`http://localhost:3001/api/objave/${props.objava.id}`, modObjava)
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
            <button onClick={promijeniUredjivanje}>Uredi</button>
            <button onClick={obrisiObjavu}>Obriši</button>
            <UrediObjavu uredjivanje={uredjivanje} ponistiUredjivanje={ponistiUredjivanje} osvjeziSadrzaj={osvjeziSadrzaj} />

            <div>
                <button onClick={props.lajkajObjavu} hidden={!props.korisnik}>Like</button>
                <button onClick={promijeniKomentiranje} hidden={!props.korisnik}>Komentiraj</button>                
            </div>
            <NoviKomentar komentiranje={komentiranje} postaviKomentiranje={postaviKomentiranje} komentari={props.komentari} postaviKomentare={props.postaviKomentare} objava={props.objava} objave={props.objave} postaviObjave={props.postaviObjave}/>
            <ul>
                {
                    komentariOdObjave.map( k => <Komentar komentar={k} key={k.id} komentari={props.komentari} postaviKomentare={props.postaviKomentare} objave={props.objave} postaviObjave={props.postaviObjave} objava={props.objava} />)
                }
            </ul>
            

        </div>
    )
}

export default Objava