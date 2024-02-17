import './InputTexto.css'


const InputTexto = (props) => {

    const {texto, tipo, placeholder, actualizarValor, valor, nombre, pagina, escribir} = props;

    

    const manejarCambio= (event) => {
        const inputValue = event.target.value
        actualizarValor(inputValue)

        if(pagina != 'sesion'){
            actualizarValor(inputValue);
        }
        if(pagina === 'sesion'){
            if(inputValue.length == 0){
                props.buscarDatos('');
            }
            props.buscarDatos(inputValue);
        
        }  
    }


    return (
        <div>
            {
            pagina == "login" ? (
                <div className='input-texto'>
                    <label>{texto.toUpperCase()}</label>
                    <input
                    type={tipo}
                    placeholder={placeholder}
                    required={true}
                    value={valor}
                    onChange={manejarCambio}
                    name={nombre}/>
                </div>
                ):(
                    <div className='input-texto'>
                        <label>{texto.toUpperCase()}</label>
                        <input
                        type={tipo}
                        placeholder={placeholder}
                        required={true}
                        value={valor}
                        onChange={manejarCambio}
                        name={nombre}
                        readOnly={escribir}/>
                    </div>
                )
            }
        </div>
    )
}

export default InputTexto;