// Importamos express
const express = require('express');

// Crear el servidor express
const app = express();


// Para levantar el servidor
app.listen( 3000, () =>{
    console.log( 'Servidor corriendo en puerto ' + 3000 );
});