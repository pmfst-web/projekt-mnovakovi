import React, {useState} from 'react'
import axios from 'axios'
import objaveAkcije from './services/objave'

const NovaObjavaForma = (props) =>{
    const [unosSadrzaja, postaviUnos] = useState('')

    const promjenaSadrzaja = (e) => {
        postaviUnos(e.target.value)
      }

    const novaObjava = (e) =>{
        e.preventDefault()
        const novaObjava = {
            sadrzaj: unosSadrzaja
        }
        objaveAkcije.stvori(novaObjava)
        // axios.post('http://localhost:3001/api/objave', novaObjava)
        .then(res => {
            props.postaviObjave(props.objave.concat(res.data))
            postaviUnos('')
        })
        
    }

    if(props.korisnik){
        return(
            <div>
                <h1>Dodaj objavu</h1>
                <form onSubmit={novaObjava}>
                    <input value={unosSadrzaja} onChange={promjenaSadrzaja}></input>
                    <button type='submit'>Objavi</button>
                </form>
            </div>           
        )
    }
    else{
        return null
    }
    

}

export default NovaObjavaForma