const { response } = require("express");

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificamos que sea un email correcto
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email o password incorrectos'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrectos'
            });
        }

        // Generar el token - JWT
        const token =  await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Algo salió mal contacte al administrador'
        });
    }

}

// Controlador login con Google Sign-in
const googleSignIn = async (req, res = response) => {

    // Para hacer la validación requermimso de un paquete de node que se instala usando
    // el comando: npm install google-auth-library --save
    try {
        const { email, name, picture } = await googleVerify( req.body.token );
        res.json({
            ok: true,
            email,
            name,
            picture
        });
    }
    catch (err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });

    }

}

// Exportamos
module.exports = {
    login,
    googleSignIn
}