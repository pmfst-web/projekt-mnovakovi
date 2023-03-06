import React, {useEffect, useState} from 'react'

const Komentar = (props) => {

    const obrisiKomentar = () => {
        props.postaviKomentare(props.komentari.filter(k => k.id !== props.komentar.id))
    }
    return(
        <div>
            {props.komentar.sadrzaj}
            <button onClick={obrisiKomentar}>Obriši</button>
        </div>
    )
}

export default Komentar