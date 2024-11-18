// index.js
import React, { useState, useEffect } from 'react';
import DetallesPago from './DetallesPago';
import { IoCloseCircleOutline } from "react-icons/io5";
import './index.css';
import './agregarpago.css';

const HistorialPagos = () => {
  const [pagos, setPagos] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null); // Cambiado a objeto completo
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null); // Para manejar errores de fetch

  useEffect(() => {
    fetch('http://localhost:3000/api/Pago')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los pagos');
        }
        return response.json();
      })
      .then(data => setPagos(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar el nuevo pago
    console.log('Nuevo pago registrado:', { date, amount, details });
    // Después de registrar, podrías actualizar la lista de pagos
  };

  const handleViewDetails = (pago) => { // Recibe el objeto completo
    setSelectedPayment(pago);
  };

  const handleAddPayment = () => {
    setShowAddPayment(true);
  };

  const closeAddPayment = () => {
    setShowAddPayment(false);
  };

  const closeDetails = () => {
    setSelectedPayment(null);
  };

  return (
    <div className='historialpagoscontainer'>
      <h2>Historial de Pagos</h2>
      <button className='btpago' onClick={handleAddPayment}>Agregar Pago</button>
      {error && <p className='error'>Error: {error}</p>}
      <table className='table'>
        <thead className='headtable'>
          <tr>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.Id_Pago}>
              <td>{new Date(pago.Fecha).toLocaleDateString()}</td>
              <td>{pago.Monto}</td>
              <td>
                <button onClick={() => handleViewDetails(pago)}>Ver detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPayment && <DetallesPago payment={selectedPayment} onClose={closeDetails} />}
      {showAddPayment && (
        <div className='agregarpagocontainer'>
          <div className='agregarpago'>
            <h2>Registrar Nuevo Pago</h2>
            <IoCloseCircleOutline id='iconclosepago' onClick={closeAddPayment} />
            <form onSubmit={handleSubmit}>
              <label htmlFor="date">Fecha:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <label htmlFor="amount">Monto:</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <label htmlFor="details">Detalles:</label>
              <input
                type="text"
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
              <button type="submit">Registrar Pago</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialPagos;
