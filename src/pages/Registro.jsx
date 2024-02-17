import '../assets/stylesheet/Registro.css';
import { crear_paquete } from '../api/api.jsx';
import { buscar } from '../api/api.jsx';
import { useState } from 'react';
import CampoTexto from '../components/CampoTexto/index.jsx';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ListaOpciones from '../components/ListaEscolares/index.jsx';
import Boton from '../components/Boton/index.jsx'
import { useNavigate } from 'react-router-dom';

const Registro = () => {

    // Datos personales

    const location = useLocation();
    const datos = location.state && location.state.datosAEnviar;

    const [curp, actualizarCurp] = useState("");
    const [dato, actualizarDatos] = useState("");

    // Datos escolares
    const [nivel_escolar, setNivelEscolar] = useState('');
    const [grado, setGrado] = useState('');
    const [escuela, setEscuela] = useState('');
    const [entrega, setEntrega] = useState('');

    const navigate = useNavigate();

    const diccionario = {
        nombre:'',
        primer_apellido: '',
        segundo_apellido: '',
        genero: '',
        estado : '',
        fecha_nacimiento:''
    }
    
    const manejarEnvioFormulario = async (event) => {
        event.preventDefault();

        const paquete = {
            tutor_curp:datos.curp,
            beneficiario_curp: curp,
            institucion:escuela,
            direccion_entrega:entrega
        }

        try{
            const respuesta = await crear_paquete('apiv1/entrega/create/', paquete)
            Swal.fire({
                icon: 'success',
                title: 'Registro correcto',
                html:`
                <div>
                    <div className="content-exito">
                        <p>-Numero de entrega: <strong>${respuesta.numero_entrega}</strong></p>
                        <p>-solicitante: <strong>${respuesta.tutor_curp}</strong></p>
                        <p>-Beneficiario (Hij@):<strong>${respuesta.beneficiario_curp}</strong></p>
                        <p>-institucion: <strong>${respuesta.institucion}</strong></p>
                        <p>-Lugar y dia de entrega: <strong>${respuesta.direccion_entrega}</strong></p>
                    </div>
                </div>
                `,
                confirmButtonText: 'Cerrar',
              })

            actualizarDatos(diccionario)
            
        }catch (error){
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.Error,
              })
        }
    }


    console.log(dato);


    

    const buscarYActualizarDatos = async (curp) => {
        try{
            console.log(curp);
            if(curp === ''){
                actualizarDatos(diccionario)
            }else{
                const datos = await  buscar(`apiv1/beneficiado/detalle/${curp}`,actualizarDatos)
            }

        } catch (error){
            actualizarDatos(diccionario)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Los datos son incorrectos!`,
              })
        }
      };

    const manejarCambioCurp = (event) => {
        const nuevaCurp = event.target.value;
        actualizarCurp(nuevaCurp);
    
        buscarYActualizarDatos(nuevaCurp);
    }; 


    return(
        <section className='contenedor-registro'>
            <form className='formulario-registro' onSubmit={manejarEnvioFormulario}>
            <h2>Datos personales</h2>
            
            <CampoTexto texto='Curp' 
                placeholder='Ingrese su curp' required={true}
                valor={curp} actualizarValor={actualizarCurp}
                nombre='curp' longitud={18}
                clase='no-punteado' buscarDatos={buscarYActualizarDatos}
                escribir={false}/>

                <CampoTexto texto='Nombre' 
                placeholder='Ingrese su nombre' required={true}
                valor={dato.nombre} actualizarValor={actualizarDatos}
                nombre='nombre' clase='punteado'
                escribir={true}/>

                <CampoTexto texto='Primer Apellido' 
                placeholder='Ingrese su primer apellido' required={true}
                valor={dato.primer_apellido} actualizarValor={actualizarDatos}
                nombre='primer_apellido' clase='punteado'
                escribir={true}/>
                
                <CampoTexto texto='Segundo Apellido' 
                placeholder='Ingrese su segundo apellido' required={true}
                valor={dato.segundo_apellido} actualizarValor={actualizarDatos}
                nombre='segundo_apellido' clase='punteado'
                escribir={true}/>

                <CampoTexto texto='Genero' 
                placeholder='Ingrese su genero (Masculino - Femenino)' required={true}
                valor={dato && dato.genero && dato.genero.nombre} actualizarValor={actualizarDatos}
                nombre='genero' clase='punteado'
                escribir={true}/>

                <CampoTexto texto='Estado' 
                placeholder='Ingrese su estado' required={true}
                valor={dato && dato.estado && dato.estado.nombre} actualizarValor={actualizarDatos}
                nombre='estado' clase='punteado'
                escribir={true}/>

                <CampoTexto texto='Fecha de nacimiento' 
                placeholder='Ingrese su fecha de nacimiento' required={true}
                valor={dato.fecha_nacimiento} actualizarValor={actualizarDatos}
                nombre='fecha_nacimiento' clase='punteado'
                escribir={true}/>

                <h2>Datos escolares</h2>
                <ListaOpciones manejarCambio={setNivelEscolar} inputDato={'nivel-escolar'}/>
                <ListaOpciones manejarCambio={setGrado} inputDato={'grado'}/>
                <ListaOpciones manejarCambio={setEscuela} inputDato={'escuela'}/>
                <ListaOpciones manejarCambio={setEntrega} inputDato={'entrega'}/>

                <Boton>Registrar</Boton>
            </form>
        </section>
    )
}


export default Registro;