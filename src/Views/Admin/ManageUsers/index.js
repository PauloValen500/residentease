import React from "react";
import Navbar from "../../../Components/UserComponents/Navbar";
import SidemenuAdmin from "../../../Components/AdminComponents/Sidemenu";
import ManageUsers from "../../../Components/AdminComponents/ManageUsers";

function ManageUsersView() {
    return (
        <>
            <Navbar/>
            <SidemenuAdmin />
            <ManageUsers/>
        </>
    )
}

export default ManageUsersView;