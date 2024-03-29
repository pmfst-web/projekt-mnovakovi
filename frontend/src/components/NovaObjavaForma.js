import React, {useState, useRef} from 'react'
import objaveAkcije from './services/objave'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../index.css"

const NovaObjavaForma = ({objave, postaviObjave, korisnik}) =>{
    const [unosSadrzaja, postaviUnos] = useState('')

    const upozorenjeRef = useRef(null)

    const promjenaSadrzaja = (e) => {
        postaviUnos(e.target.value)
    }

    const novaObjava = async(e) =>{
        e.preventDefault()
        const upozorenje = upozorenjeRef.current
        upozorenje.hidden=true
        const novaObjava = {
            sadrzaj: unosSadrzaja,
            korisnik_ID: korisnik.id
        }
        try{
            const objava = await objaveAkcije.stvori(novaObjava)
        
            const odgovor = {
                ...objava.data,
                korisnik: {id: korisnik.id, username: korisnik.username}
            }
            postaviObjave(objave.concat(odgovor))
            postaviUnos('')
        }  
        
        catch(err){
            if(err.response){
                upozorenje.hidden=false
                upozorenje.innerText=err.response.data.error
            }   
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
                            <span ref={upozorenjeRef} className='col-auto my-1 py-1 alert alert-danger' hidden={true}></span>
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