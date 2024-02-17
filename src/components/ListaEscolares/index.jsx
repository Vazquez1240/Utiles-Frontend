import { buscar } from "../../api/api.jsx";
import { useState, useEffect } from "react";
import './ListaEscolares.css'


const ListaOpciones = (props) => {

    const [nivelEscolar, setNivelEscolar] = useState([
        'Primaria',
        'Secundaria',
    ])

    const [entregas, setEntregas] = useState([
        '17 al 23 de julio Parque Tucán',
        '24 al 30 de julio Parque Aztlán',
        '31 de julio al 6 de agosto Bajos del Palacio Municipal',
        '7 al 13 de agosto Parque Canoas'
    ])

    const [escuela, setEscuela] = useState([])

    const manejarCambio = (event) => {
        props.manejarCambio(event.target.value)
    }

    useEffect(() => {
        buscar('apiv1/institucion/all/', setEscuela)
    },[])

    return(
        <>
            {
                props.inputDato === 'nivel-escolar' &&
                <div  className='lista-opciones-escolares'>
                    <select name="nivel_escolar" onChange={manejarCambio}>
                        <option value="" defaultValue hidden>Nivel Escolar</option>
                        {nivelEscolar.map((nivel, index) => <option key={index}>{nivel}</option>)}
                    </select>
                </div>
            }
            {
                props.inputDato === 'grado' &&
                <div className='lista-opciones-escolares'>
                    <input onChange={manejarCambio} placeholder="Grado a cursar (2023-2024" type="number" min="1" max="6"/>
                </div>
            }
            {
            props.inputDato === 'escuela' &&
            <div className='lista-opciones-escolares'>
                <select name="nivel_escolar" onChange={manejarCambio}>
                    <option value="" defaultValue hidden>Escuela</option>
                    {escuela.map((escuela, index) => <option value={escuela.clave} key={index}>{escuela.nombre_mostrar}</option>)}
                </select>
            </div>
            }
            {
            props.inputDato === 'entrega' &&
            <div className='lista-opciones-escolares'>
                <select name="entrega" onChange={manejarCambio}>
                    <option value="" defaultValue hidden>Escoja el dia de entrega</option>
                    {entregas.map((entrega, index) => <option value={entrega} key={index}>{entrega}</option>)}
                </select>
            </div>
            }
        </>
    )
}

export default ListaOpciones;