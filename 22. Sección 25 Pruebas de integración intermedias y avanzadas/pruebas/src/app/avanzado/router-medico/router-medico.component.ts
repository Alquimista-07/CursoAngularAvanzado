import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-router-medico',
  templateUrl: './router-medico.component.html',
  styles: [
  ]
})
export class RouterMedicoComponent implements OnInit {

  id!: string;

  constructor( public router: Router, public activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params
        .subscribe( (params: any) => {
          this.id = params['id']
        });
  }

  guardarMedico() {
    this.router.navigate(['medico', '123']);
  }

}
