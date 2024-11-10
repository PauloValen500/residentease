import { Link } from 'react-router-dom';
import './sidemenu.css';
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { TbUserSquareRounded } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";

function SidemenuAdmin() {
    return (
        <div className='sidemenu'>
            <div className='iconcontainersidemenu'>      
                <Link to={'/AdminAvisos'} className='link'>
                    <BiMessageSquareDetail className='iconsidemenu'/>
                    <span className='titlesidemenu'>Admin. Avisos</span>
                </Link>
            </div>
            <div className='iconcontainersidemenu'>             
                <Link to={'/AdminPagos'} className='link'>
                    <MdOutlinePayment className='iconsidemenu'/>
                    <span className='titlesidemenu'>Admin. Pagos</span>
                </Link>
            </div>
            <div className='iconcontainersidemenu'>
                <Link to={'/AdminCuentas'} className='link'>
                    <TbUserSquareRounded className='iconsidemenu'/>
                    <span className='titlesidemenu'>Colonos</span>
                </Link>
            </div>
            <div className='iconcontainersidemenu'>
                <Link to={'/login'} className='link'>
                    <TbLogout2 className='iconsidemenu'/>
                    <span className='titlesidemenu'>Salir</span>
                </Link>
            </div>
        </div>
    );
}

export default SidemenuAdmin;
