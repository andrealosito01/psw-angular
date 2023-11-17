import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Scheda } from '../models/scheda.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class SchedeService {

  constructor(private http:HttpClient) { }

  public getSchede():Observable<Scheda[]>{
    return this.http.get(auth.SCHEDE_API).pipe(
      map((data:any)=>{
        const schede:Scheda[] = data;
        return schede;
      })
    )
  }

}
