import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Aviso.css';

function Aviso() {
    const [avisos, setAvisos] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtén el userType (tipo de usuario) y el userId del almacenamiento local
        const userType = localStorage.getItem('userType');
        const adminId = localStorage.getItem('userId');

        // Verifica si el usuario es un administrador
        if (userType !== 'Administrador') {
            setError('Acceso denegado. Solo los administradores pueden ver los avisos.');
            // Redirige al usuario a la página de inicio o muestra un error
            setTimeout(() => navigate('/inicio'), 3000);
            return;
        }

        // Si el usuario es un administrador, carga los avisos
        if (adminId) {
            fetch(`http://localhost:5000/api/avisos/${adminId}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 403) {
                        throw new Error('No autorizado. Solo los administradores pueden ver los avisos.');
                    } else if (response.status === 404) {
                        throw new Error('No hay avisos para este administrador.');
                    } else {
                        throw new Error('Error al cargar los avisos.');
                    }
                })
                .then(data => setAvisos(data))
                .catch(error => {
                    console.error('Error al cargar los avisos:', error);
                    setError(error.message);
                });
        } else {
            setError('No hay un administrador autenticado.');
        }
    }, [navigate]);

    return (
        <div className="avisos-container">
            <h2>Mis Avisos</h2>
            {error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="tableaviso" border='1'>
                    <thead className="headtable">
                        <tr>
                            <td>Mensaje</td>
                            <td>Fecha</td>
                        </tr>
                    </thead>
                    <tbody className="registrosaviso">
                        {avisos.map(aviso => (
                            <tr key={aviso.Id_Aviso}>
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
