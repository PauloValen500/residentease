import React, { useEffect, useState } from 'react';
import './cuentausuario.css';

const CuentaUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    direccion: '',
    telefono: ''
  });


  return (
    <div className="usuario-container">
      <h2>Información Personal</h2>
      <div className="usuario-info">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Contraseña:</strong> {usuario.contraseña}</p>
        <p><strong>Dirección:</strong> {usuario.direccion}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
      </div>
    </div>
  );
};

export default CuentaUsuario;
