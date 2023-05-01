import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"

const NavTraka = ({korisnik, postaviKorisnika}) => {
    const odjaviKorisnika = () =>{
        window.localStorage.removeItem("prijavljeniKorisnik")
        postaviKorisnika(null)
    }
    if(korisnik){
        return (
            <nav className='navbar navbar-dark static-top bg-primary'>
                <div className='container-fluid justify-content-between'>
                    <span className='fs-2 text-white fw-bold'>
                        OARWA PROJEKT
                    </span>
                    <button className="btn btn-danger text-white" onClick={odjaviKorisnika}>ODJAVA</button>
                </div>
            </nav>
        )
    }
    else{
        return null
    }
    

}

export default NavTraka