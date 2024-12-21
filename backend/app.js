// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const moment = require('moment-timezone');
const multer = require('./multerConfig');

app.use('/uploads', express.static('uploads'));


//necesito probar el multer para subir una foto y guardarla en la carpeta uploads
app.post('/upload', multer.single('foto'), (req, res) => {
    if (req.file) {
        res.status(200).send('Archivo subido correctamente');
    } else {
        res.status(400).send('No se subió ningún archivo');
    }
});

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
};

app.use(express.json());

app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

let verificationCodes = {}; // Almacenar los códigos de verificación temporalmente

// Ruta para enviar el código de verificación
app.post('/send_code', (req, res) => {
    console.log("entro"); // Para depuración
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'El correo electrónico es requerido' });
    }

    const code = crypto.randomBytes(3).toString('hex'); // Generar un código aleatorio
    verificationCodes[email] = code;

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebitapruebacorreo@gmail.com',
            pass: 'twbulmuiakgemaut'
        }
    });

    const mailOptions = {
        from: 'pruebitapruebacorreo@gmail.com',
        to: email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Código enviado' });
    });
});

// Ruta para verificar el código y actualizar la contraseña
app.post('/verify-code', (req, res) => {

    console.log("entro"); // Para depuración
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    if (verificationCodes[email] === code) {
        // Aquí deberías actualizar la contraseña en tu base de datos
        const query = 'UPDATE Usuarios SET password = ? WHERE email = ?';
        db.query(query, [newPassword, email], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // Eliminar el código de verificación después de usarlo
            delete verificationCodes[email];
            res.status(200).json({ message: 'Contraseña actualizada' });
        });
    } else {
        res.status(400).json({ error: 'Código de verificación incorrecto' });
    }
});

// Ruta para crear un nuevo usuario
app.post('/register', (req, res) => {
    console.log(req.body); // Para depuración

    const { id_usuario, nombre, email, password, telefono, tipo_usuario } = req.body;

    if (!id_usuario || !nombre || !email || !password || !telefono || !tipo_usuario) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'INSERT INTO Usuarios (id_usuario, nombre, email, password, telefono, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [id_usuario, nombre, email, password, telefono, tipo_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
    });
});

// Ruta para iniciar sesión con usuario y contraseña
app.post('/login', (req, res) => {
    console.log(req.body); // Para depuración
    const { id_usuario, password } = req.body;

    if (!id_usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM Usuarios WHERE id_usuario = ? AND password = ?';
    db.query(query, [id_usuario, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
        }
    });
});

// Ruta para iniciar sesión de administradores
app.post('/admin-login', (req, res) => {
    console.log(req.body); // Para depuración
    const { id_admin, password } = req.body;

    if (!id_admin || !password) {
        return res.status(400).json({ error: 'ID de administrador y contraseña son requeridos' });
    }

    const query = 'SELECT * FROM admins WHERE id_admin = ? AND password = ?';
    db.query(query, [id_admin, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Inicio de sesión exitoso', tipo_usuario: 'admin' });
        } else {
            res.status(400).json({ error: 'ID de administrador o contraseña incorrectos' });
        }
    });
});

//dame un servicio para editar la informacion de un usuario sin tipo de usuario
app.put('/update-user', (req, res) => {
    console.log(req.body); // Para depuración
    console.log("entro"); // Para depuración
    const { id_usuario, nombre, email, password, telefono } = req.body;

    // Validación de campos obligatorios
    if (!id_usuario || !nombre || !email || !password || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'UPDATE Usuarios SET nombre = ?, email = ?, password = ?, telefono = ? WHERE id_usuario = ?';
    db.query(query, [nombre, email, password, telefono, id_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    });
});

//ruta para cargar informacion de un usuario
app.get('/usuarios/:id_usuario', async (req, res) => {
    const id_usuario = req.params.id_usuario;
    console.log(id_usuario); // Para depuración

    const query = 'SELECT * FROM Usuarios WHERE id_usuario = ?';

    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            res.status(200).json(results[0]); // Devuelve solo el primer resultado
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }

  });
});


