import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;

  constructor( private fb: FormBuilder, private usuariService: UsuarioService ) { }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ 'Juan Carlos', Validators.required ],
      email: [ 'juan@gmail.com', [ Validators.required, Validators.email ] ]
    });

  }

  actualizarPerfil() {
    console.log( this.perfilForm.value );
    this.usuariService.actualizarPerfil( this.perfilForm.value )
        .subscribe( resp => {
          console.log(resp);
        });
  }

}
