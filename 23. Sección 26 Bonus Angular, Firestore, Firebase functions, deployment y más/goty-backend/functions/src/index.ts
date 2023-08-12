import {onRequest} from "firebase-functions/v2/https";

//-----------------------------------------------
// TRABAJAR CON FIREBASE DE FORMA LOCAL y REMOTA
//-----------------------------------------------
// NOTA: Esta configuración nos va a permitir trabajar con nuestra base de datos firebase de 
//       forma local y remota. Por lo tanto importamos la libreria admin y creamos una variable
//       que va a hacer referencia a nuestro archivo .json que contiene las credenciales y 
//       el cual para generarlo tenemos que:
//
//       1. Diregirnos a la consola de firebase.
//       2. Hacer click sobre nuestr poryecto de firebase
//       3. Dar click en el engrane y luego hacer click en la configuración del proyecto
//       4. Dentro de dicha configuración vamos a la pestaña que dice cuentas de servicio
//       5. En el apartado SDK de Firebase Admin tenemos las opciones de los lenguajes de programación que podemos usar,
//          por lo tanto como estamos trabajando con node hacemos click en dicha opción y ahí nos va a mostrar las líneas
//          de código que tenemos que implementar y las cuales posteriormente ajustamos para hacer referencia a la ruta del
//          del archivo .json que contiene las credenciales y que se genera en el siguiente paso.
//       6. Adicionalmente tenemos que dar clik en el botón generar nueva clave primaria, y el cual nos va apermitir descargar
//          un archivo .json que como se mencionó anteriormente contiene las credenciales necesarias para poder conectarnos a 
//          nuestro servicio.
//          Dicho archivo se va a descargar con un nombre muy largo que contiene el nombre del proyecto y otras cosas pero para
//          este caso le cambiamos el nombre a serviceAccountKey.json
//       7. Adicionalmente lo que vamos a hacer es copiar dicho archivo a nuestra carpeta lib y src dentro del proyecto que estamos
//          desarrollando.
//
// NOTA IMPORTANTE: Dicho archivo .json y que renombramos comoserviceAccountKey no lo debemos dejar expuesto ya que con dicho archivo 
//                  continene las credenciales de la base de datos, dejando una puesta abierta para que cualquier persona mal intencionada
//                  haga estragos sobre nuestra base de datos o servico de firebase.
//
import * as admin from 'firebase-admin';

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  response.json({
    mensaje: 'Hola Mundo desde Funciones de Firebase!!!...'
  });
});
