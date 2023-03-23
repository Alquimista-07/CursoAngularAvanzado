/*
    ruta: api/todo:busqueda
*/

const { Router } = require('express');
const router = Router();

// Importamos las funcionalidades del controlador
const { getTodo } = require('../controllers/busquedas');

// Validador JWT
const { validarJWT } = require('../middlewares/validar-jwt');

// Busqueda
router.get( '/:busqueda', [
    validarJWT
], 
getTodo );

// Exportamos el router
module.exports = router;