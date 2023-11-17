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

  // ottieni diario del giorno
  public getDiario(giorno:number):Observable<Diario>{
    const url = auth.DIARIO_API + "/" + giorno;
    return this.http.get(url).pipe(
      map((data: any) => {
        const diario:Diario = data;
        return diario;
      })
    );
  }

  public getDiari():Observable<Diario[]>{
    return this.http.get(auth.DIARIO_API).pipe(
      map((data:any)=>{
        const diari:Diario[] = data;
        return diari;
      })
    )
  }

  public updateDiario(diario:Diario):Observable<Diario>{
    const url = auth.DIARIO_API + "/" + diario.id;
    diario.id = undefined;
    return this.http.put(url,diario,httpOptions).pipe(
      map((data:any)=>{
        const diario:Diario = data;
        return diario;
      })
    )
  }

}
