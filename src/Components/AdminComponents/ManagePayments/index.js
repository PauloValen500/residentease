import React, { useEffect, useState } from "react";
import './ManagePayment.css';

function ManagePayment() {
    const [pagos, setPagos] = useState([]);
    const [status, setStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    useEffect(() => {
        fetch('http://localhost:5000/api/pagos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los pagos.');
                }
                return response.json();
            })
            .then(data => {
                setPagos(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setStatus(prevStatus => ({
            ...prevStatus,
            [id]: newStatus
        }));
    };

    const handleSendEmail = (pago) => {
        const pagoStatus = status[pago.Id_Pago] || "No revisado";
        const emailContent = `
            Estimado Colono,

            Hemos revisado tu pago con el siguiente detalle:

            ID de Pago: ${pago.Id_Pago}
            Monto: $${pago.Monto}
            Fecha: ${new Date(pago.Fecha).toLocaleDateString()}
            Descripción: ${pago.Descripción}

            Estado del Pago: ${pagoStatus === "correcto" ? "Correcto" : (pagoStatus === "incorrecto" ? "Incorrecto" : "No revisado")}

            Gracias por tu atención.

            Saludos,
            Administrador
        `;

        fetch('http://localhost:5000/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: pago.Id_Colono,
                subject: `Estado de tu pago: ${pago.Id_Pago}`,
                content: emailContent,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar el correo.');
                }
                alert(`Correo enviado a ${pago.Id_Colono}`);
            })
            .catch(error => {
                console.error('Error al enviar el correo:', error);
                alert('Error al enviar el correo. Inténtalo nuevamente.');
            });
    };

    if (isLoading) {
        return <p>Cargando pagos...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="payment-review-container">
            <h2 className="admin-title">Revisión de Pagos</h2>
            <table className="tablepagos" border='1'>
                <thead className="headtable">
                    <tr>
                        <td>ID Pago</td>
                        <td>Email del Colono</td>
                        <td>Monto</td>
                        <td>Fecha</td>
                        <td>Descripción</td>
                        <td>Estado</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody className="registrosaviso">
                    {pagos.map(pago => (
                        <tr key={pago.Id_Pago}>
                            <td>{pago.Id_Pago}</td>
                            <td>{pago.Id_Colono}</td>
                            <td>${pago.Monto}</td>
                            <td>{new Date(pago.Fecha).toLocaleDateString()}</td>
                            <td>{pago.Descripción}</td>
                            <td>
                                <select
                                    value={status[pago.Id_Pago] || ""}
                                    onChange={(e) => handleStatusChange(pago.Id_Pago, e.target.value)}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="correcto">Correcto</option>
                                    <option value="incorrecto">Incorrecto</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn-send-email"
                                    onClick={() => handleSendEmail(pago)}
                                    disabled={!status[pago.Id_Pago]}
                                >
                                    Enviar Correo
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagePayment;
