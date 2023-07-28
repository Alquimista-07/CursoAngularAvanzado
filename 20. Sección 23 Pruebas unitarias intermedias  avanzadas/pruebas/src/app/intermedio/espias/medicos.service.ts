import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// NOTA: En las pruebas unitarias este es uno de los temas con mayor relevancia ya que en nuestros 
//       códigos siempre llamamos endpoints y en las pruebas unitarias debemos crear mocks simulando 
//       las respuestas de estos
//       Los espías son una forma de verificar si se llamó a una función o proporcionar un valor de 
//       retorno personalizado.
// 
//       Adicionalmente estos espías nos sirven para realizar pruebas como por ejemplo cuando algún servicio
//       del backend aún no esta desarrollado y no contamos con el endpoint que se va a probar. Por lo tanto
//       con esto podemos probar el llamado a dichas funciones.

@Injectable()
export class MedicosService {

  constructor( public http: HttpClient ) { }

  getMedicos() {
    return this.http.get('...')
                .pipe(
                  map( (resp: any) => resp['medicos'] )
                )
  }

  agregarMedico( medico: any ) {
    return this.http.post('...', medico )
               .pipe(
                 map( (resp: any) => resp['medico'] )
               )
  }

  borrarMedico( id: string ) {
    return this.http.delete('...' )
               .pipe(
                 map( (resp: any) => resp['medico'] )
               )
  }


}
