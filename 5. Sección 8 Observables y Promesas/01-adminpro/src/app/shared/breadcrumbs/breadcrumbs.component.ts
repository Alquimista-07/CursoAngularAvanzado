import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  public titulo!: string;

  constructor( private router: Router ) { 
    this.getArgumentosRuta();
  }

  // Metodo para traer la información de la data definida en la el routing y el cual nos sirve
  // para asignar el titulo en el Breadcrums
  getArgumentosRuta() {

    this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( event => event.snapshot.data )
    )
    .subscribe( ({ titulo }) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${ titulo }`;
    });

  }

}
