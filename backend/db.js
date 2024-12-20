// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'db-mono', // Cambia esto según tu configuración
    user: 'root',      // Cambia esto según tu configuración
    password: 'root', // Cambia esto según tu configuración
    database: 'lavadero' // Cambia esto según tu configuración
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;
