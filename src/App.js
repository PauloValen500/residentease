import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Views/Colono/Login';
import Register from './Views/Colono/Register';
import Inicio from './Views/Colono/Inicio/index';
import PagosUsuario from './Views/Colono/PagosUsuario';
import Cuenta from './Views/Colono/Cuenta/index';
import CreateNoticeView from './Views/Admin/CreateNotice';
import ManagePaymentsView from './Views/Admin/ManagePayments';
import ManageUsersView from './Views/Admin/ManageUsers';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Vistas del colono */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/inicio' element={<Inicio />}/>
          <Route path='/pagos' element={<PagosUsuario/>}/>
          <Route path='/cuenta' element={<Cuenta/>}/>
          {/* Vistas del administrador */}
          <Route path='/createnotice' element={<CreateNoticeView/>}/>
          <Route path='/managepayments' element={<ManagePaymentsView/>} />
          <Route path='/manageusers' element={<ManageUsersView/>} />
          {/* Ruta principal la cual se abre al ejecutar npm start */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
