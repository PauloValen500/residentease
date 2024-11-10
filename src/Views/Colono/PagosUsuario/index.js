import React from "react";
import HistorialPagos from "../../../Components/UserComponents/HistorialPagos";
import Sidemenu from "../../../Components/UserComponents/Sidemenu";
import Navbar from "../../../Components/UserComponents/Navbar";

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