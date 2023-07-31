import { obtenerRobots } from "./arreglos";

xdescribe('Pruebas de arreglos', () => {

    it('Debe de regregar al menos 3 robots', () => {

        // Llamamos la función
        const resp = obtenerRobots();

        // Evaluamos
        expect( resp.length ).toBeGreaterThanOrEqual(3);

    });

    it('Debe de existir Megaman y Ultron', () => {

        const resp = obtenerRobots();

        expect( resp ).toContain('Megaman');
        expect( resp ).toContain('Ultron');
        expect( resp ).toContain('Megaman' && 'Ultron');

    });

})