import React, { useState } from 'react';
import './visitasusuario.css'

const VisitasUsuario = () => {
  const [visitas, setVisitas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [motivo, setmotivo] = useState('');

  const agregarVisita = (e) => {
    e.preventDefault();
    const nuevaVisita = { nombre, fecha, motivo, direccion };
    setVisitas([...visitas, nuevaVisita]);
    setNombre('');
    setFecha('');
    setDireccion('');
    setmotivo('');
  };

  return (
    <div className='container'>
      <h2>Registro de Visitantes</h2>
      <form onSubmit={agregarVisita} className='formvisita'>
        <div className='inputvisita'>
          <label>Nombre del Visitante:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className='inputvisita'>
          <label>Motivo:</label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setmotivo(e.target.value)}
            required
          />
        </div>
        <div className='inputvisita'>
          <label>Fecha de la Visita:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className='inputvisita'>
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setmotivo(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='agregarVisitas'>Agregar Visita</button>
      </form>
      <h3>Visitas Agendadas</h3>
      <ul>
        {visitas.map((visita, index) => (
          <li key={index}>
            {visita.nombre} - {visita.motivo} - {visita.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitasUsuario;
