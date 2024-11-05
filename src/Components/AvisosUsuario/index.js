import React from "react";
import Aviso from "./Aviso";
import './AvisosUsuario.css'


function AvisosUsuario() {
    return(
        <div className="avisoscontainer">
            <h2 className="subtitulo">Avisos</h2>
            <Aviso/>
        </div>
    )
}

export default AvisosUsuario