import { Component, OnInit } from '@angular/core';
import { MedicosService } from './medicos.service';

// NOTA: En las pruebas unitarias este es uno de los temas con mayor relevancia ya que en nuestros 
//       códigos siempre llamamos endpoints y en las pruebas unitarias debemos crear mocks simulando 
//       las respuestas de estos
//       Los espías son una forma de verificar si se llamó a una función o proporcionar un valor de 
//       retorno personalizado.
// 
//       Adicionalmente estos espías nos sirven para realizar pruebas como por ejemplo cuando algún servicio
//       del backend aún no esta desarrollado y no contamos con el endpoint que se va a probar. Por lo tanto
//       con esto podemos probar el llamado a dichas funciones.

@Component({
  selector: 'app-medicos',
  template: `
    <p>
      medicos works!
    </p>
  `,
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos: any[] = [];
  public mensajeError!: string;

  constructor( public _medicoService: MedicosService ) { }

  ngOnInit() {
    this._medicoService.getMedicos()
          .subscribe( (medicos:any) => this.medicos = medicos );
  }

  agregarMedico() {
    const medico = { nombre: 'Médico Juan Carlos' };

    this._medicoService.agregarMedico(medico)
          .subscribe(
            (medicoDB: any) => this.medicos.push(medicoDB),
            (err: any) => this.mensajeError = err
          );
  }

  borrarMedico(id: string) {
    const confirmar = confirm('Estas seguro que desea borrar este médico');

    if ( confirmar ) {
      this._medicoService.borrarMedico( id );
    }

  }

}
