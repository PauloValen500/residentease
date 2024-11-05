import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./registerform.css";

function Registerform() {
    // Hook para la navegación
    const navigate = useNavigate();

    // Referencias para los campos del formulario
    const telefonoRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Función para mostrar el mensaje de éxito y cambiar el fondo temporalmente
    const showSuccess = () => {
        const container = document.querySelector('.registerformcontainer');
        container.style.backgroundColor = '#12A14B'; // Cambia el fondo a verde

        setTimeout(() => {
            navigate('/login'); // Redirige al enlace después de 3 segundos
            container.style.backgroundColor = '#86D293'; // Vuelve al color original (azul)
        }, 3000); // 3000 milisegundos = 3 segundos
    };

    // Función para validar el formulario
    const validateForm = () => {
        const telefono = telefonoRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // Validar número de celular
        if (!/^\d{10}$/.test(telefono)) {
            telefonoRef.current.classList.add('input-error'); // Añadir clase de error si no es válido
        } else {
            telefonoRef.current.classList.remove('input-error'); // Remover clase de error si es válido
        }

        // Validar contraseñas
        if (password !== confirmPassword) {
            passwordRef.current.classList.add('input-error'); // Añadir clase de error si no coinciden
            confirmPasswordRef.current.classList.add('input-error'); // Añadir clase de error si no coinciden
        } else {
            passwordRef.current.classList.remove('input-error'); // Remover clase de error si coinciden
            confirmPasswordRef.current.classList.remove('input-error'); // Remover clase de error si coinciden
        }

        // Si todo es válido, mostrar mensaje de éxito
        if (/^\d{10}$/.test(telefono) && password === confirmPassword) {
            showSuccess();
        }
    };

    return (
        <div className='registerformcontainer'>
            <section>
                <form>
                    <h2 className="titulo">Registro de datos</h2>
                    <div className='subformcontainer'>
                        <input className="input" type="text" placeholder="Nombre" />
                        <input className="input" type="text" placeholder="Apellidos" />
                    </div>
                    <input className='input' type='text' placeholder='Dirección' />
                    <input className='input' type='number' ref={telefonoRef} placeholder="Número de celular" />
                    <input className="input" type="email" placeholder="Correo" />
                    <div className='subformcontainer'>
                        <input className="input" type="password" ref={passwordRef} placeholder="Ingresa una contraseña" />
                        <input className="input" type="password" ref={confirmPasswordRef} placeholder="Verifica la contraseña" />
                    </div>
                    <button type="button" className="bt-register" onClick={validateForm}>Registrar</button>
                </form>
                <Link to={'/login'}><button className='bt-regresar'>Regresar</button></Link>
                <div className='air air1'></div>
                <div className='air air2'></div>
                <div className='air air3'></div>
                <div className='air air4'></div>
            </section>
        </div>
    );
}

export default Registerform;








