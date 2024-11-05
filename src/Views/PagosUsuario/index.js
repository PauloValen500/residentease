import React from "react";
import HistorialPagos from "../../Components/HistorialPagos";
import Sidemenu from "../../Components/Sidemenu";
import Navbar from "../../Components/Navbar";

function PagosUsuario(){
    return(
        <>
            <Navbar/>
            <Sidemenu/>
            <HistorialPagos/>
        </>
    )
}

export default PagosUsuario;