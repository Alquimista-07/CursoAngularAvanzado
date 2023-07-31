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

});
