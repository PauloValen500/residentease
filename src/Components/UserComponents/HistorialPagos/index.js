import React, { useState, useEffect } from 'react';
import DetallesPago from './DetallesPago';
import { IoCloseCircleOutline } from "react-icons/io5";
import './index.css';
import './agregarpago.css';

const HistorialPagos = () => {
    const [pagos, setPagos] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [details, setDetails] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:5000/api/pagos/${userId}`)
                .then(response => response.json())
                .then(data => setPagos(data))
                .catch(error => console.error('Error al cargar los pagos:', error));
        }
    }, [userId]);

    const handleViewDetails = (paymentId) => {
        fetch(`http://localhost:5000/api/pago/${paymentId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener detalles del pago.');
                }
                return response.json();
            })
            .then(data => setSelectedPayment(data))
            .catch(error => {
                console.error('Error al obtener detalles del pago:', error);
                setSelectedPayment(null);
            });
    };

    const closeDetails = () => {
        setSelectedPayment(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPayment = { userId, date, amount, details };

        fetch('http://localhost:5000/api/pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPayment),
        })
            .then(response => {
                if (response.ok) {
                    setSuccessMessage('Pago registrado con éxito');
                    setErrorMessage('');
                    return fetch(`http://localhost:5000/api/pagos/${userId}`)
                        .then(response => response.json())
                        .then(data => {
                            setPagos(data);
                            setShowAddPayment(false);
                            setDate('');
                            setAmount('');
                            setDetails('');
                        });
                } else {
                    throw new Error('Error al registrar el pago');
                }
            })
            .catch(error => {
                console.error('Error al registrar el pago:', error);
                setSuccessMessage('');
                setErrorMessage('Error al registrar el pago. Por favor, intenta nuevamente.');
            });
    };

    return (
        <div className='historialpagoscontainer'>
            <h2>Historial de Pagos</h2>
            <button className='btpago' onClick={() => setShowAddPayment(true)}>Agregar Pago</button>
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
                            <td>${pago.Monto}</td>
                            <td>
                                <button onClick={() => handleViewDetails(pago.Id_Pago)}>Ver detalles</button>
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
                        <IoCloseCircleOutline id='iconclosepago' onClick={() => setShowAddPayment(false)} />
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
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistorialPagos;
