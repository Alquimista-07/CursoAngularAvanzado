// Modelo de mongoose encargado del modelo de base de datos y agregar ciertas
// restricciones para que cada registro de usuarios se vea de la forma que
// queremos

const { Schema, model } = require('mongoose');

// Creamos el schema que es la definición de cada uno de los registros que van a estar
// dentro de una colección ("tabla usuarios" por así decirlo que del todo no es cierto ya que mongo es una
// DB noSQL)
const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }

});

// Implementamos el modelo
module.exports = model( 'Usuario', UsuarioSchema );