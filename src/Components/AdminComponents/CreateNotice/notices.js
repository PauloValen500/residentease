import React, { useEffect, useState } from "react";
import "./CreateNotice.css"

function Notices() {
    const [avisos, setAvisos] = useState([]);
    const [form, setForm] = useState({ Id_Aviso: '', Id_Admin: '', Mensaje: '', Fecha: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/Aviso')
            .then(response => response.json())
            .then(data => setAvisos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            // Lógica para actualizar un aviso existente
            console.log('Actualizar aviso:', form);
        } else {
            // Lógica para crear un nuevo aviso
            console.log('Crear nuevo aviso:', form);
        }
        setForm({ Id_Aviso: '', Id_Admin: '', Mensaje: '', Fecha: '' });
        setIsEditing(false);
    };

    const handleEdit = (aviso) => {
        setForm(aviso);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        // Lógica para eliminar un aviso
        console.log('Eliminar aviso con ID:', id);
    };

    return (
        <div className="admin-crud-container">
            <h2 className="admin-title">Administración de Avisos</h2>

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
                {isEditing && (
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => {
                            setIsEditing(false);
                            setForm({ Id_Aviso: '', Id_Admin: '', Mensaje: '', Fecha: '' });
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <table className="tableaviso" border='1'>
                <thead className="headtable">
                    <tr>
                        <td>ID Aviso</td>
                        <td>ID Administrador</td>
                        <td>Mensaje</td>
                        <td>Fecha</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody className="registrosaviso">
                    {avisos.map(aviso => (
                        <tr key={aviso.Id_Aviso}>
                            <td>{aviso.Id_Aviso}</td>
                            <td>{aviso.Id_Admin}</td>
                            <td>{aviso.Mensaje}</td>
                            <td>{new Date(aviso.Fecha).toLocaleDateString()}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(aviso)}>Editar</button>
                                <button className="btn-delete" onClick={() => handleDelete(aviso.Id_Aviso)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Notices;