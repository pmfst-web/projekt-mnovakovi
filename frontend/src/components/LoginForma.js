import React, {useEffect, useState} from 'react'
import axios from 'axios'
import prijavaAkcije from "./services/login";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../index.css"

const LoginForma = ({korisnik, postaviKorisnika, registracija, postaviRegistracija}) =>{
    const [pass, postaviPass] = useState('')
    const [username, postaviUsername] = useState('')


    const promjenaUsername = (e) =>{
        postaviUsername(e.target.value)
    }

    const promjenaPass = (e) =>{
        postaviPass(e.target.value)
    }

    const userLogin = async (e) => {
        e.preventDefault();
        try {
          const korisnik = await prijavaAkcije.prijava({
            username,
            pass,
          });
        //   window.localStorage.setItem(
        //     "prijavljeniKorisnik",
        //     JSON.stringify(korisnik)
        //   );
        //   porukeAkcije.postaviToken(korisnik.token);
          postaviKorisnika(korisnik);
          postaviUsername("");
          postaviPass("");
          console.log(korisnik);
        } catch (err) {
            const upozorenje = document.getElementById('upozorenje')
            upozorenje.hidden=false
            upozorenje.innerText=err.response.data.error
        }
    }

    const ponistiPrijavu = (e) =>{
        e.preventDefault()
        postaviRegistracija(true)
    }

    if(!korisnik && !registracija){
        return(
            <div className='vh-100'>
                <div className='row h-100 justify-content-center align-items-center'>
                    <div className='login-register col-7 col-sm-6 col-md-5 col-lg-4 border border-4 rounded-4'>
                        <h1>Prijava</h1>
                        <form id='loginform' onSubmit={userLogin}>
                            <div className='form-group'>
                                <label >Korisničko ime</label>
                                <input id='loginUname' type="text" value={username} name="Username" onChange={promjenaUsername} className='form-control'placeholder='Unesite korisničko ime'></input>   
                            </div>
                            <div className='form-group'>
                            <label>Lozinka</label>
                                <input id='loginPass' type="password" value={pass} name="Pass" onChange={promjenaPass} className='form-control' placeholder='Unesite lozinku'></input>
                            </div>
                            <button type='submit' className='btn btn-primary btn-block mb-4'>Prijava</button>
                            <div id='upozorenje' className='alert alert-danger' hidden={true}></div>
                            <div className='text-center'>
                                <p>Nemate profil?</p>
                                <button type='button' className='btn btn-link btn-floating mb-1' onClick={ponistiPrijavu}>Registracija</button>
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

export default LoginForma