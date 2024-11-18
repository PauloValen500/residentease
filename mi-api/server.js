const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const app = express();
const port = 5000;

// Configuración de la base de datos
const config = {
    user: 'OscarPrueba',
    password: '12345678',
    server: '127.0.0.1',
    database: 'residentease',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    connectionTimeout: 30000,
};

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Permite solicitudes desde estos orígenes
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Conexión a la base de datos
mssql.connect(config).then(() => {
    console.log('Conexión exitosa a SQL Server');

    // Ruta para validar login
    app.post('/api/login', async (req, res) => {
        const { email, password, userType } = req.body;
        let table, idColumn;

        if (userType === 'Residente') {
            table = 'Colono';
            idColumn = 'Id_Colono';
        } else if (userType === 'Administrador') {
            table = 'Administrador';
            idColumn = 'Id_Admin';
        } else {
            return res.status(400).send({ error: 'Tipo de usuario inválido' });
        }

        try {
            const pool = await mssql.connect(config);
            const query = `
                SELECT ${idColumn}, Nombre, Apellido 
                FROM ${table} 
                WHERE ${idColumn} = @email AND Contraseña = @password
            `;
            const result = await pool.request()
                .input('email', mssql.VarChar, email)
                .input('password', mssql.VarChar, password)
                .query(query);

            if (result.recordset.length > 0) {
                res.status(200).send({ success: true, user: result.recordset[0], userType });
            } else {
                res.status(401).send({ success: false, message: 'Credenciales incorrectas' });
            }
        } catch (err) {
            res.status(500).send({ error: 'Error del servidor', details: err });
        }
    });

    // Ruta para obtener pagos según el usuario
    app.get('/api/pagos/:userId', async (req, res) => {
        const { userId } = req.params;

        try {
            const pool = await mssql.connect(config);
            const query = `
                SELECT Id_Pago, Fecha, Monto, Descripción 
                FROM Pago 
                WHERE Id_Colono = @userId
            `;
            const result = await pool.request()
                .input('userId', mssql.VarChar, userId)
                .query(query);

            res.status(200).send(result.recordset);
        } catch (err) {
            res.status(500).send({ error: 'Error al obtener los pagos', details: err });
        }
    });

    // Ruta para obtener información del usuario (Colono o Administrador)
    app.get('/api/usuario/:userId', async (req, res) => {
        const { userId } = req.params;
        console.log('Solicitando información para el usuario con ID:', userId);
    
        try {
            const pool = await mssql.connect(config);
    
            // Busca al usuario en la tabla Colono
            let query = `
                SELECT Id_Colono AS correo, Nombre AS nombre, Contraseña AS contraseña, Direccion AS direccion, Telefono AS telefono
                FROM Colono
                WHERE Id_Colono = @userId
            `;
            let result = await pool.request().input('userId', mssql.VarChar, userId).query(query);
    
            console.log('Resultado en tabla Colono:', result.recordset);
    
            // Si no es Colono, busca en la tabla Administrador
            if (result.recordset.length === 0) {
                query = `
                    SELECT Id_Admin AS correo, Nombre AS nombre, Contraseña AS contraseña, '' AS direccion, Telefono AS telefono
                    FROM Administrador
                    WHERE Id_Admin = @userId
                `;
                result = await pool.request().input('userId', mssql.VarChar, userId).query(query);
    
                console.log('Resultado en tabla Administrador:', result.recordset);
            }
    
            if (result.recordset.length > 0) {
                res.status(200).send(result.recordset[0]);
            } else {
                console.error('Usuario no encontrado para ID:', userId);
                res.status(404).send({ error: 'Usuario no encontrado' });
            }
        } catch (err) {
            console.error('Error al obtener el usuario:', err);
            res.status(500).send({ error: 'Error al obtener el usuario', details: err });
        }
    });
    



    app.post('/api/pago', async (req, res) => {
        const { userId, date, amount, details } = req.body;
    
        // Verificar si los datos están completos
        if (!userId || !date || !amount || !details) {
            console.error('Datos faltantes:', { userId, date, amount, details });
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
            const pool = await mssql.connect(config);
            const query = `
                INSERT INTO Pago (Id_Colono, Fecha, Monto, Descripción) 
                VALUES (@userId, @date, @amount, @details)
            `;
            console.log('Intentando registrar pago con:', { userId, date, amount, details });
            await pool.request()
                .input('userId', mssql.VarChar, userId)
                .input('date', mssql.Date, date)
                .input('amount', mssql.Int, amount)
                .input('details', mssql.VarChar, details)
                .query(query);
    
            console.log('Pago registrado exitosamente');
            res.status(201).send({ success: true, message: 'Pago registrado con éxito' });
        } catch (err) {
            console.error('Error al registrar el pago:', err);
            res.status(500).send({ error: 'Error al registrar el pago', details: err });
        }
    });    
    

    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error de conexión:', err);
});
