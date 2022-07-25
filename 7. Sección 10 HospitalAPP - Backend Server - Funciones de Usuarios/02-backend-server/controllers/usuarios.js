// Controladores de usuarios

// Importamos para definir el tipo de la response
const { response } = require('express');

// Importamos el bcrypt para el tema de la encripción en una sola vía de la contraseña
const bcrypt = require('bcryptjs');

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

        // Encriptar contraseña usando el bcryptjs
        // Creamos algo que se conoce como un salt que es una forma aleatoria para crear unos números que van a hacer parte
        // de la validación de la contraseña.
        const salt = bcrypt.genSaltSync();
        // NOTA: Ahora procedemos a encriptar la contraseña con nuestro salt cuyo valor por defecto es de 10 vueltas, pero si ocuparamos hacerlo de más vueltas podríamos mandar
        //       el valor como parámetro (por ejemplo genSaltSync(100)) y de esta forma la contraseña sería aún más segura, pero esto va a incrementar considerablemente el tiempo
        //       de respuesta del servicio (en este caso crearUsuario) porque va a consumir más memoria a la hora de crear la contraseña. Adicionalmente podemos ver más información
        //       en la documentación de bcrypt sobre los métodos y funciones que tiene.
        usuario.password = bcrypt.hashSync( password, salt );
        
        // Guardar usuario
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