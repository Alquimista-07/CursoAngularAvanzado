import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

  // 259. Peticiones HTTP tradicionales
  obtenerUsuarios(){

    let params = new HttpParams().append('page', '2');
    params = params.append('nombre', 'Fernando');

    // return this.http.get('https://reqres.in/api/users', {
    return this.http.get('https://reqres-error.in/api/users', {
      params
    }).pipe(
      map( (resp: any) => resp['data'] ),
    );

  }


}
