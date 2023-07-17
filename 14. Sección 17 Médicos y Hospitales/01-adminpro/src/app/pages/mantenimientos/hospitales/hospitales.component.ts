import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  // Propiedad para tener la referencia a la página actual
  public desde: number = 0;

  constructor( private hospitalService: HospitalService ) { }

  ngOnInit(): void {
    this.hospitalService.cargarHospitales( this.desde )
        .subscribe( hospitales => {
          console.log(hospitales);
        });
  }

}
