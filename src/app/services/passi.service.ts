import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Passi } from '../models/passi.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PassiService {

  constructor(private http:HttpClient) { }

  public getPassi(page:number,size:number):Observable<any>{
    let params = new HttpParams().set('page',page).set('size',size);
    return this.http.get(auth.PASSI_API,{params}).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public deletePassi(id:number):Observable<Passi>{
    const url = auth.PASSI_API + "/" + id;
    return this.http.delete(url).pipe(
      map((data:any)=>{
        const passi:Passi = data;
        return passi;
      })
    )
  }

  public addPassi(passi:Passi):Observable<Passi>{
    return this.http.post(auth.PASSI_API,passi,httpOptions).pipe(
      map((data:any)=>{
        const passi:Passi = data;
        return passi;
      })
    )
  }

}
