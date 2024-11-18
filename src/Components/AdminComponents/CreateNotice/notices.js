import React, { useEffect, useState } from "react";
import "./CreateNotice.css";

function Notices() {
    const [avisos, setAvisos] = useState([]);
    const [form, setForm] = useState({ Id_Admin: '', Mensaje: '', Fecha: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Obtener todos los avisos
    useEffect(() => {
        fetch('http://localhost:5000/api/avisos')
            .then(response => response.json())
            .then(data => setAvisos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Lógica para crear un nuevo aviso
        fetch('http://localhost:5000/api/aviso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
            .then(response => {
                if (response.ok) {
                    setSuccess('Aviso registrado con éxito.');
                    setError('');
                    setForm({ Id_Admin: '', Mensaje: '', Fecha: '' }); // Limpiar formulario

                    // Actualizar la lista de avisos
                    fetch('http://localhost:5000/api/avisos')
                        .then(response => response.json())
                        .then(data => setAvisos(data));
                } else {
                    return response.json().then(err => {
                        throw new Error(err.error || 'Error al registrar el aviso');
                    });
                }
            })
            .catch(err => {
                setSuccess('');
                setError(err.message);
                console.error('Error al registrar el aviso:', err);
            });
    };

    return (
        <div className="admin-crud-container">
            <h2 className="admin-title">Administración de Avisos</h2>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="aviso-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Id_Admin"
                    placeholder="ID Administrador"
                    value={form.Id_Admin}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Mensaje"
                    placeholder="Mensaje"
                    value={form.Mensaje}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="Fecha"
                    value={form.Fecha}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn-submit">
                    {isEditing ? 'Actualizar' : 'Crear'}
                </button>
            </form>

            <table className="tableaviso" border="1">
                <thead className="headtable">
                    <tr>
                        <td>ID Aviso</td>
                        <td>ID Administrador</td>
                        <td>Mensaje</td>
                        <td>Fecha</td>
                    </tr>
                </thead>
                <tbody className="registrosaviso">
                    {avisos.map(aviso => (
                        <tr key={aviso.Id_Aviso}>
                            <td>{aviso.Id_Aviso}</td>
                            <td>{aviso.Id_Admin}</td>
                            <td>{aviso.Mensaje}</td>
                            <td>{new Date(aviso.Fecha).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Notices;
