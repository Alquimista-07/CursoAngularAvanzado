// Rutas de los usuarios
/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
// Importamos controladores de usuarios
const { getUsuarios, crearUsuario } = require('../controllers/usuarios');

const router = Router();

// Definimos las rutas pasando como segundo argumento el controlador

// Obtener usuarios
router.get( '/', getUsuarios );

// Crear usuario
router.post( '/', crearUsuario );

// Exortamos el router
module.exports = router;