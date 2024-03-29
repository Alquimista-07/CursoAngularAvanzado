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

const actualizarMedico = async (req, res = response) => {

    const medicoId = req.params.id;
    const uid        = req.uid;

    try {

        // Obtenemos la referencia para ver si existe el medico con ese id
        const medicoDB = await Medico.findById( medicoId );

        // Si no existe mandamos un error
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }

        // Si existe actualizamos los campos del medico
        // por lo tanto establecemos los valores a actualizar
        const cambiosMedico = {
            ...req.body,
            usuario: uid // Obtenemos el id de la ultima persona que realizo la modificación
        }
        // Ya esta establecidos entonces lo actualizamos
        const medicoActualizado = await Medico.findByIdAndUpdate( medicoId, cambiosMedico, { new: true } ) // La instrucción  new: true devuelve el ultimo documento actualizado

        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const borrarMedico = async (req, res = response) => {

    const medicoId = req.params.id;

    try {

        // Obtenemos la referencia para ver si existe el medico con ese id
        const medicoDB = await Medico.findById( medicoId );

        // Si no existe mandamos un error
        if ( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado por id'
            });
        }

        // Borramos el medico
        await Medico.findByIdAndDelete( medicoId );

        res.json({
            ok: true,
            msg: 'Medico Eliminado Correctamente'
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}