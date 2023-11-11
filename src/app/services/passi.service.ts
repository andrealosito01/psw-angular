import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getPassi():Observable<Passi[]>{
    return this.http.get(auth.PASSI_API).pipe(
      map((data: any) => {
        const passi:Passi[] = data;
        return passi;
      })
    );
  }

}
