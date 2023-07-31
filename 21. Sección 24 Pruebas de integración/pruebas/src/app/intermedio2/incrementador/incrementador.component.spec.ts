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

    it('Debe de incrementar/decrementar en 5, con un click en el botón', () => {

        // Hacemos la referencia a los botones
        // NOTA: El queryAll va a devolver todos los botones en forma de arreglo
        const botones = fixture.debugElement.queryAll( By.css('.btn-primary') );
        
        // Simulamos el click en el primer botón (Decrementar)
        botones[0].triggerEventHandler('click', null);
        expect( component.progreso ).toBe(45);

        // Simulamos el click en el segundo botón (Incrementar)
        botones[1].triggerEventHandler('click', null);
        expect( component.progreso ).toBe(50);

    });

    it('En el titulo del componentem debe de mostrar el progreso', () => {

        // Hacemos la referencia a los botones
        // NOTA: El queryAll va a devolver todos los botones en forma de arreglo
        const botones = fixture.debugElement.queryAll( By.css('.btn-primary') );

        // Simulamos el click en el primer botón (Decrementar)
        botones[0].triggerEventHandler('click', null); 
        
        // Detección de cambios
        fixture.detectChanges();

        const elem: HTMLElement = fixture.debugElement.query( By.css('h3') ).nativeElement;

        expect( elem.innerHTML ).toContain('45');

    });

});
