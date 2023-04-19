import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    password: ['', [ Validators.required, Validators.minLength(5) ]],
    password2: ['', [ Validators.required, Validators.minLength(5) ]],
    terminos: [ false, Validators.required ]

  });

  constructor( private fb: FormBuilder ) { }

  // Definimos el método para capturar la información
  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

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

  // Método para validar el check de términos y condiciones
  aceptarTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

}
