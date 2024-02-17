import CampoTexto from '../CampoTexto/index.jsx';
import { useState, useEffect } from 'react';
import {buscar} from '../../api/api.jsx'
import './formulario.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ListaOpciones from '../ListaOpciones/index.jsx';
import OpcionColonia from '../OpcionesColonia/index.jsx';
import Boton from '../Boton/index.jsx'
import { useNavigate } from 'react-router-dom';

const Formulario = () => {

    const [curp, actualizarCurp] = useState("");

    const [dato, actualizarDatos] = useState("");

    const [municipio, actualizarMunicipio] = useState("");

    const [colonia, actualizarColonia] = useState("");

    const [calle, actualizarCalle] = useState("");

    const [numeroInterior, actualizarNumeroInterior] = useState("");

    const [numeroExterior, actualizarNumeroExterior] = useState("");

    const [codigoPostal, actualizarCodigoPostal] = useState("");

    const [telefono, actualizarTelefono] = useState("");

    const navigate = useNavigate();



    const manejarEnvioFormulario = (event) => {

        event.preventDefault();
        
        let Validar = true;

        

        if(curp.length === ''){
            Validar = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No se ha ingresado ningun dato`,
              })
        }
        if(curp.length < 18 || curp.length > 18){
            Validar = false;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `La curp debe de tener 18 digitos`,
              })
        }
        if (Validar){
            let datosAEnviar = {
                curp: curp,
                nombre: dato.nombre,
                primer_apellido:dato.primer_apellido,
                segundo_apellido:dato.segundo_apellido,
                genero: dato.genero.nombre,
                estado : dato.estado.nombre,
                fecha_nacimiento:dato.fecha_nacimiento,
                municipio:municipio,
                colonia:colonia
            }
            navigate('/registro', {state:{datosAEnviar}})
        }
        
        
    }


    const diccionario = {
        nombre:'',
        primer_apellido: '',
        segundo_apellido: '',
        genero: '',
        estado : '',
        fecha_nacimiento:''
    }


    const buscarYActualizarDatos = async (curp) => {
        try{
            if(curp === ''){
                actualizarDatos(diccionario)
            }else{
                const datos = await  buscar(`apiv1/responsable/tutor/${curp}`,actualizarDatos)
                console.log(datos);
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

        console.log(nuevaCurp);
    
        buscarYActualizarDatos(nuevaCurp);
    };  


    

    return (
        <section className='section'>
            <form onSubmit={manejarEnvioFormulario} className='formulario-home'>
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

                <h2>Completa tus datos</h2>
                <ListaOpciones actualizarMunicipio={actualizarMunicipio}/>
                {
                    municipio === '19039'?(
                        <>
                        <OpcionColonia actualizarColonia={actualizarColonia} />
                        
                        <CampoTexto texto='Calle (Domicilio)' 
                        placeholder='Calle (Domicilio)' required={true}
                        valor={calle} actualizarValor={actualizarCalle}
                        nombre='calle' clase='no-punteado'
                        buscarDatos={actualizarCalle}
                        escribir={false}/>,
                        
                        <CampoTexto texto='Numero Exterior (Domicilio)' 
                        placeholder='Numero Exterior (Domicilio)' required={true}
                        valor={numeroExterior} actualizarValor={actualizarNumeroExterior}
                        nombre='numero_exterior' clase='no-punteado'
                        buscarDatos={actualizarNumeroExterior}
                        escribir={false}/>,
                        
                        <CampoTexto texto='Numero interior (Domicilio)' 
                        placeholder='Numero interior (Domicilio)' required={true}
                        valor={numeroInterior} actualizarValor={actualizarNumeroInterior}
                        nombre='numero_interior' clase='no-punteado'
                        buscarDatos={actualizarNumeroInterior}
                        escribir={false}/>

                        <CampoTexto texto='Codigo Postal' 
                        placeholder='Codigo Postal' required={true}
                        valor={codigoPostal} actualizarValor={actualizarCodigoPostal}
                        nombre='codigo_postal' clase='no-punteado'
                        buscarDatos={actualizarCodigoPostal}
                        escribir={false}/>

                        <CampoTexto texto='Telefono' 
                        placeholder='Telefono' required={true}
                        valor={telefono} actualizarValor={actualizarTelefono}
                        nombre='telefono' clase='no-punteado'
                        buscarDatos={actualizarTelefono}
                        escribir={false}/>
                        <Boton>Siguiente</Boton>

                        </>
                        
                    ):(
                        <>
                        <CampoTexto texto='Ingrese su colonia' 
                        placeholder='Ingrese su colonia' required={true}
                        valor={colonia} actualizarValor={actualizarColonia}
                        nombre='colonia' clase='no-punteado'
                        buscarDatos={actualizarColonia}
                        escribir={false}/>

                        
                        <CampoTexto texto='Calle (Domicilio)' 
                        placeholder='Calle (Domicilio)' required={true}
                        valor={calle} actualizarValor={actualizarCalle}
                        nombre='calle' clase='no-punteado'
                        buscarDatos={actualizarCalle}
                        escribir={false}/>,
                        
                        <CampoTexto texto='Numero Exterior (Domicilio)' 
                        placeholder='Numero Exterior (Domicilio)' required={true}
                        valor={numeroExterior} actualizarValor={actualizarNumeroExterior}
                        nombre='numero_exterior' clase='no-punteado'
                        buscarDatos={actualizarNumeroExterior}
                        escribir={false}/>,
                        
                        <CampoTexto texto='Numero interior (Domicilio)' 
                        placeholder='Numero interior (Domicilio)' required={true}
                        valor={numeroInterior} actualizarValor={actualizarNumeroInterior}
                        nombre='numero_interior' clase='no-punteado'
                        buscarDatos={actualizarNumeroInterior}
                        escribir={false}/>

                        <CampoTexto texto='Codigo Postal' 
                        placeholder='Codigo Postal' required={true}
                        valor={codigoPostal} actualizarValor={actualizarCodigoPostal}
                        nombre='codigo_postal' clase='no-punteado'
                        buscarDatos={actualizarCodigoPostal}
                        escribir={false}/>

                        <CampoTexto texto='Telefono' 
                        placeholder='Telefono' required={true}
                        valor={telefono} actualizarValor={actualizarTelefono}
                        nombre='telefono' clase='no-punteado'
                        buscarDatos={actualizarTelefono}
                        escribir={false}/>

                        <Boton>Siguiente</Boton>
                        </>

                    )
                }
            </form>

                

        </section>
    );
}

export default Formulario;