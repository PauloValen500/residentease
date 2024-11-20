import React, { useEffect, useState } from "react";
import './Aviso.css';

function Aviso() {
    const [avisos, setAvisos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/avisos') // Asegúrate de que esta ruta es correcta en tu API
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los avisos.');
                }
                return response.json();
            })
            .then(data => setAvisos(data))
            .catch(error => {
                console.error('Error al obtener los avisos:', error);
                setError('No se pudieron cargar los avisos.');
            });
    }, []);

    return (
        <div className="avisos-container">
            {error && <p className="error-message">{error}</p>}
            {!error && (
                <table className="tableaviso" border='1'>
                    <thead className="headtable">
                        <tr>
                            <td>Administrador</td>
                            <td>Mensaje</td>
                            <td>Fecha</td>
                        </tr>
                    </thead>
                    <tbody className="registrosaviso">
                        {avisos.map(aviso => (
                            <tr key={aviso.Id_Aviso}>
                                <td>{aviso.Id_Admin}</td>
                                <td>{aviso.Mensaje}</td>
                                <td>{new Date(aviso.Fecha).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Aviso;
