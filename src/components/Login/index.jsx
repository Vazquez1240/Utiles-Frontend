import InputTexto from "../inputTexto/index.jsx";
import './login.css'
import Boton from "../Boton/index.jsx";
import { useState, useEffect } from 'react';
import { login, setAuthToken } from "../../api/api.jsx";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from "react-router-dom";

const FormularioLogin = () => {


    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');

    const navigate = useNavigate()

    const manejarEnvio = async (event) => {
        event.preventDefault()

        const data = {
            username : usuario,
            password : contraseña
        }

        try{
            const respuesta = await login('apiv2/login/', data)
            const token = respuesta.data.token

            localStorage.setItem('token', token)

            localStorage.setItem('sesion',true)

            navigate('/sesion')
            
        }catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La contraseña o el usuario es incorrecto',
              })
        }
    }
    
    return(
        <section onSubmit={manejarEnvio} className="content-login">
            <form className="formulario-login">
                <InputTexto
                texto='Ingrese su usuario'
                tipo='text'
                valor={usuario}
                actualizarValor={setUsuario}
                placeholder='usuario'
                nombre={'username'}
                pagina={'login'}/>
                
                <InputTexto
                texto='Ingrese su contraseña'
                tipo='password'
                placeholder='contraseña'
                valor={contraseña}
                actualizarValor={setContraseña}
                nombre={'password'}
                pagina={'login'}/>

                <Boton>Iniciar Sesion</Boton>

            </form>
        </section>
    )
}


export default FormularioLogin;