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
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtén el userId del almacenamiento local
    const userId = localStorage.getItem('userId');

    if (userId) {
      fetch(`http://localhost:5000/api/usuario/${userId}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener la información del usuario');
          }
        })
        .then(data => {
          setUsuario({
            nombre: data.nombre,
            correo: data.correo,
            contraseña: data.contraseña,
            direccion: data.direccion || 'N/A',
            telefono: data.telefono
          });
        })
        .catch(error => {
          console.error('Error al cargar la información del usuario:', error);
          setError('No se pudo cargar la información del usuario.');
        });
    } else {
      setError('No hay un usuario autenticado.');
    }
  }, []);

  return (
    <div className="usuario-container">
      <h2>Información Personal</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="usuario-info">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Contraseña:</strong> {usuario.contraseña}</p>
          <p><strong>Dirección:</strong> {usuario.direccion}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
        </div>
      )}
    </div>
  );
};

export default CuentaUsuario;
