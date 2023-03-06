import React, {useEffect, useState} from 'react'
import Komentar from './Komentar'

const UrediObjavu = (props) => {

    if(props.uredjivanje){
        return(
            <form onSubmit={props.osvjeziObjavu}>
                <button type='submit'>Potvrdi</button>
                <button onClick={props.promijeniUredjivanje}>Odustani</button>
            </form>
        )
    }
    else{
        return null
    }
}

const Objava = (props) => {

    const [sadrzaj, postaviSadrzaj] = useState(props.objava.sadrzaj)
    const [ komentari, postaviKomentare] = useState(props.komentari)
    const [ uredjivanje, postaviUredjivanje ] = useState(false)

    const komentariOdObjave = props.komentari.filter( k => k.ID_objava === props.objava.id)

    const promijeniUredjivanje = () => {
        postaviUredjivanje(!uredjivanje)
    }

    const obrisiObjavu = () =>{
        props.postaviKomentare(props.komentari.filter(k => k.ID_objava !== props.objava.id))
        props.postaviObjave(props.objave.filter(o => o.id !== props.objava.id))
    }



    return(
        <div>
            {props.objava.sadrzaj}
            <button onClick={promijeniUredjivanje} hidden={uredjivanje}>Uredi</button>
            <button onClick={obrisiObjavu} hidden={uredjivanje}>Obriši</button>
            <UrediObjavu uredjivanje={uredjivanje} promijeniUredjivanje={promijeniUredjivanje} />

            <div>
                <button onClick={props.lajkajObjavu}>Like</button>
                <button onClick={props.komentirajNaObjavu}>Komentiraj</button>                
            </div>

            <ul>
                {
                    komentariOdObjave.map( k => <Komentar komentar={k} key={k.id} komentari={props.komentari} postaviKomentare={props.postaviKomentare}/>)
                }
            </ul>
            

        </div>
    )
}

export default Objava