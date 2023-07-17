import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

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

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {

    this.cargarHospitales();

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

}
