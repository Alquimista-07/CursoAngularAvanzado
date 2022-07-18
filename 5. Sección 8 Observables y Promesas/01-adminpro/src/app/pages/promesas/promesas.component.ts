import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Creamos una promesa, y en este caso no es asíncrona por defecto ya que se hace de manera secuencial,
    // por lo tanto necesitamos enviar la resolución y esta es la parte asíncrona
    const promesa = new Promise( (resolve, reject) => {

      console.log('Hola Mundo');

      // if( true ){
      if( false ){
        resolve('Hola Mundo resolve');
      }
      else {
        reject('Algo salio mal');
      }

    });

    // Escuchamos cuando la promesa se resuelva
    promesa.then( (mensaje) => {
      console.log('Hey terminé');
      console.log('Mensaje: ', mensaje);
    })
    .catch( error => {
      console.log('Error en mi promesa: ', error);
    });

    console.log('Fin del Init');

  }

}
