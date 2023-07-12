import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
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

  // Propiedad para manera el loading
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService, private busquedaService: BusquedasService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  // Método para cargar usuarios
  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.desde )
        .subscribe( ({ total, usuarios }) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
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
    } else if ( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  // Método para buscar usuarios o médicos u hospitales
  buscar ( termino: string ){
    
    this.busquedaService.bucar( 'usuarios', termino )
        .subscribe( resultados => {

          this.usuarios = resultados;
          
        });

  }

}
