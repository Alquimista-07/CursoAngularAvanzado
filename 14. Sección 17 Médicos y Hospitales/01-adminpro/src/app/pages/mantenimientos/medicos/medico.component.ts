import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

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

  // Propiedad para manejar la imágen del nuevo médico
  public medicoSeleccionado!: Medico;

  constructor( private fb: FormBuilder, private hospitalService: HospitalService, private medicoService: MedicoService,
               private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    // NOTA: Necesitamos el id del médico, y lo vamos a manejar como una subscripción, ya que puede ser que estemos en la misma pantall
    //       y el url puede cambiar, podemos hacerlo por el snapshot pero el snapchot no cambia una vez se lee, por lo tanto lo vamos 
    //       a obtener suscribiendonos a la ruta activa usando el activatedRoute
    this.activatedRoute.params
                       .subscribe( ({id}) => this.cargarMedico( id ) );

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
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

  cargarMedico( id: string ){
     console.log(id);
     this.medicoService.obtenerMedicoPorId( id )
         .subscribe( medico => {
          console.log(medico);
          this.medicoSeleccionado = medico;
         })

  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;
    this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) =>{
          console.log(resp);
          Swal.fire( 'Creado', `${ nombre } creado exitosamente`, 'success');
          // Una vez creado hacemos la redirección a la misma pantalla pero con la información que estoy esperando
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        })
  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales( 0 )
        .subscribe( ({ hospitales }) => {
          this.hospitales = hospitales;
        });

  }

}
