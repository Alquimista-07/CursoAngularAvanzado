import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() { 

    let i = -1;

    // Creamos un observable de manera manual
    const obs$ = new Observable( observer => {

      const intervalo = setInterval( () =>{

        i++;
        // Emitimos el valor de i
        observer.next(i);

        // Finalizamos el observable
        if ( i === 4 ){
          clearInterval(intervalo);
          // Notificamos que ya se cancelo
          observer.complete();
        }

        if( i === 2 ){
          i = 0;
          // console.log('i = 2... error!!!...');
          // NOTA: Una vez se dispara el error el complete no sigue
          observer.error('i llego al valor de 2');
        }

      }, 1000 );

    });

    // Nos subscribimos al observable
    // Implementamos el rety el cual permite relanzar el observable cuantas veces creamos necesario
    // y de esta manera reintentar la ejecución de un bloque de codigo que pudo fallar por algún motivo
    obs$.pipe(
      // retry() // Intenta infinitas veces
      retry(2) // Reintenta 2 veces
    ).subscribe(
      valor => console.log('Subs', valor),
      // Cunado se complete hacemos algo
      (error) => console.error('Error: ', error),
      () => console.info('Obs Completado')
      
    );

  }

}
