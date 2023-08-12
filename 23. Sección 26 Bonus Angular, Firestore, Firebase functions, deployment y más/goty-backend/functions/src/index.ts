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
// NOTA IMPORTANTE: Dicho archivo .json y que renombramos como serviceAccountKey no lo debemos dejar expuesto ya que con dicho archivo 
//                  continene las credenciales de la base de datos, dejando una puesta abierta para que cualquier persona mal intencionada
//                  haga estragos sobre nuestra base de datos o servico de firebase.
//
import * as admin from 'firebase-admin';

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Creamos una referencia a la base de datos
const db = admin.firestore();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  response.json({
    mensaje: 'Hola Mundo desde Funciones de Firebase!!!...'
  });
});

// Función para obtener la información de la colección goty desde firestore
export const getGOTY = onRequest( async(request, response) => {

  //----------------------------------------------------------------------
  // NOTA: Este código dentro de esta sección marcada con '----' nos permite obtener valores 
  //       que vienen como parámetro en el url
  //
  // const nombre = request.query.nombre || 'Sin Nombre';
  //
  // NOTA: Con el .status podemos enviar el estado que queramos, pero si no colocamos el .status
  //       por defecto va a colocar 200
  // response.status(200).json({
    //   nombre
    // });
  //----------------------------------------------------------------------

  // Creamos una referencia a la colección goty que creamos en firestore
  const gotyRef = db.collection('goty');

  // Como por el momento no nos intersa tener los datos en tiempo real sino la información al 
  // momento de realizar la petición, basicamente lo que necesitamos es un snapshot
  // de los datos, por lo tanto creamos el snapshot y como no es un proceso síncrono
  // usamos el asyn y awiat para esperar a que responda algo antes de continuar 
  const docsSnap = await gotyRef.get();

  // Cremaos una constante que va acontener todos los documentos procesados.
  // Para ello pasamos el snapshot por el map que contiene todos los arreglos 
  // y que va a regresar un nuevo arreglo en base a la condición que indiquemos
  // dentro de dicho método
  const juegos = docsSnap.docs.map( doc => doc.data() );

  response.json( juegos );

});