import { Jugador } from './clase';

describe('Pruebas de clases', () => {

    // Esto causa error ya que las pruebas usan el objeto en común, por lo tanto,
    // deberíamos inicializarlo cada vez que lo necesitemos
    //
    const jugador = new Jugador();
    //
    // Por lo tanto para resolver el problema mencionado anteriormente existen, unas funciones
    // que permite ejecutar acciones, antes quetodo, antes que algo, después de todo y después 
    // de algo
    //
    // beforeAll();
    // beforeEach();

    // afterAll();
    // afterEach();
    //

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

});