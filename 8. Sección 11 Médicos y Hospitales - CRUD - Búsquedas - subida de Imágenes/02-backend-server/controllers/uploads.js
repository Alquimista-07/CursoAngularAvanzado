// Controlador uploads

const { response } = require("express");

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // Validar tipo
    // Creamos una constante que nos va a servir para validar los tipos ya que vamos a mover
    // el archivo a una carpeta para la cual la ruta debe ser valida
    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];

    if( !tiposValidos.includes( tipo ) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }

    // Validar que exista un archivo
    if( !req.files || Object.keys(req.files).length === 0 ){
        return res.status(400).json({
            ok: false,
            msg: 'No se cargo ningún archivo'
        });
    }

    // Procesar la imágen...

    res.json({
        ok: true,
        msg: 'fileUploaded'
    });

}

module.exports = {
    fileUpload
}