import React from "react";
import Sidemenu from "../../../Components/UserComponents/Sidemenu";
import Navbar from "../../../Components/UserComponents/Navbar";
import AvisosUsuario from "../../../Components/UserComponents/AvisosUsuario";

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