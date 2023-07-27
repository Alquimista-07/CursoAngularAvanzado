import { FormularioRegister } from "./formulario"
import { FormBuilder } from '@angular/forms';

describe('Pruebas de formularios', () => {

    // Definimos el componente y le decimos que va a ser de tipo FormularioRegister
    let componente: FormularioRegister;

    beforeEach( () => {
        // Inicializamos el componente y como el constructor del FormularioRegister espera un argumento
        // ya que si no lo mandamos da error, entonces como dicho argumento es un formbuilder, simpelemte
        // lo instaciamos y lo enviamos
        componente = new FormularioRegister( new FormBuilder() );
    });

    it('Debe de crear un formulario con dos campos, email y password', () => {

        expect( componente.form.contains('email') ).toBeTruthy();
        expect( componente.form.contains('password') ).toBeTruthy();

    });

    it('El email debe de ser obligatorio', () => {

        const campo = componente.form.get('email');

        campo?.setValue('');

        expect( campo?.valid ).toBeFalsy();

    });

    it('El email debe de ser un email válido', () => {

        const campo = componente.form.get('email');

        // campo?.setValue('test@'); // Falla no es válido
        campo?.setValue('test@test.com');

        expect( campo?.valid ).toBeTruthy();

    });

})