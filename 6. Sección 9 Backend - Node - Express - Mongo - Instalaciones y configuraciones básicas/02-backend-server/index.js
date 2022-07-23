// Importamos express
const express = require('express');
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
app.listen( 3000, () =>{
    console.log( 'Servidor corriendo en puerto ' + 3000 );
});