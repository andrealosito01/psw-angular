import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Misura } from '../models/misura.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class MisuraService {

  constructor(private http:HttpClient) { }

  public getMisure(page:number,size:number):Observable<any>{
    let params = new HttpParams().set('page',page).set('size',size);
    return this.http.get(auth.MISURA_API,{params}).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public deleteMisura(id:number):Observable<Misura>{
    const url = auth.MISURA_API + "/" + id;
    return this.http.delete(url).pipe(
      map((data:any)=>{
        const misura:Misura = data;
        return misura;
      })
    )
  }

  public addMisura(misura:Misura):Observable<Misura>{
    return this.http.post(auth.MISURA_API,misura,httpOptions).pipe(
      map((data:any)=>{
        const misura:Misura = data;
        return misura;
      })
    )
  }

  public updateMisura(id:number,misura:Misura):Observable<Misura>{
    const url = auth.MISURA_API + "/" + id;
    return this.http.put(url,misura,httpOptions).pipe(
      map((data:any)=>{
        const misura:Misura = data;
        return misura;
      })
    )
  }

}
