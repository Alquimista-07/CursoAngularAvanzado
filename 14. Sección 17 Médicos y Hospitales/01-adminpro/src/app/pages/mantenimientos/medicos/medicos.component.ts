import { Component, OnInit } from '@angular/core';

import { Medico } from 'src/app/models/medico.model';

import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  // Propiedad para tener el total de usuarios
  public totalMedicos: number = 0;
  // Propiedad para almacenar los usuarios actuales
  public medicosTemp: Medico[] = [];

  // Propiedad para tener la referencia a la página actual
  public desde: number = 0;

  // Propiedad para mostrar los hospitales
  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor( private medicoService: MedicoService, private modalImagenService: ModalImagenService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){

    this.cargando = true;

    this.medicoService.cargarMedicos( this.desde )
        .subscribe( ({ total, medicos }) => {
          this.totalMedicos = total;
          this.medicos = medicos;
          this.medicosTemp = medicos;
          this.cargando = false;
        });

  }

  // Método para cambiar la página
  cambiarPagina( valor: number ){

    // Cambiamos el valor actual de la pagina y le sumamos uno
    this.desde += valor;

    // Validaciones para evitar que el limite se salga de lo estipulado
    if( this.desde < 0 ){
      this.desde = 0;
    } else if ( this.desde >= this.totalMedicos ){
      this.desde -= valor;
    }

    this.cargarMedicos();

  }

  abrirModal( medico: Medico ){

    this.modalImagenService.abrirModal( 'medicos', medico._id!, medico.img );
  
  }

}
