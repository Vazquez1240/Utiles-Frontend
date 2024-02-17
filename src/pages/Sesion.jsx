import FormularioPaquete from "../components/FormularioPaquete/index.jsx"
import PaqueteDetalle from "../components/PaqueteDetalle/index.jsx"
import '../assets/stylesheet/Sesion.css'

const Sesion = ({ mostrarFormulario, inputValue, setMostrarFormulario }) => {

    const token = localStorage.getItem('token') 

    if(!token){
        return (
           <div className="container-sesion-error">
            <div className="content-sesion-error">
                <h2>No tiene acceso a esta seccion</h2>
                <p>Porfavor regrese al inicio</p>
            </div>
           </div>
        )
    }


    return (
        <div className="container-sesion">
            <div className="content-sesion">

                {
                    mostrarFormulario ? (
                        <FormularioPaquete />
                    ):(
                        <PaqueteDetalle setMostrarFormulario={setMostrarFormulario} inputValue={inputValue}/>
                    )
                }
                
            </div>
        </div>
    )
}
export default Sesion;