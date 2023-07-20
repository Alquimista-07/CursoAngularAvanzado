import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  // Propiedad para mostrar el hospital
  public hospitalSeleccionado: Hospital | any;

  constructor( private fb: FormBuilder, private hospitalService: HospitalService ) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['Hernando', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    // Creamos un observable que este pendiente del hospital
    // Para este caso el observable que usamos es el valueChanges
    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( hosp => hosp._id === hospitalId );
        });

  }

  guardarMedico() {
    console.log(this.medicoForm.value);
  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales( 0 )
        .subscribe( ({ hospitales }) => {
          this.hospitales = hospitales;
        });

  }

}
