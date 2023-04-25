import React, {useEffect, useState} from 'react'
import axios from 'axios'
import objaveAkcije from './services/objave'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../index.css"

const NovaObjavaForma = ({objave, postaviObjave, korisnik}) =>{
    const [unosSadrzaja, postaviUnos] = useState('')

    const promjenaSadrzaja = (e) => {
        postaviUnos(e.target.value)
      }

    const novaObjava = async(e) =>{
        e.preventDefault()
        const upozorenje = document.getElementById('upozorenje')
        upozorenje.hidden=true
        objaveAkcije.postaviToken(korisnik.token)
        const novaObjava = {
            sadrzaj: unosSadrzaja,
            korisnikId: korisnik.id
        }
        console.log(korisnik.id)
        try{
            const objava = await objaveAkcije.stvori(novaObjava)
        
            const odgovor = {
                ...objava.data,
                korisnik: {id: korisnik.id, username: korisnik.username}
            }
            postaviObjave(objave.concat(odgovor))
            console.log(objava.data)
            postaviUnos('')
        }  
        
        catch(err){
            upozorenje.hidden=false
            upozorenje.innerText=err.response.data.error
        }
        
    }

    if(korisnik){
        return(
                <div className='row wh-100 mt-5 justify-content-center'>
                    <div className='col-9 col-sm-8 col-md-7 col-lg-6 justify-content-center'>
                        <div className='card shadow gx-0 rounded-0'>
                            <div className='card-header'>
                                NOVA OBJAVA
                            </div>
                            <form className='mx-3' onSubmit={novaObjava}>
                                <textarea className="form-control mt-2" rows="3" placeholder="Ovdje unosite sadržaj objave" value={unosSadrzaja} onChange={promjenaSadrzaja}></textarea>
                                <div className='row'>
                                <button className='col-3 py-2 mx-3 btn btn-primary my-1' type='submit'>Objavi</button>
                                <span id='upozorenje' className='col-auto my-1 py-1 alert alert-danger' hidden={true}>NEEE</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>             
        )
    }
    else{
        return null
    }
    

}

export default NovaObjavaForma