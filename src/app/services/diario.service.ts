import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Diario } from '../models/diario.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class DiarioService {

  constructor(private http:HttpClient) { }

  public getDiario(giorno:number):Observable<Diario>{
    const url = auth.DIARIO_API + "/" + giorno;
    return this.http.get(url).pipe(
      map((data: any) => {
        const diario:Diario = data;
        return diario;
      })
    );
  }

}
