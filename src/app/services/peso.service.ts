import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Peso } from '../models/peso.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PesoService {

  constructor(private http:HttpClient) { }

  public getPesi():Observable<Peso[]>{
    return this.http.get(auth.PESO_API).pipe(
      map((data: any) => {
        const pesi:Peso[] = data;
        return pesi;
      })
    );
  }

}
