import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

// Saber cual es el usuario conectado es importante para el google identity
// ya que este es el que usamos para quitar el acceso con google y que desaparezca del botón de inicio con google
// entonces hacemos lo siguiente:
declare const google: any;

// Servicio para crear usuarios

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient, private router: Router, private ngZone: NgZone ) { }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    
    // Quitamos el usuario de google y navegamos
    google.accounts.id.revoke('google@gmail.com', () =>{
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  // Metodo para validar el token almacenado
  validarToken(): Observable<boolean> {
    
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) =>{
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true),
      catchError( error => of( false ) )
    );

  }

  crearUsuario( formData: RegisterForm ){
    // Hay que recordar que como el httpClient de Angular trabaja con Observables debemos subscribirnos con el .subscribe()
    // pero en este caso para obviarlo simplemente usamos el return
    // Como estos son observable podemos usar los pipes de rxjs para disparar efectos secundarios que en este caso vamos a disparar llamado tap
    // para almacenar el token en el localStorage
    // NOTA: El token también lo podríamos almacenar en el sessionStorage pero cuando cerramos la instancia del navegador este se va a purgar
    //       y como nuestro token es vigente por 12 horas queremos almacenarlo hasta que caduque y sea renovado
    return this.http.post( `${base_url}/usuarios`, formData )
               .pipe(
                 tap( (resp: any) => {
                   // Extraemos el token para grabarlo en el localStorage
                   // La función setItem del localStorage recibe como primer argumento que es como vamos a llamar la llave y como segundo parametro el valor
                   localStorage.setItem( 'token', resp.token );
                 })
                );
  }

  loginUsuario( formLoginData: LoginForm ){
    // Hay que recordar que como el httpClient de Angular trabaja con Observables debemos subscribirnos con el .subscribe()
    // pero en este caso para obviarlo simplemente usamos el return
    // Como estos son observable podemos usar los pipes de rxjs para disparar efectos secundarios que en este caso vamos a disparar llamado tap
    // para almacenar el token en el localStorage
    // NOTA: El token también lo podríamos almacenar en el sessionStorage pero cuando cerramos la instancia del navegador este se va a purgar
    //       y como nuestro token es vigente por 12 horas queremos almacenarlo hasta que caduque y sea renovado
    return this.http.post( `${base_url}/login`, formLoginData )
               .pipe(
                tap( (resp: any) => {
                  // Extraemos el token para grabarlo en el localStorage
                  // La función setItem del localStorage recibe como primer argumento que es como vamos a llamar la llave y como segundo parametro el valor
                  localStorage.setItem( 'token', resp.token );
                })
               );
  }

  // Creamos un método que me va a permitir realizar el posteo del token
  loginGoogle( token: string ) {
    // Colocamos la url y mandamos el token como payload
    return this.http.post( `${ base_url }/login/google`, { token } )
               .pipe(
                tap( (resp: any) =>{
                  // console.log(resp);
                  localStorage.setItem( 'token', resp.token );
                })
               );

  }

}
