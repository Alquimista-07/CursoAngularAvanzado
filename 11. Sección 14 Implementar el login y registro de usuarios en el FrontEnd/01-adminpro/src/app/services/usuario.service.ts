import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from 'src/environments/environment';

// Servicio para crear usuarios

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  crearUsuario( formData: RegisterForm ){
    // Hay que recordar que como el httpClient de Angular trabaja con Observables debemos subscribirnos con el .subscribe()
    // pero en este caso para obviarlo simplemente usamos el return
    return this.http.post( `${base_url}/usuarios`, formData );
  }

  loginUsuario( formLoginData: LoginForm ){
    // Hay que recordar que como el httpClient de Angular trabaja con Observables debemos subscribirnos con el .subscribe()
    // pero en este caso para obviarlo simplemente usamos el return
    return this.http.post( `${base_url}/login`, formLoginData );
  }

}
