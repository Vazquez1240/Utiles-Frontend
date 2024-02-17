import './opcionesColonia.css'
import { useState, useEffect } from 'react'
import { buscar_colonia } from '../../api/api.jsx'


const OpcionColonia = (props) => {

    const [colonia, setColonia] = useState([])

    useEffect(() => {
        buscar_colonia(setColonia)
    },[])

    const manejarCambio = (event) => {
        props.actualizarColonia(event.target.value)
    }


    return(
        <div className='lista-opciones-colonia'>
            <label>INGRESE SU COLONIA</label>
            <select name={'colonia'} onChange={manejarCambio}>
                <option value="" defaultValue hidden>Colonia</option>
                {colonia.map((colonia, index) => <option value={colonia.nombre} key={index}>{colonia.nombre}</option>)}
            </select>
        </div>
    )
}

export default OpcionColonia;