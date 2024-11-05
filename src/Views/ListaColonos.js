import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaColonos() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a tu API
        axios.get('http://localhost:3000/api/colono')
            .then(response => {
                // Almacena los datos obtenidos en el estado
                setData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Colonos</h1>
            <ul>
                {data.map((colono, index) => (
                    <li key={index}>
                        {colono.Nombre} {colono.Apellido} - {colono.Direccion} - {colono.Telefono}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaColonos;