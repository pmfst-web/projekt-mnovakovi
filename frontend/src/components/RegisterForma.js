import React, {useEffect, useState} from 'react'
import axios from 'axios'
import registracijaAkcije from "./services/register";
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../index.css"

const RegisterForma = ({registracija, postaviRegistracija}) =>{
    const [pass, postaviPass] = useState('')
    const [username, postaviUsername] = useState('')
    const [ime, postaviIme] = useState('')
    const [prezime, postaviPrezime] = useState('')

    const promjenaUsername = (e) =>{
        postaviUsername(e.target.value)
    }

    const promjenaPass = (e) =>{
        postaviPass(e.target.value)
    }

    const promjenaIme = (e) =>{
        postaviIme(e.target.value)
    }

    const promjenaPrezime = (e) =>{
        postaviPrezime(e.target.value)
    }

    const userRegister = async (e) =>{
        e.preventDefault()
        const upozorenje = document.getElementById('upozorenje')
        const uspjeh = document.getElementById('uspjeh')
        try{
            let name = ime.trim()
            let sur = prezime.trim()
            let un = username.trim()
            let pw = pass.trim()
            if(name.length===0 || sur.length===0 || un.length===0 || pw.length===0 ){
                uspjeh.hidden=true
                upozorenje.hidden=false
                upozorenje.innerText='Polja ne smiju biti prazna!'
                return
            }
            const novi = {
                ime: name + " " + sur,
                pass: pw,
                username: un
            }
            await registracijaAkcije.registracija(novi)
            // ponistiRegistraciju()
            upozorenje.hidden=true
            uspjeh.hidden=false
            uspjeh.innerText='Uspješno ste regitrirani!'
        }
        catch(err){
            uspjeh.hidden=true
            upozorenje.hidden=false
            upozorenje.innerText=err.response.data.error
        }
    }

    const ponistiRegistraciju = () => {
        postaviUsername('')
        postaviPass('')
        postaviIme('')
        postaviPrezime('')
        postaviRegistracija(false)
    }

    if(registracija){
        return(
            <div className='vh-100'>
                <div className='row h-100 justify-content-center align-items-center'>
                    <div className='login-register col-7 col-sm-6 col-md-5 col-lg-4 border border-4 rounded-4'>
                        <h1>Registracija</h1>
                        <form id='registerForm' onSubmit={userRegister}>
                            <div>
                                <label>Ime</label>
                                <input type="text" value={ime} name="Ime" onChange={promjenaIme} className='form-control'placeholder='Unesite ime'></input>
                            </div>
                            <div>
                            <label>Prezime</label>
                                <input type="text" value={prezime} name="Prezime" onChange={promjenaPrezime} className='form-control'placeholder='Unesite prezime'></input>
                            </div>
                            <div>
                                <label>Korisničko ime</label>
                                <input type="text" value={username} name="Username" onChange={promjenaUsername} className='form-control'placeholder='Unesite korisničko ime'></input>
                            </div>
                            <div>
                                <label>Lozinka</label>
                                <input type="password" value={pass} name="Pass" onChange={promjenaPass} className='form-control'placeholder='Unesite lozinku'></input>
                            </div>
                            <button type='submit' className='btn btn-primary btn-block mb-4'>Registracija</button>
                            <div id='upozorenje' className='alert alert-danger' hidden={true}></div>
                            <div id='uspjeh' className='alert alert-success' hidden={true}></div>
                            <div className='text-center'>
                                <p>Već imate profil?</p>
                                <button type='button' className='btn btn-link btn-floating mb-1' onClick={ponistiRegistraciju}>Prijava</button>
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

export default RegisterForma