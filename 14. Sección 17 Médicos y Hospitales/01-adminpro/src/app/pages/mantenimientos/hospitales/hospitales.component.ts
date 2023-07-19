import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  // Propiedad para tener el total de usuarios
  public totalHospitales: number = 0;
  // Propiedad para almacenar los usuarios actuales
  public hospitalesTemp: Hospital[] = [];

  // Propiedad para tener la referencia a la página actual
  public desde: number = 0;

  // Propiedad para mostrar los hospitales
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  private imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService, private modalImgenService: ModalImagenService ) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalImgenService.nuevaImagen
        .pipe( delay( 1000 ) )
        .subscribe( img => this.cargarHospitales() );

  }

  cargarHospitales() {

    this.cargando = true;

    this.hospitalService.cargarHospitales( this.desde )
        .subscribe( ({ total, hospitales }) => {
          this.totalHospitales = total;
          this.hospitales = hospitales;
          this.hospitalesTemp = hospitales;
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
    } else if ( this.desde >= this.totalHospitales ){
      this.desde -= valor;
    }

    this.cargarHospitales();

  }

  guardarCambios( hospital: Hospital ){

    this.hospitalService.actualizarHospital( hospital._id!, hospital.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', `${ hospital.nombre } actualizado correctamente`, 'success' );
        });

  }

  borrarHospital( hospital: Hospital ){

    this.hospitalService.borrarHospital( hospital._id! )
        .subscribe( resp => {
          this.cargarHospitales();
          Swal.fire( 'Borrado', `${ hospital.nombre } eliminado correctamente`, 'success' );
        });

  }

  async abrirSweetAlertCrearHospital() {

    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })

    if( value?.trim().length! > 0 ){
      this.hospitalService.crearHospital( value! )
          .subscribe( ( resp: any ) => {
            this.hospitales.push( resp.hospital );
            Swal.fire('Creado', 'Hospital creado correctamente', 'success');
          });
    } else {
      Swal.fire('Error', 'Por favor ingrese el nombre de un hospital', 'error');
    }
  }

  abrirModal( hospital: Hospital ) {
    this.modalImgenService.abrirModal('hospitales', hospital._id!, hospital.img );

  }

}
