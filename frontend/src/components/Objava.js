import React, {useEffect, useState} from 'react'
import Komentar from './Komentar'

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
        const komentarNovi = {
            id: props.komentari.length+1,
            sadrzaj: komentarNoviSadrzaj,
            datum: '2019-05-30T17:30:31.098Z',
            ID_objava: props.objava.id
        }
        props.postaviKomentare(props.komentari.concat(komentarNovi))
        console.log(komentarNovi)
        ponistiKomentiranje()

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

    const komentariOdObjave = props.komentari.filter( k => k.ID_objava === props.objava.id)

    const obrisiObjavu = () =>{
        props.postaviKomentare(props.komentari.filter(k => k.ID_objava !== props.objava.id))
        props.postaviObjave(props.objave.filter(o => o.id !== props.objava.id))
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
    
    const osvjeziSadrzaj = () =>{
        postaviSadrzaj(sadrzajNovi)
        const modObjava = {
            ...props.objava,
            sadrzaj: sadrzajNovi
        }
        props.postaviObjave(props.objave.map(o => o.id !== props.objava.id ? o : modObjava))
        promijeniUredjivanje()

    }

    const ponistiUredjivanje = () => {
        postaviSadrzajNovi(sadrzaj)
        promijeniUredjivanje()

    }



    return(
        <div>
            <input value={sadrzajNovi} onChange={promjenaSadrzaja} disabled={!uredjivanje} size={sadrzajNovi.length}></input>
            <button onClick={promijeniUredjivanje} hidden={uredjivanje}>Uredi</button>
            <button onClick={obrisiObjavu} hidden={uredjivanje}>Obriši</button>
            <UrediObjavu uredjivanje={uredjivanje} ponistiUredjivanje={ponistiUredjivanje} osvjeziSadrzaj={osvjeziSadrzaj} />

            <div>
                <button onClick={props.lajkajObjavu}>Like</button>
                <button onClick={promijeniKomentiranje}>Komentiraj</button>                
            </div>
            <NoviKomentar komentiranje={komentiranje} postaviKomentiranje={postaviKomentiranje} komentari={props.komentari} postaviKomentare={props.postaviKomentare} objava={props.objava}/>
            <ul>
                {
                    komentariOdObjave.map( k => <Komentar komentar={k} key={k.id} komentari={props.komentari} postaviKomentare={props.postaviKomentare}/>)
                }
            </ul>
            

        </div>
    )
}

export default Objava