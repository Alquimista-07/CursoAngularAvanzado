// NOTA: Este interceptor lo creamos a través del angular cli como si fuera un servicio,
//       es decir, para crearlo lo realizamos a través del comando ng g s ruta/nombre-servicio-interceptor
//       lo único que lo diferencia de un servicio normal es la implementación de la interface
//       con su método interceptor() específico que se encarga de trabajar y hacer todo lo necesario
import { Injectable } from '@angular/core';

// Importamos los paquetes para poder usar el interceptor
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    // En este caso tenemos como si la válvula estuviera abierta y dejamos pasar todo ya que simplemente
    // retornamos la request
    return next.handle(req);

  }

}
