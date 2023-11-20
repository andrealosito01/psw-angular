import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public getPesi(page:number,size:number):Observable<any>{
    let params = new HttpParams().set('page',page).set('size',size);
    return this.http.get(auth.PESO_API,{params}).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public deletePeso(id:number):Observable<Peso>{
    const url = auth.PESO_API + "/" + id;
    return this.http.delete(url).pipe(
      map((data:any)=>{
        const pesoRimosso:Peso = data;
        return pesoRimosso;
      })
    )
  }

  public addPeso(peso:Peso):Observable<Peso>{
    return this.http.post(auth.PESO_API,peso,httpOptions).pipe(
      map((data:any)=>{
        const pesoAggiunto:Peso = data;
        return pesoAggiunto;
      })
    )
  }

}
