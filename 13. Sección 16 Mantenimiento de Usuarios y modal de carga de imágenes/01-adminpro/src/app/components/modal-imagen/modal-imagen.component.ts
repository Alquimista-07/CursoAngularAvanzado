import { Component, OnInit } from '@angular/core';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  // Acá colocamos la inyqcción del servicio como publica para poder usarla del lado del html,
  // en caso contrario la dejamos como privada cuando la usamos solo en el componente .ts
  constructor( public modalImagenService: ModalImagenService ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }

}
