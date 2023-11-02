import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { auth } from 'config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class PazienteService {

  constructor(private http:HttpClient) { }

  public getPaziente(username:String):Observable<any>{
    const url = auth.PAZ_API + '/' + username;
    return this.http.get(url);
  }

}
