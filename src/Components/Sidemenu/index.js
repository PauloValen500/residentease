import { Link } from 'react-router-dom';
import './sidemenu.css';
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { TbUserSquareRounded } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";

function Sidemenu() {
    return (
        <div className='sidemenu'>
            <div className='iconcontainersidemenu'>      
                <Link to={'/inicio'} className='link'>
                    <BiMessageSquareDetail className='iconsidemenu'/>
                    <span className='titlesidemenu'>Avisos</span>
                </Link>
            </div>
            <div className='iconcontainersidemenu'>             
                <Link to={'/pagos'} className='link'>
                    <MdOutlinePayment className='iconsidemenu'/>
                    <span className='titlesidemenu'>Pagos</span>
                </Link>
            </div>
            <div className='iconcontainersidemenu'>         
                <Link to={'/visitas'} className='link'>
                    <FaPeopleRoof className='iconsidemenu'/>
                    <span className='titlesidemenu'>Visitas</span>
                </Link>
            </div>
            <div className='iconcontainersidemenu'>
                <Link to={'/cuenta'} className='link'>
                    <TbUserSquareRounded className='iconsidemenu'/>
                    <span className='titlesidemenu'>Cuenta</span>
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

export default Sidemenu;
