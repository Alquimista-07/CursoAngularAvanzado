import { TestBed, ComponentFixture } from '@angular/core/testing';
import { IncrementadorComponent } from './incrementador.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('Incremendator Component', () => {

    let component: IncrementadorComponent;
    let fixture: ComponentFixture<IncrementadorComponent>;

    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [ IncrementadorComponent ],
            imports: [ FormsModule ]
        });

        fixture = TestBed.createComponent(IncrementadorComponent);
        component = fixture.componentInstance;

    });

    it('Debe de mostrar la leyenda', () => {

        component.leyenda = 'Progreso de carga';

        // Disparamos la detección de cambios para indicarle a Angular que la leyenda cambió
        fixture.detectChanges();

        // Hacemos referencia al elemento html donde se muestra la leyenda
        // NOTA: El query me permite buscar un elemento, el queryAll todos los elementos
        //       y el queryAllNodes permite buscar todos los nodos que coincidan con el
        //       parametro que indiquemos.
        // NOTA2: El query nos pide como parámentro un predicado, el cual básicamente es 
        //        una condición por la cual yo necesito buscar algo
        const elem: HTMLElement = fixture.debugElement.query( By.css('h3') ).nativeElement;

        expect( elem.innerHTML ).toContain('Progreso de carga');

    });

    it('Debe de mostrar en el input el valor del progreso', () => {

        component.cambiarValor(5);

        fixture.detectChanges(); // Disparar la detección de cambios

        // Como el ciclo de detección de cambios a veces puede ser un poco demorado, usamos la función
        // whenStable() para hacer que espere hasta que termine la detección de cambios y este el elemento 
        // listo
        fixture.whenStable().then( () => {

            // Hacemos una referencia al input
            const input = fixture.debugElement.query( By.css('input') );
            const elem = input.nativeElement;
    
            expect( elem.value ).toBe( '55' );

        });


    });

});
