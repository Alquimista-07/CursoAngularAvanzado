// Importamos express
const express = require('express');

// Crear el servidor express
const app = express();

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