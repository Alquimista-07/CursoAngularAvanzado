// Rutas de los usuarios
/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
// Importamos controladores de usuarios
const { getUsuarios } = require('../controllers/usuarios');

const router = Router();

// Definimos las rutas pasando como segundo argumento el controlador

router.get( '/', getUsuarios );

// Exortamos el router
module.exports = router;