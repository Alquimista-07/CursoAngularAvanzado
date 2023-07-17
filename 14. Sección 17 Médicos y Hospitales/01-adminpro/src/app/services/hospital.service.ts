import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Hospital, HospitalInterface } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales( desde: number = 0 ){

    const url = `${ base_url }/hospitales?desde=${ desde }`;
    return this.http.get<HospitalInterface>( url, this.headers )
               .pipe(
                  map( (resp: {ok: boolean, hospitales: Hospital[], total: number }) => resp.hospitales )
               )

  }

}
