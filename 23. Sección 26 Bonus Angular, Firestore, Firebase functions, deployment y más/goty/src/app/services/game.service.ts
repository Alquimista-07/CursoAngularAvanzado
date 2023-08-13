import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Operadores de rxjs
import { of, tap } from 'rxjs';

// Importamos los environments
import { environment } from '../../environments/environment';

// Importación interfaces
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // NOTA: Como observamos que cada vez que cambiamos de pestaña se dispara la petición al servicio nuevamente
  //       y como sabemos los juegos previamente ya fueron cargados en la primera petición. Por lo tanto vamos
  //       a optimizar para que haga la petición una sola vez y cuando sea necesario para que no vuelva a cargar 
  //       los juegos si estos no han cambiado o no se ha agregado uno nuevo. Para ello creamos la siguiente
  //       propiedad.
  //
  //       Adicionalmente hay que tener en cuenta que la optimización es solo en cuanto a la data, pero la carga
  //       las imágenes aún se esta realizando desde internet y lo cual lo podríamos optimizar medienate un service
  //       worker (sw) o habilitando el cache en el navegador.
  //
  private juegos: Game[] = [];

  constructor( private http: HttpClient ) { }

  // Obtener juegos nominados
  getNominados() {
    // Optimizamos validando si el arreglo esta vacío
    if( this.juegos.length > 0 ){
      // Ya tenemos juegos cargados previamente entonces los retornamos desde el arreglo previamente cargado. Pero hay que tener en cuenta 
      // que debemos devolver un observable y para ello usando el operador de rxjs of.
      console.log('Carga juegos desde el caché');
      return of(this.juegos);
    } 
    else{
      // Como sabemos que el arreglo esta vacío y no tenemos juegos entonces disparamos la petición hacia firebase para traer los datos.
      console.log('Carga juegos desde la petición a firebase');
      return this.http.get<Game[]>(`${environment.url}/goty`)
                 .pipe(
                  // Posteriormente displaramos un efecto secundario con el tap para llenar el arreglo
                  // con los resultados de la petición
                  tap(
                    juegos => this.juegos = juegos
                  )
                 );
    }

  }

  // Votar por juego
  votarJuego(id: string) {

    // NOTA: Generalmente las peiticones post envían la información en el body pero como en este
    //       caso no estamos mandando nada entonces le mandamo un body vacío indicandolo con los
    //       {} para que Angular no nos marque error.
    return this.http.post(`${environment.url}/goty/${id}`, {});

  }

}
