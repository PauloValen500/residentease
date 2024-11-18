import React, { useEffect, useState } from "react";
import './Aviso.css';

function Aviso() {
    const [avisos, setAvisos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/Aviso')
            .then(response => response.json())
            .then(data => setAvisos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <table className="tableaviso" border='1'>
            <thead className="headtable">
                <tr>
                    <td>Administrador</td>
                    <td>Mensaje</td>
                    <td>Fecha</td>
                </tr>
            </thead>
            <tbody className="registrosaviso">
                {avisos.map(aviso => (
                    <tr key={aviso.Id_Aviso}>
                        <td>{aviso.Id_Admin}</td>
                        <td>{aviso.Mensaje}</td>
                        <td>{new Date(aviso.Fecha).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Aviso;