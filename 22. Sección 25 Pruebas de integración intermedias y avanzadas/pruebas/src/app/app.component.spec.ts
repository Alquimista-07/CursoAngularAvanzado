import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      // Esto va a ignorar cualquier componente, cualquier directiva que no se conozca
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pruebas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pruebas');
  });

  it('Debe de tener un router-outlet', () => {

    const fixture = TestBed.createComponent(AppComponent);
    
    const debugElement = fixture.debugElement.query( By.directive( RouterOutlet ) );

    expect( debugElement ).not.toBeNull();
    
  });
  
});
