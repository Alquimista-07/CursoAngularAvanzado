import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    // Usamos el acrivated route para obtener el término de busquda que se envía a través de la url
    this.activatedRoute.params
        .subscribe( ({ termino }) => {
          
        });

  }

}
