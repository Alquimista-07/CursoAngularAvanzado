import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent {

  public formSubmitted = false;

  // Usando formularios reactivos vamos a capturar la información del formulario de login
  public loginForm = this.fb.group({
    // Definimos como quiero que luzca el formulario
    // El primer parametro es un valor por defecto, el segundo parametro son validaciones
    email: ['test100@test.com', [ Validators.required, Validators.email ] ],
    password: ['123456', Validators.required ],
    remember: [ false ]

  });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  login(){
    // this.router.navigateByUrl('/');
    console.log( this.loginForm.value );
    this.usuarioService.loginUsuario( this.loginForm.value )
        .subscribe( resp => {
          console.log(resp);
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

}
