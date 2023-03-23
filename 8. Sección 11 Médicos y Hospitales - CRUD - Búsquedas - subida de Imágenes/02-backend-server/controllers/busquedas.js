// Controladores de busqueda

const { response } = require('express');

const getTodo = (req, res = response) => {

    const busqueda = req.params.busqueda;

    res.json({
        ok: true,
        busqueda,
        msg: 'Ok busqueda'
    })

}

// Exportamos la funcionalidades
module.exports = {
    getTodo
}