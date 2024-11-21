import React, { useEffect, useState } from "react";
import './index.css';

function ManageUsers() {
    const [colonos, setColonos] = useState([]);
    const [form, setForm] = useState({
        Id_Colono: '',
        Contraseña: '',
        Nombre: '',
        Apellido: '',
        Direccion: '',
        Telefono: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Obtener colonos desde la API
        fetch('http://localhost:5000/api/users')
            .then(response => response.json())
            .then(data => setColonos(data))
            .catch(error => console.error('Error al obtener los colonos:', error));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            // Actualizar un colono existente
            fetch(`http://localhost:5000/api/users/${form.Id_Colono}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar el colono.');
                    }
                    return response.json();
                })
                .then(updatedColono => {
                    setColonos(colonos.map(col => col.Id_Colono === updatedColono.Id_Colono ? updatedColono : col));
                    alert('Colono actualizado correctamente.');
                })
                .catch(error => console.error('Error al actualizar el colono:', error));
        } else {
            // Crear un nuevo colono
            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al crear el colono.');
                    }
                    return response.json();
                })
                .then(newColono => {
                    setColonos([...colonos, newColono]);
                    alert('Colono creado correctamente.');
                })
                .catch(error => console.error('Error al crear el colono:', error));
        }

        setForm({
            Id_Colono: '',
            Contraseña: '',
            Nombre: '',
            Apellido: '',
            Direccion: '',
            Telefono: ''
        });
        setIsEditing(false);
    };

    const handleEdit = (colono) => {
        setForm(colono);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este colono?')) {
            fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el colono.');
                    }
                    setColonos(colonos.filter(colono => colono.Id_Colono !== id));
                    alert('Colono eliminado correctamente.');
                })
                .catch(error => console.error('Error al eliminar el colono:', error));
        }
    };

    return (
        <div className="colonos-crud-container">
            <h2 className="admin-title">Gestión de Colonos</h2>
            
            <form className="colono-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="Id_Colono"
                    placeholder="Email del Colono"
                    value={form.Id_Colono}
                    onChange={handleChange}
                    required
                    disabled={isEditing}
                />
                <input
                    type="password"
                    name="Contraseña"
                    placeholder="Contraseña"
                    value={form.Contraseña}
                    onChange={handleChange}
                    required={!isEditing} // Requerido solo al crear
                />
                <input
                    type="text"
                    name="Nombre"
                    placeholder="Nombre"
                    value={form.Nombre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Apellido"
                    placeholder="Apellido"
                    value={form.Apellido}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Direccion"
                    placeholder="Dirección"
                    value={form.Direccion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="Telefono"
                    placeholder="Teléfono"
                    value={form.Telefono}
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
                            setForm({
                                Id_Colono: '',
                                Contraseña: '',
                                Nombre: '',
                                Apellido: '',
                                Direccion: '',
                                Telefono: ''
                            });
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <table className="tableaviso" border='1'>
                <thead className="headtable">
                    <tr>
                        <td>Email del Colono</td>
                        <td>Nombre</td>
                        <td>Apellido</td>
                        <td>Dirección</td>
                        <td>Teléfono</td>
                        <td>Acciones</td>
                    </tr>
                </thead>
                <tbody className="registrosaviso">
                    {colonos.map(colono => (
                        <tr key={colono.Id_Colono}>
                            <td>{colono.Id_Colono}</td>
                            <td>{colono.Nombre}</td>
                            <td>{colono.Apellido}</td>
                            <td>{colono.Direccion}</td>
                            <td>{colono.Telefono}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(colono)}>Editar</button>
                                <button className="btn-delete" onClick={() => handleDelete(colono.Id_Colono)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUsers;
