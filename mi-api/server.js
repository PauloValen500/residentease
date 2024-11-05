const express = require('express');
const mssql = require('mssql');
const cors = require('cors'); // Importa cors
const app = express();
const port = 3000;

// Configuración de la base de datos
const config = {
    user: 'nuevo_usuario',
    password: 'nueva_contraseña',
    server: 'Paulo',
    database: 'residentease',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Configuración de CORS
const corsOptions = {
    origin: 'http://localhost:3001', // Permite solicitudes desde este origen
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Usa cors con las opciones configuradas

// Conexión a la base de datos
mssql.connect(config, (err) => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conexión exitosa a SQL Server');

    // Ruta para obtener datos de la tabla Colono
    app.get('/api/colono', (req, res) => {
        const request = new mssql.Request();
        request.query('SELECT * FROM Colono', (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result.recordset);
            }
        });
    });

    // Ruta para obtener datos de Administrador
    app.get('/api/administrador', (req, res) => {
        const request = new mssql.Request();
        request.query('SELECT * FROM Administrador', (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result.recordset);
            }
        });
    });

    // Ruta para obtener datos de Guardia
    app.get('/api/guardia', (req, res) => {
        const request = new mssql.Request();
        request.query('SELECT * FROM Guardia', (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result.recordset);
            }
        });
    });

    // Ruta para obtener datos de Aviso
    app.get('/api/aviso', (req, res) => {
        const request = new mssql.Request();
        request.query('SELECT * FROM Aviso ORDER BY Fecha DESC', (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(result.recordset);
            }
        });
    });

        // Ruta para obtener datos de pagos
        app.get('/api/pago', (req, res) => {
            const request = new mssql.Request();
            request.query('SELECT * FROM Pago', (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result.recordset);
                }
            });
        });

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });
});
