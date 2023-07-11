import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;

  // Creamos una nueva propidad que va a servir para subir la imágen
  public imagenSubir!: File;

  constructor( private fb: FormBuilder, private usuariService: UsuarioService,
    private fileUploadService: FileUploadService ) { 
    this.usuario = usuariService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ]
    });

  }

  actualizarPerfil() {
    // console.log( this.perfilForm.value );
    this.usuariService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
          // console.log(resp);
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
        });
  }

  cambiarImagen( file: File ){
    // console.log(file);
    this.imagenSubir = file;
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid! )
    .then( img => console.log( img ) );
  }

}
