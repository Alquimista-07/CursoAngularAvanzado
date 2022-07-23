// Importamos express
const express = require('express');

// Para congigurar las variables de entorno configuramos usando el paquete dotenv que
// habíamos instalado el cual toma el archivo .env por defecto y nos permite usar las 
// variables de entorno definidas allí.
require('dotenv').config();

// Importamos el archivo de configuración de la base de datos
const { dbConnection } = require('./database/config');

// Crear el servidor express
const app = express();

// Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo!!!...'
    })

});


// Para levantar el servidor
app.listen( process.env.PORT, () =>{
    console.log( 'Servidor corriendo en puerto ' + process.env.PORT );
});