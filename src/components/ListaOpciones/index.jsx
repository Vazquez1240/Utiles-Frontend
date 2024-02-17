import './ListaOpciones.css'
import { buscar_municipio } from '../../api/api.jsx'
import { useEffect, useState } from 'react'

const ListaOpciones = (props) => {

    const [municipio, setMunicipios] = useState([])

    

    useEffect(() => {
        buscar_municipio(setMunicipios)
    },[])



    const manejarCambio = (event) => {
        props.actualizarMunicipio(event.target.value)
    }

    

    return (
        <div className='lista-opciones'>
            <select name={'municipio'} onChange={manejarCambio}>
                <option value="" defaultValue hidden>Municipio</option>
                {municipio.map((municipio, index) => <option value={municipio.clave_geoestadistica} key={index}>{municipio.nombre}</option>)}
            </select>
        </div>
    )

}
export default ListaOpciones;