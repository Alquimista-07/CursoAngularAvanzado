// Controladores de hospitales

const { response } = require('express');

// Importamos el modelo
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    // Obtenemos los hospitales, adicionalmente también obtenemos el nombre no solo el id de
    // quién lo creo usando el método populate indicando que vamos a llamar y como segundo
    // parámetro indicamos los campos que necesitemos como por ejemplo el nombre, el email, etc
    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        msg: hospitales
    })

}

const crearHospital = async(req, res = response) => {

    // Extraemos el id del usuario que lo esta grabando
    const uid = req.uid;

    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    } );

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })

}

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    })

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}