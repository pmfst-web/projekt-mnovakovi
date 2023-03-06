import React, {useEffect, useState} from 'react'
import Objava from './components/Objava'
import NovaObjavaForma from './components/NovaObjavaForma'
// import axios from 'axios'

const App = (props) => {

    const [objave, postaviObjave] = useState(props.objave)
    const [komentari, postaviKomentare] = useState(props.komentari)


    return(
        <div>
            <h1>Dodaj objavu</h1>
            <NovaObjavaForma objave={objave} postaviObjave={postaviObjave}/>
            <h1>Objave</h1>
            <ul>
                {
                    objave.map( o => <Objava objava={o} key={o.id} objave={objave} postaviObjave={postaviObjave} komentari={komentari} postaviKomentare={postaviKomentare}/>)
                }
            </ul>

        </div>
    )
}

export default App