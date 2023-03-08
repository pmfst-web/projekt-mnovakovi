import React, {useState} from 'react'

const NovaObjavaForma = (props) =>{
    const [unosSadrzaja, postaviUnos] = useState('')

    const promjenaSadrzaja = (e) => {
        postaviUnos(e.target.value)
      }

    const novaObjava = (e) =>{
        e.preventDefault()
        const novaObjava = {
            id: props.objave.length+1,
            sadrzaj: unosSadrzaja,
            datum: '2019-05-30T17:30:31.098Z',
            likeovi: [],
            komentari: []
        }
        props.postaviObjave(props.objave.concat(novaObjava))
        postaviUnos('')
    }


    return(
        <form onSubmit={novaObjava}>
            <input value={unosSadrzaja} onChange={promjenaSadrzaja}></input>
            <button type='submit'>Objavi</button>

        </form>
    )

}

export default NovaObjavaForma