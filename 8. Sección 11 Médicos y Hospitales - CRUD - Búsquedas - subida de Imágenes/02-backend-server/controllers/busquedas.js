// Controladores de busqueda

const { response } = require('express');

// Importamos el modelo de usuarios
const Usuario = require('../models/usuario');
// Importamos el modelo de medicos
const Medico = require('../models/medico');
// Importamos el modelo de hospitales
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        busqueda,
        usuarios,
        medicos,
        hospitales,
        msg: 'Ok busqueda'
    })

}

// Exportamos la funcionalidades
module.exports = {
    getTodo
}