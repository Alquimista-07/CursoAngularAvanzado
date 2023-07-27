// NOTA: Todas las pruebas tienen dos parte generales, la primera es el describe() y la segunda es el it()
//       o por lo menos con jasmine funcionan de esa forma.
//
//       El describe() sirve para agrupar pruebas.
//
//       El it() es una prueba o sirve para decir que esta es una prueba en específico,
//       es decir, es una evaluación en concreto.
//       Adicionalmente lo que coloquemos dentro de los paréntesis del it debe de contener
//       un texto lo suficientemente explícito de que se trata la prueba.

import { mensaje } from "./string";

describe( 'Pruebas de strings', () => {

    it( 'Debe de regresar un string', () => {

        // Acá dentro tenemos que disparar el código necesario para evaluar la función a probar,
        // En este caso almaceno la respuesta de la función en una constante, pero puede ser en un
        // var o un let.
        const respuesta = mensaje('Fulanito');

        // Ahora para poder evaluar y confimar la prueba, es decir, para que indicarle a jasmine y 
        // poder confirmar si la prueba fue exitosa es necesario usar la instrucción expect(), y 
        // este pude ser uno o varios.
        // Adicionalmente el expect() en pocas palabras lo que indica es que espere a que la respuesta
        // o lo que se esta evaluando sea algo en particular. Por ejemplo podemos evaluar que el tipo 
        // que regresa la función sea obligatoriamente un string
        expect(  typeof respuesta ).toBe('string');

    });

    // Comprobar que el resultado CONTENGA algo
    it( 'Debe de retornar un saludo con el nombre enviado', () =>{

        const nombre = 'Pedro';
        const resp = mensaje( nombre );

        // Evaluamos la respuesta
        expect( resp ).toContain(nombre)

    });

});