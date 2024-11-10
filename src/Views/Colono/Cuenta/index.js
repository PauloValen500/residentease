import React from "react";
import CuentaUsuario from "../../../Components/UserComponents/CuentaUsuario";
import Sidemenu from "../../../Components/UserComponents/Sidemenu";
import Navbar from "../../../Components/UserComponents/Navbar";

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