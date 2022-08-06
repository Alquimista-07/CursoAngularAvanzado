const { response } = require("express");

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

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

        res.json({
            ok: true,
            msg: 'Todo bien',
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

// Exportamos
module.exports = {
    login
}