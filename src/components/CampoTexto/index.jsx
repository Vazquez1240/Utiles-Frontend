import './campoTexto.css'
import { useState, useEffect } from 'react';


const CampoTexto = (props) => {


    const {type = 'text', texto, placeholder, required, valor, nombre, actualizarValor, longitud, escribir, clase} = props;


    const manejarCambio = (event) => {
        const inputValue = event.target.value;
        actualizarValor(inputValue)
        if(inputValue.length == 0 || inputValue.length < 18 || inputValue.length > 18){
            props.buscarDatos('');
        }
        if (inputValue.length === longitud) {
            props.buscarDatos(inputValue);
        }
        
    };

    const definirClase = valor === undefined ? 'no-punteado' : (valor === '' ? 'no-punteado' : clase)

    return (
        <div className='campo-texto'>
            <label>{texto.toUpperCase()}</label>
            <input
            className={definirClase}
            type={type} 
            placeholder={placeholder} 
            required={required} 
            value={valor} 
            onChange={manejarCambio}
            name={nombre}
            readOnly={escribir}/>
        </div>
    )
}

export default CampoTexto;