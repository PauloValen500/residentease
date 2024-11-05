import React from "react";
import CuentaUsuario from "../../Components/CuentaUsuario";
import Sidemenu from "../../Components/Sidemenu";
import Navbar from "../../Components/Navbar";

function Cuenta(){
    return(
        <>
            <Navbar/>
            <Sidemenu/>
            <CuentaUsuario/>
        </>
    )
}

export default Cuenta;