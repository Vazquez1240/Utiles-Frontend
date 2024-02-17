import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Registro from './pages/Registro.jsx';
import Header from './components/Header/index.jsx';
import Login from './pages/Login.jsx';
import Page404 from './pages/Page404.jsx';
import Sesion from './pages/Sesion.jsx';
import { useState } from 'react';

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <Router>
      
      <Header inputValue={inputValue} setInputValue={setInputValue} setMostrarFormulario={setMostrarFormulario}/>

      <Routes >

        <Route path='/' element={<Home />}/>
        <Route path='/registro' element={<Registro/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sesion' element={<Sesion mostrarFormulario={mostrarFormulario} inputValue={inputValue} setMostrarFormulario={setMostrarFormulario}/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </Router>
  );
}

export default App;
