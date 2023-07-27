import { Jugador } from './clase';

describe('Pruebas de clases', () => {

    // Esto causa error ya que las pruebas usan el objeto en común, por lo tanto,
    // deberíamos inicializarlo cada vez que lo necesitemos
    //
    let jugador = new Jugador();
    //
    // Por lo tanto para resolver el problema mencionado anteriormente existen 4 ciclos de vida de las pruebas, los cuales son 
    // unas funciones que permite ejecutar acciones, antes quetodo, antes que algo, después de todo y después de algo
    //
    // beforeAll();
    // beforeEach();

    // afterAll();
    // afterEach();
    //

    beforeAll ( () =>{
        console.log('beforeAll');
        // Acá no nos sirve para solucionar el error ya que esto se ejecuta una sola vez al inicio
    });

    beforeEach( () =>{
        console.log('beforeEach');
        // Primera forma de solucionar el error
        // jugador.puntosVida = 100;

        // Segunda forma de solucionar el error
        jugador = new Jugador();
    });

    afterAll  ( () =>{
        console.log('afterAll');
        // Acá no nos sirve para solucionar el error ya que esto se ejecuta una sola vez al final
    });

    afterEach ( () =>{
        console.log('afterEach');
        // Tercera forma de solucionar el error
        jugador.puntosVida = 100;
    });

    it('Debe de retronar 80 de vida si recibe 20 de daño', () => {

        // const jugador = new Jugador();

        const resp = jugador.recibeDanio(20);

        expect( resp ).toBe(80);

    });

    it('Debe de retronar 50 de vida si recibe 50 de daño', () => {

        // const jugador = new Jugador();

        const resp = jugador.recibeDanio(50);

        expect( resp ).toBe(50);

    });

    it('Debe de retornar 0 de puntos de vida, si recibe 100 de daño o más', () => {

        const resp = jugador.recibeDanio(100);

        expect( resp ).toBe(0);

    });

});