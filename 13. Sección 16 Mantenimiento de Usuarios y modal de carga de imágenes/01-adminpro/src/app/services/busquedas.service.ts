import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  // NOTA: Lo que tenemos dentro de este servicio lo podríamos usar convirtiendo los guetters en helpers
  //       para reutilizarlos de manera global

  constructor( private http: HttpClient ) { }

  // Getter para obtener el token
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  // Getter para obtener los headers
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // Servicio centralizado para buscar usuarios, médicos y hospitales
  bucar( tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string ) {
    const url = `${base_url}/todo/coleccion/${ tipo }/${ termino }`;
    return this.http.get<any[]>(url, this.headers )
               .pipe(
                map( (resp: any ) => resp.resultados )
               )
  }

}
