import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valorProgreso') progreso: number = 50;

  // Con el output escuchamos cambios que el componente incrementador va a poder emitir
  // Adicionalmente estos @Output usuarlmente son de tipo eventEmiter, es decir una fucnión
  // que el componente padre va a poder ejecutar
  @Output('valorProgreso') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor: number ) {

    if( this.progreso >= 100 && valor >= 0 ){
      this.valorSalida.emit( 100 );
      return this.progreso = 100
    }
    
    if( this.progreso <= 0 && valor <= 0 ){
      this.valorSalida.emit( 0 );
      return this.progreso = 0
    }
    
    
    this.progreso = this.progreso + valor;
    return this.valorSalida.emit( this.progreso )

  }

}
