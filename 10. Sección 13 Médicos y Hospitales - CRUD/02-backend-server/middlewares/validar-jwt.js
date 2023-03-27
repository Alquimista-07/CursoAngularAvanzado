// Middleware para validar JWT

const jwt = require('jsonwebtoken');

const { response } = require("express");

const validarJWT = ( req, res = response, next ) => {

    // Leer el token de los headers
    const token = req.header( 'x-token' );
    
    
    // Validamos el token
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;

        // Tenemos que llamar el next para que se complete y responda
        next();

    }
    catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

// Exportamos
module.exports = {
    validarJWT
}