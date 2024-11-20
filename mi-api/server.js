const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const app = express();
const port = 5000;

// Configuración de la base de datos
const config = {
    user: 'nuevo_usuario',
    password: '123456789',
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
    const nodemailer = require('nodemailer');
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
    

    // Ruta para obtener todos los avisos
    app.get('/api/avisos', async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const query = `
                SELECT Id_Aviso, Id_Admin, Mensaje, Fecha
                FROM Aviso
                ORDER BY Fecha DESC
            `;
            const result = await pool.request().query(query);

            res.status(200).send(result.recordset);
        } catch (err) {
            console.error('Error al obtener los avisos:', err);
            res.status(500).send({ error: 'Error al obtener los avisos', details: err });
        }
    });

    // Ruta para insertar un nuevo aviso
    app.post('/api/aviso', async (req, res) => {
        const { Id_Admin, Mensaje, Fecha } = req.body;
    
        if (!Id_Admin || !Mensaje || !Fecha) {
            console.error('Datos faltantes:', { Id_Admin, Mensaje, Fecha });
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
            const pool = await mssql.connect(config);
            const query = `
                INSERT INTO Aviso (Id_Admin, Mensaje, Fecha)
                VALUES (@Id_Admin, @Mensaje, @Fecha)
            `;
            console.log('Intentando insertar aviso con:', { Id_Admin, Mensaje, Fecha });
            await pool.request()
                .input('Id_Admin', mssql.VarChar, Id_Admin)
                .input('Mensaje', mssql.VarChar, Mensaje)
                .input('Fecha', mssql.Date, Fecha)
                .query(query);
    
            console.log('Aviso registrado exitosamente');
            res.status(201).send({ success: true, message: 'Aviso registrado con éxito' });
        } catch (err) {
            console.error('Error al registrar el aviso:', err);
            res.status(500).send({ error: 'Error al registrar el aviso', details: err });
        }
    });
    
    app.get('/api/pagos', async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const query = `
                SELECT Id_Pago, Id_Colono, Monto, Fecha, Descripción
                FROM Pago
                ORDER BY Fecha DESC
            `;
            const result = await pool.request().query(query);
    
            res.status(200).send(result.recordset);
        } catch (err) {
            console.error('Error al obtener los pagos:', err);
            res.status(500).send({ error: 'Error al obtener los pagos', details: err });
        }
    });
    
    app.post('/api/send-email', async (req, res) => {
        const { email, subject, content } = req.body;
    
        if (!email || !subject || !content) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // Cambia si usas otro proveedor
                auth: {
                    user: '21240207@leon.tecnm.mx',
                    pass: 'Gemelafor4',
                },
            });
    
            const mailOptions = {
                from: '21240207@leon.tecnm.mx',
                to: email,
                subject: subject,
                text: content,
            };
    
            await transporter.sendMail(mailOptions);
            res.status(200).send({ success: true, message: 'Correo enviado con éxito' });
        } catch (err) {
            console.error('Error al enviar el correo:', err);
            res.status(500).send({ error: 'Error al enviar el correo', details: err });
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
    
    app.get('/api/colonos', async (req, res) => {
        try {
            const pool = await mssql.connect(config);
            const query = `
                SELECT Id_Colono, Nombre, Apellido, Direccion, Telefono
                FROM Colono
                ORDER BY Nombre
            `;
            const result = await pool.request().query(query);
            res.status(200).send(result.recordset);
        } catch (err) {
            console.error('Error al obtener los colonos:', err);
            res.status(500).send({ error: 'Error al obtener los colonos', details: err });
        }
    });

    app.post('/api/colonos', async (req, res) => {
        const { Id_Colono, Contraseña, Nombre, Apellido, Direccion, Telefono } = req.body;
    
        if (!Id_Colono || !Contraseña || !Nombre || !Apellido || !Direccion || !Telefono) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }
    
        try {
            const pool = await mssql.connect(config);
            const query = `
                INSERT INTO Colono (Id_Colono, Contraseña, Nombre, Apellido, Direccion, Telefono)
                VALUES (@Id_Colono, @Contraseña, @Nombre, @Apellido, @Direccion, @Telefono)
            `;
            await pool.request()
                .input('Id_Colono', mssql.VarChar, Id_Colono)
                .input('Contraseña', mssql.VarChar, Contraseña)
                .input('Nombre', mssql.VarChar, Nombre)
                .input('Apellido', mssql.VarChar, Apellido)
                .input('Direccion', mssql.VarChar, Direccion)
                .input('Telefono', mssql.VarChar, Telefono)
                .query(query);
    
            res.status(201).send({ success: true, message: 'Colono creado correctamente' });
        } catch (err) {
            console.error('Error al crear el colono:', err);
            res.status(500).send({ error: 'Error al crear el colono', details: err });
        }
    });

    app.put('/api/colonos/:id', async (req, res) => {
        const { id } = req.params;
        const { Nombre, Apellido, Direccion, Telefono } = req.body;
    
        if (!Nombre || !Apellido || !Direccion || !Telefono) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios para actualizar' });
        }
    
        try {
            const pool = await mssql.connect(config);
            const query = `
                UPDATE Colono
                SET Nombre = @Nombre, Apellido = @Apellido, Direccion = @Direccion, Telefono = @Telefono
                WHERE Id_Colono = @Id
            `;
            await pool.request()
                .input('Id', mssql.VarChar, id)
                .input('Nombre', mssql.VarChar, Nombre)
                .input('Apellido', mssql.VarChar, Apellido)
                .input('Direccion', mssql.VarChar, Direccion)
                .input('Telefono', mssql.VarChar, Telefono)
                .query(query);
    
            res.status(200).send({ success: true, message: 'Colono actualizado correctamente' });
        } catch (err) {
            console.error('Error al actualizar el colono:', err);
            res.status(500).send({ error: 'Error al actualizar el colono', details: err });
        }
    });
    
    app.delete('/api/colonos/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const pool = await mssql.connect(config);
            const query = `
                DELETE FROM Colono
                WHERE Id_Colono = @Id
            `;
            await pool.request()
                .input('Id', mssql.VarChar, id)
                .query(query);
    
            res.status(200).send({ success: true, message: 'Colono eliminado correctamente' });
        } catch (err) {
            console.error('Error al eliminar el colono:', err);
            res.status(500).send({ error: 'Error al eliminar el colono', details: err });
        }
    });
    

    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error de conexión:', err);
});
