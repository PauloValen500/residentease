import React from "react";
import Navbar from "../../../Components/UserComponents/Navbar";
import SidemenuAdmin from "../../../Components/AdminComponents/Sidemenu";
import ManagePayment from "../../../Components/AdminComponents/ManagePayments";

function ManagePaymentsView(){
    return(
        <>
            <Navbar/>
            <SidemenuAdmin/>
            <ManagePayment/>
        </>
    )
}

export default ManagePaymentsView;