// Ruta para agregar un vehículo a un usuario
app.post('/add-vehicle', multer.single('foto'), (req, res) => {
    const { id_usuario, marca, modelo, color, placa } = req.body; // Obtener id_usuario y demás datos del cuerpo de la solicitud
    // Validar datos requeridos
    if (!id_usuario || !marca || !modelo || !color || !placa || !req.file) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios, incluida la foto.' });
    }
    // Ruta del archivo subido
    const foto = `/uploads/${req.file.filename}`;
    // Mostrar lo que se enviará a la consulta (para depuración)
    console.log('Datos recibidos:', { id_usuario, marca, modelo, color, placa, foto });

    // Insertar datos en la base de datos
    const query = `
        INSERT INTO vehiculos (id_usuario, marca, modelo, color, placa, foto)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [id_usuario, marca, modelo, color, placa, foto], (err, results) => {
        if (err) {
            console.error('Error al guardar el vehículo en la base de datos:', err.message);
            return res.status(500).json({ error: 'Error al guardar el vehículo en la base de datos', details: err.message });
        }
        res.status(201).json({ 
            message: 'Vehículo agregado exitosamente', 
            data: { id_usuario, marca, modelo, color, placa, foto } 
        });
    });
});


app.put('/update-vehicle', (req, res) => {
    console.log(req.body); // Para depuración
    
    const { marca, modelo, color, placa } = req.body;

    // Validación de campos obligatorios
    if (!marca || !modelo || !color || !placa) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = 'UPDATE vehiculos SET marca = ?, modelo = ?, color = ? WHERE placa = ?';
    db.query(query, [marca, modelo, color, placa], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.status(200).json({ message: 'Vehículo actualizado exitosamente' });
    });
});

app.delete('/delete-vehicle', (req, res) => {
    console.log(req.body); // Para depuración
    console.log("entro"); // Para depuración
    const { placa } = req.body;

    // Validación de campo obligatorio
    if (!placa) {
        return res.status(400).json({ error: 'La placa del vehículo es requerida.' });
    }

    const query = 'DELETE FROM vehiculos WHERE placa = ?';
    db.query(query, [placa], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor al eliminar el vehículo.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado.' });
        }

        res.status(200).json({ message: 'Vehículo eliminado exitosamente' });
    });
});


app.get('/vehicles/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;
    console.log(id_usuario); // Para depuración

    // Verificar que el id_usuario esté presente
    if (!id_usuario) {
        return res.status(400).json({ error: 'ID de usuario es requerido' });
    }

    const query = 'SELECT * FROM vehiculos WHERE id_usuario = ?';
    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ vehicles: results });
    });
});

// Ruta para obtener todos los vehículos y sus usuarios
app.get('/userVehicles', (req, res) => {
    const query = 'SELECT * FROM vehiculos';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los vehículos y usuarios:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        res.status(200).json({ vehicles: results });
    });
});

app.post('/add-agendamiento', (req, res) => {
    console.log(req.body); // Para depuración
    const { id_usuario, placa, fecha_agendada, hora_agendada, servicios_ids } = req.body;

    // Validación de campos obligatorios
    if (!id_usuario || !placa || !fecha_agendada || !hora_agendada || !servicios_ids) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Convertir el array de servicios en una cadena JSON
    const serviciosJSON = JSON.stringify(servicios_ids);

    // Calcular la hora de fin (agregar 1 hora a la hora_agendada)
    const [hora, minutos] = hora_agendada.split(':');
    const horaFin = new Date(fecha_agendada);
    horaFin.setHours(parseInt(hora) + 1, parseInt(minutos));  // Añadir una hora a la hora de agendamiento


    const fechahoy = new Date();
    const fechaColombia = moment(fechahoy).tz('America/Bogota').format('YYYY-MM-DD');
    console.log(fechaColombia);
    const horaColombia = moment(fechahoy).tz('America/Bogota').format('HH:mm:ss');
    console.log(horaColombia);

   //comparador de fechas
    if (fecha_agendada < fechaColombia) {
        return res.status(200).json({ error: 'La fecha de agendamiento no puede ser anterior a la fecha actual' });
    }
    //comparador de horas
    if (hora_agendada < horaColombia) {
        return res.status(200).json({ error: 'La hora de agendamiento no puede ser anterior a la hora actual' });
    }

    const queryVerificar = 'SELECT * FROM agendamientos WHERE placa = ? AND fecha_agendada = ? AND hora_agendada BETWEEN ? AND ?';
    
    // Consulta para verificar si ya hay un agendamiento en el rango de tiempo
    db.query(queryVerificar, [placa, fecha_agendada, hora_agendada, horaFin.toTimeString().substring(0, 5)], (err, results) => {
        if (err) {
            console.error('Error en la consulta de verificación:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        // Si ya existe un agendamiento en ese horario, no permitir la inserción
        if (results.length > 0) {
            return res.status(400).json({ error: 'Ya existe un agendamiento para este vehículo en ese horario' });
        }

        // Si no hay conflicto, se inserta el nuevo agendamiento
        const queryInsertar = 'INSERT INTO agendamientos (id_usuario, placa, fecha_agendada, hora_agendada, servicios_ids) VALUES (?, ?, ?, ?, ?)';
        db.query(queryInsertar, [id_usuario, placa, fecha_agendada, hora_agendada, serviciosJSON], (err, results) => {
            if (err) {
                console.error('Error en la inserción:', err);
                return res.status(500).json({ error: 'Error en la base de datos' });
            }
            res.status(201).json({ message: 'Agendamiento creado exitosamente', agendamientoId: results.insertId });
        });
    });
});

app.get('/agendamientos/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;
    console.log(id_usuario); // Para depuración

    // Verificar que el id_usuario esté presente
    if (!id_usuario) {
        return res.status(400).json({ error: 'ID de usuario es requerido' });
    }

    const query = 'SELECT * FROM agendamientos WHERE id_usuario = ?';
    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ agendamientos: results });
    });
});

// Ruta para obtener todos los agendamientos y sus usuarios
app.get('/userAgenda', (req, res) => {
    const query = 'SELECT * FROM agendamientos';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los agendamientos y usuarios:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        res.status(200).json({ agendamientos: results });
    });
});


app.get('/get-servicios', (req, res) => {
    const query = 'SELECT * FROM servicios';  // Consulta para obtener todos los servicios de la tabla

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los servicios:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron servicios' });
        }

        // Devuelve los servicios como una respuesta JSON
        res.status(200).json(results);
    });
});

app.get('/placas/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;
    console.log(id_usuario); // Para depuración

    // Verificar que el id_usuario esté presente
    if (!id_usuario) {
        return res.status(400).json({ error: 'ID de usuario no se encontro' });
    }

    const query = 'SELECT placa FROM vehiculos WHERE id_usuario = ?';
    db.query(query, [id_usuario], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ placas: results });
    });
});

// Ruta para obtener todos los usuarios y la cantidad de vehículos que tienen
app.get('/usuariosTotales', (req, res) => {
    const query = `
        SELECT u.id_usuario, u.nombre, u.email, COUNT(v.placa) AS cantidad_vehiculos
        FROM usuarios u
        LEFT JOIN vehiculos v ON u.id_usuario = v.id_usuario
        GROUP BY u.id_usuario, u.nombre, u.email
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los usuarios y vehículos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        res.status(200).json({ usuarios: results });
    });
});
