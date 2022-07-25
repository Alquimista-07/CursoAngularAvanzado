// Controladores de usuarios

// Importamos para definir el tipo de la response
const { response } = require('express');

const Usuario = require('../models/usuario');

// NOTA: Basicamente dentro de este archivo tenemos funciones que vamos a exportar
//       y que continen la logica que vamos a necesitar para gestionar los usuarios

// Obtener usuarios
const getUsuarios = async(req, res) => {

    // Como parametro del find podemos mandar {} para especificar un filtro y solo mostrar lo que quiero
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });

}

// Crear usuario
const crearUsuario = async(req, res = response) => {

    // Leemos el body para recibir información a través del body
    const { nombre, password, email } = req.body;

    // Validamos si el usuario existe
    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            })
        }

        // Creamos una instancia del modelo con las propiedades
        const usuario = new Usuario( req.body );
    
        await usuario.save();
    
        res.json({
            ok: true,
            usuario
        });

    }
    catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

// Exportamos
module.exports = {
    getUsuarios,
    crearUsuario
}