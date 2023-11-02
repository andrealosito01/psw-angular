import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { Observable, Subject, switchMap } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tokenService.getToken().pipe(
      switchMap((token) => {
        if (token !== '') {
          const authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
          return next.handle(authReq);
        }
        return next.handle(req);
      })
    );
  }
}
