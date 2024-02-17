import './header.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { buscar_paquete, logout } from '../../api/api.jsx';


const Header = ({ inputValue, setInputValue, setMostrarFormulario }) => {

    const navigate = useNavigate()

    const [curp_entrega, setNumeroEntrega] = useState('')

    const Redireccionar = () => {
        navigate('/login')
    }
    const sesion = localStorage.getItem('sesion');
    const token = localStorage.getItem('token')

    const CerrarSesion = () => {
        
        logout('apiv2/logout/', token)
        localStorage.removeItem('token')
        localStorage.removeItem('sesion')
        navigate('/')
    }

    

    const manejarCambio= (event) => {
        const inputValue = event.target.value
        setNumeroEntrega(inputValue)
        if(curp_entrega.length < 18){
            setMostrarFormulario(true)
        }
        if(curp_entrega.length > 18){
            setMostrarFormulario(true)
        }
    }

    const buscarEntrega = async () => {
        if(curp_entrega.length === 18){
            try{
                const respuesta = await buscar_paquete(`apiv1/entrega/detalle/${curp_entrega}/`, setInputValue, token)
                setMostrarFormulario(false)
            }catch (error){
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.Error,
                  })
            }
            
        }
    }

    
    return(
        <div className='header'>
            <div className='titulo'>
                <Link to={'/'} className='link-titulo'>
                    <h2>Secretaria de Inovacion y gobierno abierto</h2>
                </Link>
                
            </div>
                {
                    sesion ? (
                        <div className="btn-buscador">
                        <div className='container-header'>
                                <div className='buscador'>
                                    <input type='text'
                                    onChange={manejarCambio}
                                    />

                                    <button onClick={buscarEntrega}>Buscar</button>
                                </div>
                                <button className='close-sesion' onClick={CerrarSesion}>Cerrar sesion</button>
                        </div>
                        </div>
                    ):(
                        <div className="btn">
                            <button onClick={Redireccionar}>Iniciar sesion</button>
                        </div>
                    )
                }
        </div>
    )
}

export default Header;