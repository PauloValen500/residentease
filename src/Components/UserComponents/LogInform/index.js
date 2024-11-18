import React from "react";
import './login.css'
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";


function LogInform() {
    return (
        <div className="loginContainer">
            <h1 id="residenease">RESIDENTEASE.</h1>
            <section>
                <form id="loginform">
                    <h3 className="text1">Ingresa tus credenciales</h3>
                    <div className="input-container">
                        <input type="text" id="inputlogin" placeholder="Usuario" ></input>
                        <CiUser className="iconlogin" />
                    </div>
                    <div className="input-container">
                        <input type="password" id="inputlogin" placeholder="Contraseña"></input>
                        <IoMdKey className="iconlogin"/>
                    </div>
                    <label htmlFor="opciones">Tipo de usuario:</label>
                    <select id="opciones" name="opciones">
                        <option value="opcion1">Residente</option>
                        <option value="opcion3">Administrador</option>
                    </select>
                    <Link to={'/inicio'}><button className="bt-confirmar">Confirmar</button></Link>
                </form>
                <Link to={'/register'}><button className="bt-registrar">Registrarme</button></Link>
                <div class='air air1'></div>
                <div class='air air2'></div>
                <div class='air air3'></div>
                <div class='air air4'></div>
            </section>
        </div>
    )
}

export default LogInform