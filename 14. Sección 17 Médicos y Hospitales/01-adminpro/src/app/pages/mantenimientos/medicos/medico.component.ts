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

  constructor( private fb: FormBuilder, private hospitalService: HospitalService ) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: ['Hernando', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

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
