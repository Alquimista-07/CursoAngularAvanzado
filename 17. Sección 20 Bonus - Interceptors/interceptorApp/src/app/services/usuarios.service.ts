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

    const headers = new HttpHeaders({
      'token-usuario': 'ABC123'
    });

    // return this.http.get('https://reqres.in/api/users', {
    return this.http.get('https://reqres-error.in/api/users', {
      params,
      headers
    }).pipe(
      map( (resp: any) => resp['data'] ),

      catchError( this.manejarError )

    );

  }

  manejarError( error: HttpErrorResponse ){

    console.log('Sucedió un error');
    console.log('Registrado el el logfile');
    console.warn(error);
    return throwError('Error personalizado');

  }

}
