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

})