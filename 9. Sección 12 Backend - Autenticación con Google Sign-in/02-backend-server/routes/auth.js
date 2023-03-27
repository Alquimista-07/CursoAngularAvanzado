// Rutas login
/*
    Ruta: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
],
login );

router.post('/google', 
[
    check('token', 'El token de Google es obligatoria').not().isEmpty(),
    validarCampos
],
googleSignIn );

// Exportamos
module.exports = router;