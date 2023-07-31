import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterMedicoComponent } from './router-medico.component';

import { ActivatedRoute, Router } from '@angular/router';
import { Observable, empty } from 'rxjs';

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  class FakeRouter{

    navigate( params: any ) { }

  }

  class FakeActivatedRoute {
    params: Observable<any> = empty();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterMedicoComponent ],
      providers: [
        { provide: Router, useClass: FakeRouter }, // Router falso: Basicamente decimos que reemplace el Router por el FakeRouter
        { provide: ActivatedRoute, useClass: FakeActivatedRoute } // ActivatedRoute: Básicamente reemplaza el ActivatedRoute por un FakeActivatedRoute
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de redireccionar a Medico cuando se guarde', () => {
  
    const router = TestBed.get( Router );

    // Espiamos el router y buscar el navigate
    const spy = spyOn( router, 'navigate' );

    component.guardarMedico();

    expect( spy ).toHaveBeenCalledWith( ['medico', '123'] );

  });

});
