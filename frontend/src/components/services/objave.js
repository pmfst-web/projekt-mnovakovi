import axios from 'axios'

const osnovniUrl = 'http://localhost:3001/api/objave'

let token = null
const postaviToken = (noviToken) => {
    token = `bearer ${noviToken}`
}

const dohvatiSve = () => {   
    return axios.get(osnovniUrl);
}
 
const stvori = async (noviObjekt) => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.post(osnovniUrl, noviObjekt, config)
    return odgovor
}
 
const osvjezi = async (id, noviObjekt) => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.put(`${osnovniUrl}/${id}`, config)
    return odgovor
}

const brisi = async (id) => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.delete(`${osnovniUrl}/${id}`, config)
    return odgovor
}
 
export default { dohvatiSve, stvori, osvjezi, brisi, postaviToken}