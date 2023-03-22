// Controladores de hospitales

const { response } = require('express');

// Importamos el modelo
const Hospital = require('../models/hospital');

const getHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getHospitales'
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