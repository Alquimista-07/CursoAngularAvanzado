import { Component, OnInit } from '@angular/core';

// Operador de rxjs para transformar la data
import { map } from 'rxjs/operators';

// NOTA: Como queremos que el componente de la gráfica sea reutilizable ya que ese es el objetivo
//       y que simplemente dicho componente reciba el objeto con la data para poder renderizar 
//       entonces vamos a hacer todas las configuraciones acá.

// Importaciones firestore
// NOTA: Ver la nota 3 que esta en el archivo app.module referente al error presentado al importar esta libreria.
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor( private db: AngularFirestore ) { }

  ngOnInit(): void {

    // Obtenemos la referencia a la base de datos
    // y escuchamos para que se dispare cuando cambie el valor,
    // es decir, estar pendiente de las emisiones que reciba la colección.
    // NOTA IMPORTANTE: Ahora esto nos va a presentar un error debido a permisos ya que no estamos realizando acciones sobre la base de datos
    //                  como administrador, cosa que no ocurre con el backend el cual si esta como administrador. Entonces para corregir dicho
    //                  error y que se muestra en la consula del navegador que claramente que dice que es por permisos nos dirigimos a la consola
    //                  de firebase, luego a nuestra Firestore Database y en la pestaña reglas vamos a modificar los permisos y dejar que solo
    //                  permitimos lecturas en el parametro allow, y por lo tanto deberia quedarnos algo similar a esto:
    /*
                        rules_version = '2';

                        service cloud.firestore {
                          match /databases/{database}/documents {
                            match /{document=**} {
                              allow read;
                            }
                          }
                        } 
    */
   //                   y para finalizar luego de realizar las modificaciones le damos click al botón publicar.
    this.db.collection('goty').valueChanges()
        .pipe(
          map( (resp: any[]) => {
            //-----------------------------------------------------------------------------------------------------------
            // FORMA 1 DE SOLUCIÓN: 
            //-----------------------------------------------------------------------------------------------------------
            // Usando el map que es algo que tiene todos los arreglos en JavaScript y vamos a desestructurar
            // para extraer del objeto resp solo lo que me interesa que es el nombre y los votos y a su vez
            // luego vamos a retornar un nuevo objeto renombrandolo ya que sabemos que la grafica recibe 
            // solo el name y value
            /* 

            return resp.map( ({ name, votos }) => ({ name, value: votos }))
            
            */
            //-----------------------------------------------------------------------------------------------------------
            // FORMA 2 DE SOLUCIÓN: Esta forma es más sencilla
            //-----------------------------------------------------------------------------------------------------------
            // Como sabemos que la grafica recibe un objeto que tiene que tener una estructura con el name y value
            // entonces tenemos que preparar para regresar el nuevo objeto solo con lo que nos interesa, entonces 
            // para ello hacemos lo siguiente:

            return resp.map( juego => {
              return {
                name: juego.name,
                value: juego.votos
              }
            })
            
            //-----------------------------------------------------------------------------------------------------------

          })
        )
        .subscribe( resp => {
          console.log(resp);
        })

  }

}
