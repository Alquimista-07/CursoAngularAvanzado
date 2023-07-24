const obtenerMenuFrontEnd = ( role = 'USER_ROLE' ) => {

    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            {
              titulo: 'Main',
              url: '/'
            },
            {
              titulo: 'ProgressBar',
              url: 'progress'
            },
            {
              titulo: 'Gráficas',
              url: 'grafica1'
            },
            {
              titulo: 'Promesas',
              url: 'promesas'
            },
            {
              titulo: 'Rxjs',
              url: 'rxjs'
            }
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            // {
            //   titulo: 'Usuarios',
            //   url: 'usuarios'
            // },
            {
              titulo: 'Hospitales',
              url: 'hospitales'
            },
            {
              titulo: 'Médicos',
              url: 'medicos'
            }
          ]
        }
      ];

    // Solo queremos que los usuarios administradores tengan la opción de ver los usuarios, por lo tanto
    // validamos el role y a través de la función unshift agregamos el elemento al arreglo cuando sea administrador
    if( role === 'ADMIN_ROLE' ){
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;
}

module.exports = {
    obtenerMenuFrontEnd
}