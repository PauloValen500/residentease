// DetallesPago.js
import React from 'react';
import './detallespago.css';
import { IoCloseCircleOutline } from "react-icons/io5";

const DetallesPago = ({ payment, onClose }) => {
  if (!payment) return null; // Verificación adicional

  return (
    <div className='detallepagocontainer'>
      <div id='detallepago'>
        <h2>Detalles del Pago</h2>
        <IoCloseCircleOutline id='iconclosepago' onClick={onClose} />
        <p>Fecha: {new Date(payment.Fecha).toLocaleDateString()}</p>
        <p>Monto: {payment.Monto}</p>
        <p>Detalles: {payment.Descripción}</p>
      </div>
    </div>
  );
};

export default DetallesPago;
