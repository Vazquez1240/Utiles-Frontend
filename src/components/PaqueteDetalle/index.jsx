import './PaqueteDetalle.css'
import Boton from '../Boton/index.jsx';
import { Link } from 'react-router-dom';

const PaqueteDetalle = ({ setMostrarFormulario, inputValue }) => {


    const regresar = () => {
        setMostrarFormulario(true)
    }

    console.log(inputValue);
    return (
        <div className='seccion'>
            <div className="container-tabla">
                <div className="content-tabla">
                    <table>
                        <thead>
                            <tr>
                            <th>Numero de entrega</th>
                            <th>Solicitante</th>
                            <th>Beneficiario</th>
                            <th>Institucion</th>
                            <th>Direccion de entrega</th>
                            <th>Entregado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(inputValue) ? (
                                    inputValue.map((dato, index) => (
                                        <tr key={index}>
                                            {
                                                <>
                                                <td>{dato.numero_entrega}</td>
                                                <td>{dato.tutor_curp}</td>
                                                <td>{dato.beneficiario_curp}</td>
                                                <td>{dato.institucion}</td>
                                                <td>{dato.direccion_entrega}</td>
                                                {
                                                    dato.entregado ? (
                                                        <td>✔️</td>
                                                    ):(
                                                        <td>❌</td>
                                                    )
                                                }
                                                </>
                                            }
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No hay datos para mostrar</td>
                                    </tr>
                                )
                                }
                        </tbody>
                    </table>

                </div>
            </div>
            <button onClick={regresar}>Regresar</button>
        </div>
    )
}

export default PaqueteDetalle;