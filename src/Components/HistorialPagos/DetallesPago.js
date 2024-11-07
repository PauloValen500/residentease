import React, { useEffect, useState } from 'react';
import './detallespago.css';
import { IoCloseCircleOutline } from "react-icons/io5";

const DetallesPago = ({ paymentId, onClose }) => {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/Pago/${paymentId}`)
      .then(response => response.json())
      .then(data => setPayment(data))
      .catch(error => console.error('Error fetching payment details:', error));
  }, [paymentId]);

  return (
    <div className='detallepagocontainer'>
      <div id='detallepago'>
        <h2>Detalles del Pago</h2>
        <IoCloseCircleOutline id='iconclosepago' onClick={onClose} />
        {payment ? (
          <>
            <p>Fecha: {new Date(payment.Fecha).toLocaleDateString()}</p>
            <p>Monto: {payment.Monto}</p>
            <p>Detalles: {payment.Descripción}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DetallesPago;
