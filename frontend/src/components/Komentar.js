import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Komentar = (props) => {

    const obrisiKomentar = () => {
        axios.delete(`http://localhost:3001/api/komentari/${props.komentar.id}`)
        .then(res => {
            props.postaviKomentare(props.komentari.filter(k => k.id !== props.komentar.id))
            const modObjava = {
                ...props.objava,
                komentari: props.objava.komentari.filter(id => id !== props.komentar.id)

            }
            axios.put(`http://localhost:3001/api/objave/${props.objava.id}`, modObjava)
            .then(res => {
                console.log(res)
                props.postaviObjave(props.objave.map(o => o.id !== res.data.id ? o : modObjava))
            })
        })
        
    }
    return(
        <div>
            {props.komentar.sadrzaj}
            <button onClick={obrisiKomentar}>Obriši</button>
        </div>
    )
}

export default Komentar