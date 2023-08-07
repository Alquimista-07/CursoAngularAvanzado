import {onRequest} from "firebase-functions/v2/https";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  response.json({
    mensaje: 'Hola Mundo desde Funciones de Firebase!!!...'
  });
});
