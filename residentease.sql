-- Crear la base de datos
DROP DATABASE IF EXISTS residentease;
CREATE DATABASE residentease;
GO

USE residentease;
GO

-- Crear la tabla Colono
CREATE TABLE Colono (
    Id_Colono VARCHAR(50) PRIMARY KEY,
    Contraseña VARCHAR(25) NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Direccion VARCHAR(50),
    Telefono VARCHAR(10)
);

-- Crear la tabla Administrador
CREATE TABLE Administrador (
    Id_Admin VARCHAR(50) PRIMARY KEY,
    Contraseña VARCHAR(25) NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Telefono VARCHAR(10)
);

-- Crear la tabla Pago
CREATE TABLE Pago (
    Id_Pago INT IDENTITY(1,1) PRIMARY KEY,
    Id_Colono VARCHAR(50) NOT NULL,
    Fecha DATE NOT NULL,
    Monto INT NOT NULL,
    Descripción VARCHAR(50),
    CONSTRAINT FK_Pago_Colono FOREIGN KEY (Id_Colono) REFERENCES Colono(Id_Colono) ON DELETE CASCADE
);

-- Crear la tabla Acceso
CREATE TABLE Acceso (
    Id_Acceso INT IDENTITY(1,1) PRIMARY KEY,
    Id_Colono VARCHAR(50) NOT NULL,
    Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(30) NOT NULL,
    Motivo VARCHAR(100),
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    CONSTRAINT FK_Acceso_Colono FOREIGN KEY (Id_Colono) REFERENCES Colono(Id_Colono) ON DELETE CASCADE
);

-- Crear la tabla Aviso
CREATE TABLE Aviso (
    Id_Aviso INT IDENTITY(1,1) PRIMARY KEY,
    Id_Admin VARCHAR(50) NOT NULL,
    Mensaje VARCHAR(500),
    Fecha DATE NOT NULL,
    CONSTRAINT FK_Aviso_Administrador FOREIGN KEY (Id_Admin) REFERENCES Administrador(Id_Admin) ON DELETE CASCADE
);

-- Crear la tabla VeColono
CREATE TABLE VeColono (
    Id_Colono VARCHAR(50) NOT NULL,
    Id_Aviso INT NOT NULL,
    CONSTRAINT FK_VeColono_Colono FOREIGN KEY (Id_Colono) REFERENCES Colono(Id_Colono) ON DELETE CASCADE,
    CONSTRAINT FK_VeColono_Aviso FOREIGN KEY (Id_Aviso) REFERENCES Aviso(Id_Aviso) ON DELETE CASCADE
);

-- Insertar datos de prueba en la tabla Colono
INSERT INTO Colono (Id_Colono, Contraseña, Nombre, Apellido, Direccion, Telefono) VALUES
('colono1@hotmail.com', 'pass123', 'Juan', 'Pérez', 'Calle Falsa 123', '1234567890'),
('colono2@hotmail.com', 'pass456', 'Ana', 'Gómez', 'Avenida Siempre Viva 742', '0987654321'),
('colono3@hotmail.com', 'pass789', 'Luis', 'Martínez', 'Boulevard de los Sueños 456', '1122334455'),
('colono4@hotmail.com', 'pass012', 'María', 'López', 'Calle de la Amargura 789', '2233445566'),
('colono5@hotmail.com', 'pass345', 'Carlos', 'Hernández', 'Avenida de la Paz 101', '3344556677');

-- Insertar datos de prueba en la tabla Administrador
INSERT INTO Administrador (Id_Admin, Contraseña, Nombre, Apellido, Telefono) VALUES
('21240669@leon.tecnm.mx', '1234567', 'Paulo', 'Valenzuela', '4455667348'),
('admin1@hotmail.com', 'admin123', 'Alonzo', 'Garpacho', '4455667348');

-- Insertar datos de prueba en la tabla Pago
INSERT INTO Pago (Id_Colono, Fecha, Monto, Descripción) VALUES
('colono5@hotmail.com', '2024-05-01', 900, 'Pago de mantenimiento'),
('colono2@hotmail.com', '2024-02-01', 600, 'Pago de mantenimiento'),
('colono3@hotmail.com', '2024-03-01', 700, 'Pago de mantenimiento'),
('colono4@hotmail.com', '2024-04-01', 800, 'Pago de mantenimiento'),
('colono1@hotmail.com', '2024-01-01', 500, 'Pago de mantenimiento');

-- Insertar datos de prueba en la tabla Acceso
INSERT INTO Acceso (Id_Colono, Nombre, Apellido, Motivo, Fecha, Hora) VALUES
('colono1@hotmail.com', 'Juan', 'Pérez', 'Visita de mantenimiento', '2024-01-01', '08:00:00'),
('colono2@hotmail.com', 'Ana', 'Gómez', 'Entrega de paquete', '2024-01-02', '09:00:00'),
('colono3@hotmail.com', 'Luis', 'Martínez', 'Reunión con administrador', '2024-01-03', '10:00:00'),
('colono4@hotmail.com', 'María', 'López', 'Reparación de servicios', '2024-01-04', '11:00:00'),
('colono5@hotmail.com', 'Carlos', 'Hernández', 'Visita de familiares', '2024-01-05', '12:00:00');

-- Insertar datos de prueba en la tabla Aviso
INSERT INTO Aviso (Id_Admin, Mensaje, Fecha) VALUES
('admin1@hotmail.com', 'Reunión de vecinos el próximo Martes para la posada.', '2024-11-10'),
('admin1@hotmail.com', 'Mantenimiento de áreas comunes.', '2024-02-01'),
('admin1@hotmail.com', 'Actualización de datos personales.', '2024-03-01'),
('admin1@hotmail.com', 'Pago de cuotas atrasadas.', '2024-04-01'),
('admin1@hotmail.com', 'Evento comunitario el fin de semana.', '2024-05-01');

-- Insertar datos de prueba en la tabla VeColono
INSERT INTO VeColono (Id_Colono, Id_Aviso) VALUES
('colono1@hotmail.com', 1),
('colono2@hotmail.com', 2),
('colono3@hotmail.com', 3),
('colono4@hotmail.com', 4),
('colono5@hotmail.com', 5);