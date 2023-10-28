import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { auth } from 'config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public login(username:string, password:string):Observable<any>{
    const body = new HttpParams()
    .set('grant_type',auth.GRANT_TYPE)
    .set('client_id',auth.CLIENT_ID)
    .set('client_secret',auth.CLIENT_SECRET)
    .set('username',username)
    .set('password',password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post(auth.AUTH_API,body,httpOptions);
  }

}
