import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  // 259. Peticiones HTTP tradicionales
  obtenerUsuarios(){

    let params = new HttpParams().append('page', '2');
    params = params.append('nombre', 'Fernando');

    const headers = new HttpHeaders({
      'token-usuario': 'ABC123'
    });

    return this.http.get('https://reqres.in/api/users', {
      params,
      headers
    });

  }

}
