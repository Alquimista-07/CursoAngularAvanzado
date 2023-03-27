// Controladores de medicos

const { response } = require('express');

// Importamos el modelo
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    })

}

const crearMedico = async(req, res = response) => {

    // Extraemos el id del usuario ya que como pase por la verificación del token ya la debería tener acá
    const uid = req.uid;

    // Extraemos el ide del hospital desde el body
    const idHospital = req.body.idHospital;

    const medico = new Medico({
        usuario: uid,
        hospital: idHospital,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    } catch (err){
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administraador'
        })
    }

}

const actualizarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })

}

const borrarMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarMedico'
    })

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}