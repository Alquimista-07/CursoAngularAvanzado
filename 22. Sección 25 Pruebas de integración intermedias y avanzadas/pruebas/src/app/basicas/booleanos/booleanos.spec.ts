import { usuarioCerroSesión, usuarioLogueado } from "./booleanos";

describe('Pruebas de booleanos', () =>{

    it('Debe de retornar true', () => {

        // Llamamos la función
        const resp = usuarioLogueado();

        // Evaluamos
        expect( resp ).toBe(true);
        expect( resp ).toBeTrue();
        expect( resp ).toBeTruthy();
        expect( resp ).not.toBeFalsy();

    });

    it('Debe de retornar false', () =>{

        // Llamamos la función
        const resp = usuarioCerroSesión();

        // Evaluamos
        expect( resp ).toBe(false);
        expect( resp ).toBeFalsy();
        expect( resp ).toBeFalse();
        expect( resp ).not.toBeTruthy();

    })

});
