// Controladores de usuarios

const Usuario = require('../models/usuario');

// NOTA: Basicamente dentro de este archivo tenemos funciones que vamos a exportar
//       y que continen la logica que vamos a necesitar para gestionar los usuarios

// Obtener usuarios
const getUsuarios = (req, res) => {

    res.json({
        ok: true,
        msg: 'get Usuarios'
    });

}

// Crear usuario
const crearUsuario = async(req, res) => {

    // Leemos el body para recibir información a través del body
    const { nombre, password, email } = req.body;

    // Creamos una instancia del modelo con las propiedades
    const usuario = new Usuario( req.body );

    await usuario.save();

    res.json({
        ok: true,
        usuario
    });

}

// Exportamos
module.exports = {
    getUsuarios,
    crearUsuario
}