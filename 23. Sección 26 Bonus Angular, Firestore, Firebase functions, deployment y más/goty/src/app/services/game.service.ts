import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Importamos los environments
import { environment } from '../../environments/environment';

// Importación interfaces
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private http: HttpClient ) { }

  // Obtener juegos nominados
  getNominados() {

    return this.http.get<Game[]>(`${environment.url}/goty`);

  }

}
