import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements AfterViewInit {

  // Usamos la referencia local que creamos del botón de google
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  // Usando formularios reactivos vamos a capturar la información del formulario de login
  public loginForm = this.fb.group({
    // Definimos como quiero que luzca el formulario
    // El primer parametro es un valor por defecto, el segundo parametro son validaciones
    // NOTA: Ajustamos el email para que lo lea del localStorage y cuando no exista nada allí le coloque un string vacío.
    //       Y también ajustamos para que guarde en el localStorage el estado del check del remember
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [localStorage.getItem('remember') || false]

  });

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {

    this.googleInit();
  
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "125658081262-m7mel7rp3gncike2303g7kdu0aa8his7.apps.googleusercontent.com",
      callback: this.handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement, // Obtenemos el elemento por su referencia local y no por el id como estaba anteriormente
      { theme: "outline", size: "large" } // customization attributes
    );

    // NOTA: Esta línea de código comentada lo que hace es lanzar el popup de google inmediatamente para sugerir el inicio de sesión usando google
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse( response: any ) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  login() {
    // this.router.navigateByUrl('/');
    console.log(this.loginForm.value);
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(resp => {

        // Si esta checkeado grabanos el email en el localStorage para recordarlo
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')!.value);
          localStorage.setItem('remember', 'true');
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('remember');
        }

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
