import React, {useEffect, useState} from 'react'
import axios from 'axios'
import registracijaAkcije from "./services/register";

const RegisterForma = (props) =>{
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
        try{
            let name = ime.trim()
            let sur = prezime.trim()
            let un = username.trim()
            let pw = pass.trim()
            if(name.length===0 || sur.length===0 || un.length===0 || pw.length===0 ){
                alert('Polja ne smiju biti prazna!')
                return
            }
            const novi = {
                ime: name + " " + sur,
                pass: pw,
                username: un
            }
            await registracijaAkcije.registracija(novi)
            ponistiRegistraciju()
            alert('Uspješno ste regitrirani!')
        }
        catch(exception){
            alert(exception)
        }
    }

    const ponistiRegistraciju = () => {
        postaviUsername('')
        postaviPass('')
        postaviIme('')
        postaviPrezime('')
        props.postaviRegistracija(false)
    }

    if(props.registracija){
        return(
            <div>
                <h1>Registracija</h1>
                <form onSubmit={userRegister}>
                    <div>
                        Ime:
                        <input type="text" value={ime} name="Ime" onChange={promjenaIme}></input>
                    </div>
                    <div>
                        Prezime:
                        <input type="text" value={prezime} name="Prezime" onChange={promjenaPrezime}></input>
                    </div>
                    <div>
                        Username:
                        <input type="text" value={username} name="Username" onChange={promjenaUsername}></input>
                    </div>
                    <div>
                        Password:
                        <input type="password" value={pass} name="Pass" onChange={promjenaPass}></input>
                    </div>
                    <button type='submit'>Potvrdi</button>
                    <button onClick={ponistiRegistraciju}>Prijava</button>
                </form>
            </div>
        )
    }
    else{
        return null
    }
}

export default RegisterForma