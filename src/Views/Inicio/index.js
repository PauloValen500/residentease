import React from "react";
import Sidemenu from "../../Components/Sidemenu";
import Navbar from "../../Components/Navbar";
import AvisosUsuario from "../../Components/AvisosUsuario";

function Inicio() {
    return(
        <>
        <Navbar/>
        <Sidemenu/>
        <AvisosUsuario/>
        </>
    )

}

export default Inicio