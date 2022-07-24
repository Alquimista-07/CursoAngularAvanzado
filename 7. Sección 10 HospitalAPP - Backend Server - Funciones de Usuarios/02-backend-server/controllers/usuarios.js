// Controladores de usuarios

// NOTA: Basicamente dentro de este archivo tenemos funciones que vamos a exportar
//       y que continen la logica que vamos a necesitar para gestionar los usuarios

const getUsuarios = (req, res) => {

    res.json({
        ok: true,
       usuarios: []
    });

}

// Exportamos
module.exports = {
    getUsuarios
}