import React from "react";
import CreateNotice from "../../../Components/AdminComponents/CreateNotice";
import Navbar from "../../../Components/UserComponents/Navbar";
import SidemenuAdmin from "../../../Components/AdminComponents/Sidemenu";

function CreateNoticeView() {
    return (
        <>
            <Navbar/>
            <CreateNotice />
            <SidemenuAdmin/>
        </>
    )
}

export default CreateNoticeView;