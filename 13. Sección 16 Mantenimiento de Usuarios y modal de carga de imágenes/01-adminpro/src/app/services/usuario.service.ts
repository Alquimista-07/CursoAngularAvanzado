import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

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

  // Creamos una propiedad en la clase que es de tipo Usuario
  public usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  // Getter para obtener el token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // Getter para obtener el uid del usuario
  get uid(): string {
    return this.usuario.uid || '';
  }

  // Getter para obtener los headers
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');

    // Quitamos el usuario de google y navegamos
    // NOTA: Acá se revoca es el correo en google identity, de momento esta un correo estático pero luego se va a ajustar
    //       para que use el correo que está autenticado.
    google.accounts.id.revoke(this.usuario.email, () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }

  // Metodo para validar el token almacenado
  validarToken(): Observable<boolean> {

    //const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        // Asignamos un objeto al usuario, por lo tanto este objeto no puede usar métodos definidos en el modelo usuario
        // ya que nos daría error y se iríra por el catch. 
        // Por lo tanto si queremos usar los métodos que tengamos en el modelo deberíamos crearnos una instancia, como se muestra en
        // el siguiente ejemplo:
        //
        // this.usuario = new Usuario('juan', 'prueba@prueba.com');
        //
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        localStorage.setItem('token', resp.token);

        return true;
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  crearUsuario(formData: RegisterForm) {
    // Hay que recordar que como el httpClient de Angular trabaja con Observables debemos subscribirnos con el .subscribe()
    // pero en este caso para obviarlo simplemente usamos el return
    // Como estos son observable podemos usar los pipes de rxjs para disparar efectos secundarios que en este caso vamos a disparar llamado tap
    // para almacenar el token en el localStorage
    // NOTA: El token también lo podríamos almacenar en el sessionStorage pero cuando cerramos la instancia del navegador este se va a purgar
    //       y como nuestro token es vigente por 12 horas queremos almacenarlo hasta que caduque y sea renovado
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          // Extraemos el token para grabarlo en el localStorage
          // La función setItem del localStorage recibe como primer argumento que es como vamos a llamar la llave y como segundo parametro el valor
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  loginUsuario(formLoginData: LoginForm) {
    // Hay que recordar que como el httpClient de Angular trabaja con Observables debemos subscribirnos con el .subscribe()
    // pero en este caso para obviarlo simplemente usamos el return
    // Como estos son observable podemos usar los pipes de rxjs para disparar efectos secundarios que en este caso vamos a disparar llamado tap
    // para almacenar el token en el localStorage
    // NOTA: El token también lo podríamos almacenar en el sessionStorage pero cuando cerramos la instancia del navegador este se va a purgar
    //       y como nuestro token es vigente por 12 horas queremos almacenarlo hasta que caduque y sea renovado
    return this.http.post(`${base_url}/login`, formLoginData)
      .pipe(
        tap((resp: any) => {
          // Extraemos el token para grabarlo en el localStorage
          // La función setItem del localStorage recibe como primer argumento que es como vamos a llamar la llave y como segundo parametro el valor
          localStorage.setItem('token', resp.token);
        })
      );
  }

  // Creamos un método que me va a permitir realizar el posteo del token
  loginGoogle(token: string) {
    // Colocamos la url y mandamos el token como payload
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          // console.log(resp);
          localStorage.setItem('token', resp.token);
        })
      );

  }

  // Método para cargar usuarios registrados en la tabla del front
  cargarUsuarios(desde: number = 0) {

    // http://localhost:3000/api/usuarios?desde=0
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers )
               .pipe( map( resp => {
                // Cambiamos el arreglo de objetos por un arreglo de tipo usuarios
                const usuarios = resp.usuarios.map( 
                  user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid ) 
                  );
                return {
                  total: resp.total,
                  usuarios
                }
               }))

  }

  // Método para eliminar usuarios
  eliminarUsuario( usuario: Usuario ) {
    
    // http://localhost:3000/api/usuarios/62ee6886882095fe38c11950
    const url = `${base_url}/usuarios/${ usuario.uid }`;
    return this.http.delete( url, this.headers );

  }

}
