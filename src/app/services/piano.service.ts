import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { auth } from 'config';
import { Piano } from '../models/piano.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PianoService {

  constructor(private http:HttpClient) { }

  public getPiano():Observable<Piano>{
    return this.http.get(auth.PIANO_API).pipe(
      map((data: any) => {
        const piano:Piano = data;
        return piano;
      })
    );
  }

}
