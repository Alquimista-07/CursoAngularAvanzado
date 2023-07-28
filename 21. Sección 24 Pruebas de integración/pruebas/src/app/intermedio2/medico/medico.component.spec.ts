import { MedicoComponent } from "./medico.component";

// NOTA: La diferencia en las pruebas de integración básicamente radica en que yo necesito decirle
//       a Angular que compile la forma para poder obtener acceso al html y otros componentes que 
//       que puede ser que el MedicoComponent necesite o utilice.
//
//       Por lo tanto para decirle a Angular que compile y que se prepare para que trabaje con su
//       ciclo de detección de cambios, para que use los pipes y use X cantidad de cosas de Angular
//       es necesario importar el TestBed de @angular/core/testing el cual tiene un montón de métodos
//       y funciones que nos van a servir para poder realizar estas pruebas ya de elementos y componentes
//       de Angular propiamente.
//       Adicionalmente necesitamos otra importación la cual es el ComponentFixture el cual nos va a permitir
//       controlar o tener acceso a todo el html, el DOM, poder hacer querys en los elementos usando JQuery

import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('Medico Component', () => {

    let componente: MedicoComponent;
    let fixture: ComponentFixture<MedicoComponent>;

    // Por lo general el TestBed se configura acá en el beforeEach()
    // y en él vamos a colocar las cosas necesarias que necesitamos
    // para probar el componente y su html por ejemplo
    beforeEach( () => {
        TestBed.configureTestingModule({
            declarations: [
                MedicoComponent
            ]
        });

        // Una vez configurado el TestBed con sus delcarations, providers e imports
        // necesarios, necesitamos crear un componente ya compilado y procesdo por
        // el TestBed.
        // Y todo esta cración del TestBed nos va regresar un fixture y ese fixture 
        // nos va a ayudar a nosotros a poder tener acceso al html, a los componentes
        // del DOM entre otros.
        fixture = TestBed.createComponent( MedicoComponent );

        // ahora de la siguiente  menera tengo la instancia del componente y ya puedo usaro todos
        // sus métodos y funciones que están definidos en ese componente y a la vez con la línea 
        // de código anterior tengo acceso al fixture que va a permitir también tener acceso al html 
        // y ejecutar otras cosas como por ejemplo poder disparar el ciclo de detección de cambios, 
        // o bien realizar querys o selectores del html sobre el DOM.
        componente = fixture.componentInstance;

    });

});