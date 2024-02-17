import Boton from '../Boton/index.jsx'
import './FormularioPaquete.css'
import { useState } from 'react';
import { buscar_paquete, marcar_paquete } from '../../api/api.jsx';
import InputTexto from '../inputTexto/index.jsx'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const FormularioPaquete = () => {
    
    const token = localStorage.getItem('token');
    
    const [numero_entrega, actualizarNumeroEntrega] = useState("");
    const [dato, actualizarDatos] = useState("");
    const [paquete, actualizarPaquete] = useState("")

    const diccionario = {
        tutor_curp: '',
        beneficiario_curp:'',
        institucion:'',
        direccion_entrega:''

    }


    const enviarFormulario = async (event) => {
        event.preventDefault();  

        try{
            const respuesta = await marcar_paquete(`apiv1/entrega/${numero_entrega}/entregar/`, actualizarPaquete, token);
            Swal.fire({
                icon: 'success',
                title: 'Registro correcto',
                text:'Paquete entregado correctamente',
                confirmButtonText: 'Cerrar',
              })
            
        }catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Registro correcto',
                text: error.response.data.Error,
                confirmButtonText: 'Cerrar',
              })
            }
            
        }
    


    const buscarYActualizarDatos = async (numero_entrega) => {
        try{
            if(dato.Error === "Lo sentimos no pudimos encontrar esa entrega"){
                actualizarDatos(diccionario)
            }
            if(numero_entrega === ''){
                actualizarDatos(diccionario)

            }else{
                const datos = await  buscar_paquete(`apiv1/entrega/detalle-numero_entrega/${numero_entrega}`,actualizarDatos,token)

            }

        } catch (error){
            actualizarNumeroEntrega('')
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Los datos son incorrectos!`,
              })
        }
      };
      const manejarCambioCurp = (event) => {
        const numeroEntrega = event.target.value;
        actualizarNumeroEntrega(numeroEntrega);
    
        buscarYActualizarDatos(numeroEntrega);
    };  


    

    return(
        <div className="cotainer-paquete">
            <div className="content-paquete">

                <form onSubmit={enviarFormulario} className='formulario-paquete'>
                    
                    <InputTexto
                    texto='Ingrese el numero de entrega'
                    tipo='number'
                    placeholder={'Ingrese el numero de entrega'}
                    valor={numero_entrega}
                    actualizarValor={actualizarNumeroEntrega}
                    nombre='numero_entrega'
                    pagina='sesion'
                    buscarDatos={buscarYActualizarDatos}
                    escribir={false}/>
                    
                    <InputTexto
                    texto='Solicitante'
                    tipo='text'
                    placeholder={'Solicitante'}
                    valor={dato.tutor_curp}
                    actualizarValor={actualizarDatos}
                    nombre='tutor_curp'
                    pagina='sesion'
                    escribir={true}/>

                    <InputTexto
                    texto='Beneficiario'
                    tipo='text'
                    placeholder={'Beneficiario'}
                    valor={dato.beneficiario_curp}
                    actualizarValor={actualizarDatos}
                    nombre='beneficiario_curp'
                    pagina='sesion'
                    escribir={true}/>

                    <InputTexto
                    texto='Institucion'
                    tipo='text'
                    placeholder={'Institucion'}
                    valor={dato.institucion}
                    actualizarValor={actualizarDatos}
                    nombre='beneficiario_curp'
                    pagina='sesion'
                    escribir={true}/>

                    <InputTexto
                    texto='Direccion de entrega'
                    tipo='text'
                    placeholder={'Direccion de entrega'}
                    valor={dato.direccion_entrega}
                    actualizarValor={actualizarDatos}
                    nombre='direccion_entrega'
                    pagina='sesion'
                    escribir={true}/>

                    <Boton>Entregar</Boton>
                </form>
                
            </div>
        </div>
    )
}

export default FormularioPaquete;