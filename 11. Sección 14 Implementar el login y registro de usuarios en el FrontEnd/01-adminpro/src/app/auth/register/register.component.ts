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

  // Usando formularios reactivos vamos a capturar la información del registro
  public registerForm = this.fb.group({
    // Definimos como quiero que luzca el formulario
    // El primer parametro es un valor por defecto, el segundo parametro son validaciones
    nombre: ['Pepito', Validators.required],
    email: ['test100@test.com', Validators.required ],
    password: ['123456', [ Validators.required, Validators.minLength(5) ]],
    password2: ['123456', [ Validators.required, Validators.minLength(5) ]],
    terminos: [ false, Validators.required ]

  });

  constructor( private fb: FormBuilder ) { }

  // Definimos el método para capturar la información
  crearUsuario() {
    console.log(this.registerForm.value);
  }

}
