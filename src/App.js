import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Views/Login';
import Register from './Views/Register';
import Inicio from './Views/Inicio';
import PagosUsuario from './Views/PagosUsuario';
import Visitas from './Views/Visitas';
import Cuenta from './Views/Cuenta';
import ListaColonos from './Views/ListaColonos';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/inicio' element={<Inicio />}/>
          <Route path='/pagos' element={<PagosUsuario/>}/>

          <Route path='/cuenta' element={<Cuenta/>}/>
          <Route path="/colonos" element={<ListaColonos />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
