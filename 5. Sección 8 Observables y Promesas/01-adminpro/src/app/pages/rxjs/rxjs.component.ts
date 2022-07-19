import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() { 

    // Creamos un observable de manera manual
    const obs$ = new Observable( observer => {

      let i = -1;

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
          // NOTA: Una vez se dispara el error el complete no sigue
          observer.error('i llego al valor de 2');
        }

      }, 1000 );

    });

    // Nos subscribimos al observable
    obs$.subscribe(
      valor => console.log('Subs', valor),
      // Cunado se complete hacemos algo
      (error) => console.error('Error: ', error),
      () => console.info('Obs Completado')
      
    );

  }

}
