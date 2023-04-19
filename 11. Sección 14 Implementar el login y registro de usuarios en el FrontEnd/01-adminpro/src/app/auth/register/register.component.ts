import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  // Usando formularios reactivos vamos a capturar la información del registro
  public registerForm = this.fb.group({
    // Definimos como quiero que luzca el formulario
    // El primer parametro es un valor por defecto, el segundo parametro son validaciones
    nombre: ['Pepito', Validators.required],
    email: ['test100@test.com', [ Validators.required, Validators.email ] ],
    password: ['123456', [ Validators.required, Validators.minLength(5) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(5) ]],
    terminos: [ true, Validators.required ]

  }, {
    // Creamos una validación personalizada para hacer inválido el formulario cuando no se cumpla alguna de las validaciones
    validators: this.passwordsIguales( 'password', 'password2' )
  });

  constructor( private fb: FormBuilder ) { }

  // Definimos el método para capturar la información
  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);

    if( this.registerForm.valid ){
      console.log('Posteando formulario');
    } else {
      console.log('Formulario no es correcto!!!...');
    }

  }

  // Método para validar campos
  campoNoValido( campo: string ): boolean {
    return this.registerForm.get(campo)?.invalid && this.formSubmitted ? true : false;
  }

  // Método para validar que las contraseñas sean iguales
  contrasenasNoValidas() {
    return this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value && this.formSubmitted ? true : false;
  }

  // Método para validar el check de términos y condiciones
  aceptarTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  // Validación personalizada para las contraseñas
  passwordsIguales( pass1Name: string, pass2Name: string ) {
    
    return ( formGroup: FormGroup ) => {

      // Extraemos la referencia a los passwords
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }else {
        pass2Control?.setErrors({ noEsIgual: true })
      }

    }

  }

}
