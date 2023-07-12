import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  // Propiedad para tener la referencia a la página actual
  public desde: number = 0;

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  // Método para cargar usuarios
  cargarUsuarios() {

    this.usuarioService.cargarUsuarios( this.desde )
        .subscribe( ({ total, usuarios }) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
        });

  }

  // Método para cambiar la página
  cambiarPagina( valor: number ){

    // Cambiamos el valor actual de la pagina y le sumamos uno
    this.desde += valor;

    // Validaciones para evitar que el limite se salga de lo estipulado
    if( this.desde < 0 ){
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

}
