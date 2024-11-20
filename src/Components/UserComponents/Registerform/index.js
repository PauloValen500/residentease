import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./registerform.css";

function Registerform() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        correo: '',
        contraseña: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = () => {
        if (formData.contraseña !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        // Enviar datos al servidor
        fetch('http://localhost:5000/api/colonos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al registrar el usuario.');
                }
                return response.json();
            })
            .then(() => {
                setSuccessMessage('Usuario registrado correctamente.');
                setTimeout(() => navigate('/login'), 3000);
            })
            .catch(error => {
                setErrorMessage('Error al registrar el usuario.');
                console.error(error);
            });
    };

    return (
        <div className='registerformcontainer'>
            <section>
                <form>
                    <h2 className="titulo">Registro de datos</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <input
                        className="input"
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Número de celular"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="email"
                        placeholder="Correo"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bt-register"
                        onClick={handleRegister}
                    >
                        Registrar
                    </button>
                </form>
                <Link to={'/login'}>
                    <button className='bt-regresar'>Regresar</button>
                </Link>
                <div className='air air1'></div>
                <div className='air air2'></div>
                <div className='air air3'></div>
                <div className='air air4'></div>
            </section>
        </div>
    );
}

export default Registerform;
