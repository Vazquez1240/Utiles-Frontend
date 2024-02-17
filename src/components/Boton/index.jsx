import './boton.css'

const Boton = (props) => {
    return (
        <button className='boton'>{props.children.toUpperCase()}</button>
    )
};

export default Boton;