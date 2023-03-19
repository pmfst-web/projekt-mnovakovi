import React, {useEffect, useState} from 'react'
import axios from 'axios'
import prijavaAkcije from "./services/login";

const LoginForma = (props) =>{
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
          props.postaviKorisnika(korisnik);
          postaviUsername("");
          postaviPass("");
          console.log(korisnik);
        } catch (exception) {
          alert("Neispravni podaci");
        }
    }
    if(!props.korisnik){
        return(
            <div>
                <h1>Prijava</h1>
                <form onSubmit={userLogin}>
                    <div>
                        Username:
                        <input type="text" value={username} name="Username" onChange={promjenaUsername}></input>
                    </div>
                    <div>
                        Password:
                        <input type="password" value={pass} name="Pass" onChange={promjenaPass}></input>
                    </div>
                    <button type='submit'>Prijava</button>
                </form>
            </div>  
        )
    }
    else{
        return null
    }
    
}

export default LoginForma