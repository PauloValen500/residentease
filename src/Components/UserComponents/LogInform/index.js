import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css';
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";

function LogInform() {
    const [email, setEmail] = useState(""); // Correo electrónico
    const [password, setPassword] = useState(""); // Contraseña
    const [userType, setUserType] = useState("Residente"); // Tipo de usuario predeterminado
    const [errorMessage, setErrorMessage] = useState(""); // Mensajes de error
    const navigate = useNavigate(); // Navegación para redirigir en caso de éxito

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!userType) {
            setErrorMessage("Por favor, selecciona un tipo de usuario.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userType }),
            });

            const data = await response.json();

            if (data.success) {
                // Guardar el userId y userType en el almacenamiento local
                localStorage.setItem('userId', data.user.Id_Colono || data.user.Id_Admin);
                localStorage.setItem('userType', userType);

                // Redirigir según el tipo de usuario
                if (userType === "Residente") {
                    navigate('/inicio', { state: { user: data.user, userType } });
                } else if (userType === "Administrador") {
                    navigate('/createnotice', { state: { user: data.user, userType } });
                }
            } else {
                // Mostrar mensaje de error
                setErrorMessage(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al conectar con el servidor');
        }
    };

    return (
        <div className="loginContainer">
            <h1 id="residenease">RESIDENTEASE.</h1>
            <section>
                <form id="loginform" onSubmit={handleLogin}>
                    <h3 className="text1">Ingresa tus credenciales</h3>
                    <div className="input-container">
                        <input
                            type="email"
                            id="inputlogin"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <CiUser className="iconlogin" />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            id="inputlogin"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <IoMdKey className="iconlogin" />
                    </div>
                    <label htmlFor="opciones">Tipo de usuario:</label>
                    <select
                        id="opciones"
                        name="opciones"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="Residente">Residente</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    <button type="submit" className="bt-confirmar">Confirmar</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Link to={'/register'}>
                    <button className="bt-registrar">Registrarme</button>
                </Link>
                <div className='air air1'></div>
                <div className='air air2'></div>
                <div className='air air3'></div>
                <div className='air air4'></div>
            </section>
        </div>
    );
}

export default LogInform;
