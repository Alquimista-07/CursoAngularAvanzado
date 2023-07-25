import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

// Importamos el servicio interceptor 
import { InterceptorService } from './interceptors/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  // Como mencionamos para que el módulo sepa que tiene un interceptor que escucha todo, lo tenemos que
  // especificar en los providers con el fin de que este se eche a andar.
  // Y también cabe aclarar que es la configuración básica que se hace de un intercpetor
  providers: [
    {
      // Definimos que es un tipo de interceptor
      provide: HTTP_INTERCEPTORS,
      // Especificamos la clase que va a manejar ese interceptor, o cual es el interceptor que voy a definir acá
      useClass: InterceptorService,
      // La siguiente propiedad especifica que este pendiente de todas las peticiones que se hagan
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
