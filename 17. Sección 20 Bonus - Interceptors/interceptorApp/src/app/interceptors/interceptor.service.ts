// NOTA: Este interceptor lo creamos a través del angular cli como si fuera un servicio,
//       es decir, para crearlo lo realizamos a través del comando ng g s ruta/nombre-servicio-interceptor
//       lo único que lo diferencia de un servicio normal es la implementación de la interface
//       con su método interceptor() específico que se encarga de trabajar y hacer todo lo necesario
import { Injectable } from '@angular/core';

// Importamos los paquetes para poder usar el interceptor
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Para poder usar el interceptor lo implementamos la interface (implements HttpInterceptor)
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  // La interface necesita un método que es el intercept y el cual se crea de la siguiente manera
  // Adicionalmente el interceptor es como una especie de válvula que va a interceptar todo lo que venga
  // a través de http, es decir, que escucha todo, pero para ponerlo a andar y escuchar todo tenemos que 
  // decirle al modulo que cuenta con este interceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    console.log('Paso por el interceptor');

    const headers = new HttpHeaders({
      'token-usuario': 'ABC123'
    });

    // Creamos un clone de la request ya que hay que tener en cuenta que cuando usamos la request esta ya deja de poderse usar
    // es como si mutara y ya no se puede usar para poder hacer una petición, por lo tanto creamos un clone antes de que sea 
    // manipulada
    const reqClone = req.clone({
      headers
    });

    // En este caso ahora lo que estamos haciendo es tratar la información que viaja por la válvula que es el interceptor
    // ya que como sabemos absolutamente todas las peticiones están pasando por este intercpetor
    return next.handle( reqClone ).pipe(
      catchError( this.manejarError )
    )

  }

  manejarError( error: HttpErrorResponse ){

    console.log('Sucedió un error');
    console.log('Registrado el el logfile');
    console.warn(error);
    return throwError('Error personalizado');

  }

}
