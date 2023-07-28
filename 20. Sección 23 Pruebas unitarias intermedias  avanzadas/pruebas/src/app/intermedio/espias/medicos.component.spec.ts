import { MedicosComponent } from './medicos.component';
import { MedicosService } from './medicos.service';
import { empty, from, throwError } from 'rxjs';

// NOTA: En las pruebas unitarias este es uno de los temas con mayor relevancia ya que en nuestros 
//       códigos siempre llamamos endpoints y en las pruebas unitarias debemos crear mocks simulando 
//       las respuestas de estos
//       Los espías son una forma de verificar si se llamó a una función o proporcionar un valor de 
//       retorno personalizado.
// 
//       Adicionalmente estos espías nos sirven para realizar pruebas como por ejemplo cuando algún servicio
//       del backend aún no esta desarrollado y no contamos con el endpoint que se va a probar. Por lo tanto
//       con esto podemos probar el llamado a dichas funciones.

describe('MedicosComponent', () => {

    let componente: MedicosComponent;

    // Como el médico service espera un argumento que corresponde a la inyección del HttpClient
    // pero como sabemos nada de eso va a funcionar ya que los endpoints que tenemos colocados 
    // son ficticos. Por lo tanto como no vamos a usar el http simplemente lo mandamos en null
    // ya que no nos interesa que haga nada con el http y así evitamos que de error ese tipo de 
    // declaraciones.
    const servicio = new MedicosService( null! );

    beforeEach( () => {
        // Inicializamos el componente
        componente = new MedicosComponent( servicio );
    });


    it('Confirmar si al llamar el ngOninit: Debe de cargar los médicos', () => {

        // NOTA: El ngOnInit cuando nosotros declaramos el componente de la forma: 
        //       const servicio = new MedicosService( null! );
        //       automáticamente no dispara el ngOnInit ya que eso es una cosa propia 
        //       o mejor dicho es parte del ciclo de vida de un componente en Angular 
        //       y no aplica para cuando se están ejecutando pruebas ya que estamos 
        //       ejecutando es a través del framework de pruebas Jasmine por consecuencia 
        //       nosostros debemos llamar manualmente el ngOnInit.

        // NOTA 2: Ahora para solucionar el error de que no puede leer la propiedad get de null
        //         ya que eso es lo que estamos enviando al llamar la instancia del getMedicos
        //         y por consecuncia no se va a poder enviar y también si podemos solucionar el
        //         problema del http que enviamos como null de todas formas nos daría error ya que
        //         estamos usando un endpoint o url válido.
        //         Ahora recordemos que estamos haciendo pruebas unitarias, por lo tanto la idea no 
        //         es salir del componente que estamos probando para hacer estas pruebas. Entonces
        //         para resolver el problema entra el concepto de los espías.
        //         Y por lo tanto el spy es uns instrucción que nos va a permitir realizar peticiones
        //         por decirlo así falsas cuando algo suceda.
        
        // NOTA 3: En este paso con el spyOn lo que estamos diciendo es espía al servicio, cuando alguien
        //         llama al método getMedicos vas a llamar y ejecutar la función que te voy a definir que
        //         es el callback que intermamente creamos en el callFake
        spyOn( servicio, 'getMedicos' ).and.callFake( () => {

            const medicos = [ 'medico1', 'medico2', 'medico3'  ];

            // Como el getMedicos retorna un observable nosotros tenemos que retornar también un observable
            return from( [ medicos ] );
        });

        componente.ngOnInit();

        expect( componente.medicos.length ).toBeGreaterThan(0);

   
    });

    it( 'Debe de llamar al servidor par agregar un médico', () => {

        const espia = spyOn( servicio, 'agregarMedico' ).and.callFake( medico => {

            return empty();

        });

        componente.agregarMedico();

        expect( espia ).toHaveBeenCalled();

    });

    it( 'Debe de agregar un nuevo médico al arreglo de médicos', () => {

        const medico = {
            id: 1,
            nombre: 'Pedro'
        };

        spyOn( servicio, 'agregarMedico' ).and.returnValue( from( [ medico ] ) );

        componente.agregarMedico();

        expect( componente.medicos.indexOf( medico ) ).toBeGreaterThanOrEqual(0);

    });

    it( 'Si falla la adición, la propiedad mensajeError, debe ser igual al error del servicio', () => {

        const miError = 'No se pudo agregar el médico';

        spyOn( servicio, 'agregarMedico' ).and
                .returnValue( throwError( miError ) );

        
        componente.agregarMedico();

        expect( componente.mensajeError ).toBe( miError );

    });


});
