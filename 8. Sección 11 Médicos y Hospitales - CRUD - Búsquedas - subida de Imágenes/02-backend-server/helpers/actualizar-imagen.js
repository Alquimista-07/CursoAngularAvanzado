// Helper para actualizar imágenes

// Con esto puedo leer el filesystem, es decir los directorios y archivos para trabajar con ellos
const fs = require('fs');

// Importamos los modelos
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    
    switch ( tipo ) {
        case 'medicos':
            // Verificar que exista el medico por id
            const medico = await Medico.findById( id );
            if( !medico ) {
                console.log('No se encontro medico por id');
                return false;
            }

            // Evaluamos si el medico ya tiene una imágen la cual si ya existe la tenemos que borrar
            const pathViejo = `./uploads/medicos/${ medico.img }`;

            if( fs.existsSync( pathViejo ) ){
                // Si existe borramos la imágen anterior
                fs.unlinkSync( pathViejo );
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            break;

        case 'usuarios':
            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}